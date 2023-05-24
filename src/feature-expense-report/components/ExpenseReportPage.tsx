import { useTranslation } from "next-i18next";
import { PageWithSidebar, Stack, Typography,DateInput, Button } from "@/lib/ui";
import { useActiveCounter } from "@/feature-counter";
import { useGetOrganizersFinancialReportsPeriods } from "@/lib/dataAccess";
import { SidebarContent } from "./SidebarContent";
import { Box, FormControl, FormLabel,  } from "@mui/joy";
import { AnchorButton } from "@/lib/ui/uitpas/AnchorButton";
import { useState } from "react";

export const ExpenseReportPage = () => {
  const [startDate,setStartDate] = useState<Date|null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const { t } = useTranslation();
  const activeCounter = useActiveCounter();
  const {data} = useGetOrganizersFinancialReportsPeriods(activeCounter?.id|| '');
  const periods = data?.data;
  return (
    <PageWithSidebar sideBarContent={<SidebarContent />} hasBackButton>
      <Stack m={2} gap={3} alignContent="flex-start">
        <Typography level="body1">{t("expenseReport.summary")}</Typography>
        <Stack direction={"row"}>
          <FormControl>
            <FormLabel>{t("common.startDate")}</FormLabel>
            <DateInput
              placeholderText="Placeholder"
              onChange={(date) => setStartDate(date)}
              selected={startDate}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{t("common.endDate")}</FormLabel>
            <DateInput
              placeholderText="Placeholder"
              onChange={(date) => setEndDate(date)}
              selected={endDate}
            />
          </FormControl>
        </Stack>
        <Box>
          <Button>{t("common.create")}</Button>
        </Box>
        <Typography level="h2" mb={0}>
          {t("expenseReport.readyReports")}
        </Typography>
        <Stack gap={0.2} ml={3}>
          {periods?.map((period, index) => (
            <Stack
              direction={"row"}
              key={`period-${index}`}
              sx={{ listStyle: "inside", display: "list-item" }}
              justifyContent="space-between"
            >
              <Typography level="body1" display="inline-block">
                {period.startDate}
              </Typography>
              <Typography level="body1" display="inline">
                {"  "}-{"  "}
              </Typography>
              <Typography level="body1" display="inline">
                {period.endDate}
              </Typography>{" "}
              <AnchorButton level="body3">Maak en download</AnchorButton>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </PageWithSidebar>
  );
};
