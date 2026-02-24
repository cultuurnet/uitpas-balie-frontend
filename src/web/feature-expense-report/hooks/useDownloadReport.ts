import {
  ReportStatus,
  useGetOrganizersFinancialReportsReportId,
  useGetOrganizersFinancialReportsReportIdZip,
  usePostOrganizersFinancialReports,
} from '@/shared/lib/dataAccess';
import { useEffect, useReducer } from 'react';
import { saveAs } from 'file-saver';
import JsZip from 'jszip';
import { PeriodType, isSamePeriod } from '@/shared/lib/utils';

type ReturnType = {
  startReportRequest: (organizerId: string, period: PeriodType) => void;
  status: ReportStatus;
  isDownloading: boolean;
  hasFailed: boolean;
  period: PeriodType | null;
};

type State = {
  hasStarted: boolean;
  reportId: number;
  reportStatus: ReportStatus;
  periodToDownload: PeriodType | null;
};

type Action =
  | { type: 'start'; period: PeriodType }
  | { type: 'startSamePeriod' }
  | { type: 'reportCreated'; id: number }
  | { type: 'statusUpdate'; status: ReportStatus }
  | { type: 'downloadComplete' };

const INITIAL_STATE: State = {
  hasStarted: false,
  reportId: 0,
  reportStatus: 'STARTED',
  periodToDownload: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start':
      return {
        hasStarted: true,
        reportId: 0,
        reportStatus: 'STARTED',
        periodToDownload: action.period,
      };
    case 'startSamePeriod':
      return { ...state, hasStarted: true };
    case 'reportCreated':
      return { ...state, reportId: action.id };
    case 'statusUpdate':
      return { ...state, reportStatus: action.status };
    case 'downloadComplete':
      return { ...state, hasStarted: false };
  }
}

export const useDownloadReport = (organizerId: string): ReturnType => {
  const [{ hasStarted, reportId, reportStatus, periodToDownload }, dispatch] =
    useReducer(reducer, INITIAL_STATE);

  const {
    mutate: postReports,
    data: createReportData,
    status: createStatus,
  } = usePostOrganizersFinancialReports();
  const isCreateLoading = createStatus === 'pending';
  const {
    data: reportStatusData,
    refetch: getReportStatus,
    status: reportStatusStatus,
  } = useGetOrganizersFinancialReportsReportId(organizerId, reportId, {
    query: { enabled: false },
  });
  const isStatusLoading = reportStatusStatus === 'pending';
  const {
    data: reportZipData,
    refetch: getReportZip,
    status: zipStatus,
  } = useGetOrganizersFinancialReportsReportIdZip(organizerId, reportId, {
    query: { enabled: false },
  });
  const isZipLoading = zipStatus === 'pending';

  const startReportRequest = (organizerId: string, period: PeriodType) => {
    if (isSamePeriod(period, periodToDownload)) {
      dispatch({ type: 'startSamePeriod' });
      return;
    }
    dispatch({ type: 'start', period });
    postReports({
      organizerId,
      data: period,
    });
  };

  //initiate and loop over status check
  useEffect(() => {
    if (!createReportData) return;
    dispatch({ type: 'reportCreated', id: createReportData.data.id });
    const interval = setInterval(() => {
      if (reportStatus === ReportStatus.STARTED) getReportStatus();
      else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [createReportData, reportStatus, getReportStatus]);

  //check on statusCheck response and update reportStatus
  useEffect(() => {
    if (!reportStatusData) return;
    dispatch({ type: 'statusUpdate', status: reportStatusData.data.status });
  }, [reportStatusData]);

  //check on status and get ready to downloadZip
  useEffect(() => {
    if (reportStatus !== ReportStatus.AVAILABLE || reportZipData) return;
    getReportZip();
  }, [reportStatus]);

  //check on status and download zip
  useEffect(() => {
    if (
      reportStatus !== ReportStatus.AVAILABLE ||
      !reportZipData ||
      !hasStarted
    )
      return;

    JsZip.loadAsync(reportZipData.data)
      .then((zip) => zip.generateAsync({ type: 'blob' }))
      .then((blob) => {
        saveAs(
          blob,
          `financialReport_${periodToDownload?.startDate}-${periodToDownload?.endDate}.zip`
        );
        dispatch({ type: 'downloadComplete' });
      });
  }, [reportZipData, reportStatus, hasStarted]);

  const isDownloading =
    hasStarted &&
    (reportStatus === ReportStatus.STARTED ||
      isCreateLoading ||
      isStatusLoading ||
      isZipLoading);
  const hasFailed = reportStatus === ReportStatus.FAILED;

  return {
    startReportRequest,
    status: reportStatus,
    isDownloading,
    hasFailed,
    period: periodToDownload,
  };
};
