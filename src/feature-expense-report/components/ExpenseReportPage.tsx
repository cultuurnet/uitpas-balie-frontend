import { useTranslation } from "next-i18next";
import {
  PageWithSidebar,
  Stack,
  Typography,
  DateInput,
  Button,
  ListItem,
} from "@/lib/ui";
import { useActiveCounter } from "@/feature-counter";
import { useGetOrganizersFinancialReportsPeriods } from "@/lib/dataAccess";
import { SidebarContent } from "./SidebarContent";
import { Alert, Box, FormControl, FormLabel } from "@mui/joy";
import { AnchorButton } from "@/lib/ui/uitpas/AnchorButton";
import { useState } from "react";
import { useDownloadReport } from "../hooks/useDownloadReport";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

export const ExpenseReportPage = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { t } = useTranslation();
  const activeCounter = useActiveCounter();
  const { data: reportsPeriodFetchData } =
    useGetOrganizersFinancialReportsPeriods(activeCounter?.id || "");
  const { startReportRequest, isDownloading, hasFailed } = useDownloadReport(
    activeCounter?.id || ""
  );

  const periods = reportsPeriodFetchData?.data;

  const createReport = (
    selectedStartDate?: string,
    selectedEndDate?: string
  ) => {
    if (activeCounter && startDate && endDate)
      startReportRequest(activeCounter?.id, {
        startDate:
          selectedStartDate || toISODateString(startDate.toISOString()),
        endDate: selectedEndDate || toISODateString(endDate.toISOString()),
      });
  };
  const invalidDateRange =
    new Date(`${endDate}T23:59:59.999Z`).getTime() <
    new Date(`${startDate}T00:00:00.000Z`).getTime();

  return (
    <PageWithSidebar sideBarContent={<SidebarContent />} hasBackButton>
      <Stack m={2} gap={3} alignContent="flex-start">
        <Typography level="body1">{t("expenseReport.summary")}</Typography>
        {hasFailed && (
          <Alert color="danger">{t("expenseReport.noReportsAvailable")}</Alert>
        )}
        <Stack
          direction={"row"}
          gap={3}
          justifyContent={"space-between"}
          width="66%"
        >
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>
              <Typography level="body2">
                <strong> {t("common.startDate")}</strong>
              </Typography>
            </FormLabel>
            <DateInput
              placeholderText="Placeholder"
              onChange={(date) => setStartDate(date || new Date())}
              selected={startDate}
            />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>
              <Typography level="body2">
                <strong> {t("common.endDate")}</strong>
              </Typography>
            </FormLabel>
            <DateInput
              placeholderText="Placeholder"
              onChange={(date) => setEndDate(date || new Date())}
              selected={endDate}
            />
          </FormControl>
        </Stack>
        <Box>
          <Button
            disabled={(isDownloading && !hasFailed) || invalidDateRange}
            onClick={() => createReport()}
          >
            {isDownloading && !hasFailed && (
              <FontAwesomeIcon icon={faRefresh} spin fontSize="xs" />
            )}
            {t("common.create")}
          </Button>
        </Box>
        <Typography level="h2" mb={0}>
          {t("expenseReport.readyReports")}
        </Typography>
        <Stack gap={0.2} ml={3}>
          {periods?.map((period, index) => (
            <ListItem key={`period-${index}`}>
              <Stack display={"inline"} direction={"row"} gap={1}>
                <Typography level="body1" display="inline" mr={0.5}>
                  {period.startDate}
                </Typography>
                <Typography level="body1" display="inline" mr={0.5}>
                  -
                </Typography>
                <Typography level="body1" display="inline" mr={1}>
                  {period.endDate}
                </Typography>
                <AnchorButton
                  level="body3"
                  onClick={() => createReport(period.startDate, period.endDate)}
                >
                  Maak en download
                </AnchorButton>
              </Stack>
            </ListItem>
          ))}
        </Stack>
      </Stack>
    </PageWithSidebar>
  );
};

function toISODateString(ISOString: string) {
  return ISOString.split("T")[0];
}
