/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * UiTPAS API
 * With UiTPAS API 4.0 you can retrieve ticket prices and register ticket sales for passholders. You can also save UiTPAS points and exchange them for rewards for a passholder, and much more.
 * OpenAPI spec version: 4.0
 */
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type {
  ReportPeriod,
  UnauthorizedResponse,
  ForbiddenResponse,
  Error,
  Report,
} from ".././model";

/**
 * Retrieve suggested report periods for an organizer.

The caller of this request must have `ORGANIZER_REPORTS` permission for the given organizer.

 * @summary Get suggested financial report periods
 */
export const getOrganizersFinancialReportsPeriods = (
  organizerId: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<ReportPeriod[]>> => {
  return axios.get(
    `/organizers/${organizerId}/financial-reports/periods`,
    options
  );
};

export const getGetOrganizersFinancialReportsPeriodsQueryKey = (
  organizerId: string
) => [`/organizers/${organizerId}/financial-reports/periods`];

export type GetOrganizersFinancialReportsPeriodsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getOrganizersFinancialReportsPeriods>>
>;
export type GetOrganizersFinancialReportsPeriodsQueryError = AxiosError<
  UnauthorizedResponse | ForbiddenResponse | Error
>;

export const useGetOrganizersFinancialReportsPeriods = <
  TData = Awaited<ReturnType<typeof getOrganizersFinancialReportsPeriods>>,
  TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>
>(
  organizerId: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getOrganizersFinancialReportsPeriods>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetOrganizersFinancialReportsPeriodsQueryKey(organizerId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getOrganizersFinancialReportsPeriods>>
  > = ({ signal }) =>
    getOrganizersFinancialReportsPeriods(organizerId, {
      signal,
      ...axiosOptions,
    });

  const query = useQuery<
    Awaited<ReturnType<typeof getOrganizersFinancialReportsPeriods>>,
    TError,
    TData
  >({
    queryKey,
    queryFn,
    enabled: !!organizerId,
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * Starts a financial report export. The result of this request is a `reportId` that can be used to request the status of the report export and the download.

The caller of this request must have `ORGANIZER_REPORTS` permission for the given organizer.

 * @summary Start an export of a financial report
 */
export const postOrganizersFinancialReports = (
  organizerId: string,
  reportPeriod: ReportPeriod,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<Report>> => {
  return axios.post(
    `/organizers/${organizerId}/financial-reports`,
    reportPeriod,
    options
  );
};

export type PostOrganizersFinancialReportsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postOrganizersFinancialReports>>
>;
export type PostOrganizersFinancialReportsMutationBody = ReportPeriod;
export type PostOrganizersFinancialReportsMutationError = AxiosError<
  Error | UnauthorizedResponse | ForbiddenResponse
>;

export const usePostOrganizersFinancialReports = <
  TError = AxiosError<Error | UnauthorizedResponse | ForbiddenResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postOrganizersFinancialReports>>,
    TError,
    { organizerId: string; data: ReportPeriod },
    TContext
  >;
  axios?: AxiosRequestConfig;
}) => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postOrganizersFinancialReports>>,
    { organizerId: string; data: ReportPeriod }
  > = (props) => {
    const { organizerId, data } = props ?? {};

    return postOrganizersFinancialReports(organizerId, data, axiosOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof postOrganizersFinancialReports>>,
    TError,
    { organizerId: string; data: ReportPeriod },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Get previously exported financial reports. 

> Note: Reports will only be available for a limited amount of time. When they become unavailable, a new export can be requested using `POST /organizers/{organizerId}/financial-reports`  


The caller of this request must have `ORGANIZER_REPORTS` permission for the given organizer.

 * @summary Get financial report exports
 */
export const getOrganizersFinancialReports = (
  organizerId: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<Report[]>> => {
  return axios.get(`/organizers/${organizerId}/financial-reports`, options);
};

export const getGetOrganizersFinancialReportsQueryKey = (
  organizerId: string
) => [`/organizers/${organizerId}/financial-reports`];

export type GetOrganizersFinancialReportsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getOrganizersFinancialReports>>
>;
export type GetOrganizersFinancialReportsQueryError = AxiosError<
  UnauthorizedResponse | ForbiddenResponse | Error
>;

export const useGetOrganizersFinancialReports = <
  TData = Awaited<ReturnType<typeof getOrganizersFinancialReports>>,
  TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>
>(
  organizerId: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getOrganizersFinancialReports>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetOrganizersFinancialReportsQueryKey(organizerId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getOrganizersFinancialReports>>
  > = ({ signal }) =>
    getOrganizersFinancialReports(organizerId, { signal, ...axiosOptions });

  const query = useQuery<
    Awaited<ReturnType<typeof getOrganizersFinancialReports>>,
    TError,
    TData
  >({
    queryKey,
    queryFn,
    enabled: !!organizerId,
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * Retrieve the status of a previously started report export.

The caller of this request must have `ORGANIZER_REPORTS` permission for the given organizer.

 * @summary Get financial report status
 */
export const getOrganizersFinancialReportsReportId = (
  organizerId: string,
  reportId: number,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<Report>> => {
  return axios.get(
    `/organizers/${organizerId}/financial-reports/${reportId}`,
    options
  );
};

export const getGetOrganizersFinancialReportsReportIdQueryKey = (
  organizerId: string,
  reportId: number
) => [`/organizers/${organizerId}/financial-reports/${reportId}`];

export type GetOrganizersFinancialReportsReportIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getOrganizersFinancialReportsReportId>>
>;
export type GetOrganizersFinancialReportsReportIdQueryError = AxiosError<
  UnauthorizedResponse | ForbiddenResponse | Error
>;

export const useGetOrganizersFinancialReportsReportId = <
  TData = Awaited<ReturnType<typeof getOrganizersFinancialReportsReportId>>,
  TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>
>(
  organizerId: string,
  reportId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getOrganizersFinancialReportsReportId>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetOrganizersFinancialReportsReportIdQueryKey(organizerId, reportId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getOrganizersFinancialReportsReportId>>
  > = ({ signal }) =>
    getOrganizersFinancialReportsReportId(organizerId, reportId, {
      signal,
      ...axiosOptions,
    });

  const query = useQuery<
    Awaited<ReturnType<typeof getOrganizersFinancialReportsReportId>>,
    TError,
    TData
  >({
    queryKey,
    queryFn,
    enabled: !!(organizerId && reportId),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * Retrieve the actual report zip file of an `available` report.

The caller of this request must have `ORGANIZER_REPORTS` permission for the given organizer.

 * @summary Download financial report
 */
export const getOrganizersFinancialReportsReportIdZip = (
  organizerId: string,
  reportId: number,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<unknown>> => {
  return axios.get(
    `/organizers/${organizerId}/financial-reports/${reportId}.zip`,
    options
  );
};

export const getGetOrganizersFinancialReportsReportIdZipQueryKey = (
  organizerId: string,
  reportId: number
) => [`/organizers/${organizerId}/financial-reports/${reportId}.zip`];

export type GetOrganizersFinancialReportsReportIdZipQueryResult = NonNullable<
  Awaited<ReturnType<typeof getOrganizersFinancialReportsReportIdZip>>
>;
export type GetOrganizersFinancialReportsReportIdZipQueryError = AxiosError<
  UnauthorizedResponse | ForbiddenResponse | Error
>;

export const useGetOrganizersFinancialReportsReportIdZip = <
  TData = Awaited<ReturnType<typeof getOrganizersFinancialReportsReportIdZip>>,
  TError = AxiosError<UnauthorizedResponse | ForbiddenResponse | Error>
>(
  organizerId: string,
  reportId: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getOrganizersFinancialReportsReportIdZip>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetOrganizersFinancialReportsReportIdZipQueryKey(organizerId, reportId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getOrganizersFinancialReportsReportIdZip>>
  > = ({ signal }) =>
    getOrganizersFinancialReportsReportIdZip(organizerId, reportId, {
      signal,
      ...axiosOptions,
    });

  const query = useQuery<
    Awaited<ReturnType<typeof getOrganizersFinancialReportsReportIdZip>>,
    TError,
    TData
  >({
    queryKey,
    queryFn,
    enabled: !!(organizerId && reportId),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};
