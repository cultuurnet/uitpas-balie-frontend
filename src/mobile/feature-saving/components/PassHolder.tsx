"use client";

import { Association, Passholder } from "@/shared/lib/dataAccess";
import { formatUitpasNumber } from "@/shared/lib/utils/stringUtils";
import { Alert } from "@/mobile/lib/ui";
import { OpportunityStatePassholder } from "./OpportunityStatePassholder";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "@/shared/lib/utils/hooks";

type PassHolderProps = {
  passholder: Passholder;
  alertData?: {
    alertType: "error" | "success";
    message?: string;
  };
  firstCardEntry: boolean;
  associations?: Association[];
};

export const PassHolder = ({
  passholder,
  alertData,
  firstCardEntry,
  associations = [],
}: PassHolderProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack sx={{ rowGap: "10px" }}>
      <Stack
        sx={{
          flexDirection: "row",
          columnGap: "5px",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">{t("saving.mobile.passholder")}</Typography>
        <Typography
          sx={{
            color: theme.palette.brand[800],
            fontSize: "13px",
          }}
        >
          {formatUitpasNumber(
            passholder.cardSystemMemberships?.at(0)?.uitpasNumber
          )}
        </Typography>
      </Stack>

      <Stack sx={{ rowGap: "4px" }}>
        <Typography variant="h1" sx={{ color: theme.palette.neutral[900] }}>
          {t("saving.mobile.namePointsTxt", {
            firstName: passholder.firstName,
            lastName: passholder.name,
            points: passholder.points,
          })}
        </Typography>
        <OpportunityStatePassholder passholder={passholder} />
      </Stack>

      {associations.length > 0 && (
        <>
          <Typography variant="h2">
            {t("saving.mobile.associations")}
          </Typography>
          <Stack sx={{ rowGap: "5px" }}>
            {associations.map((association) => (
              <Box
                key={association.id}
                sx={{
                  backgroundColor: theme.palette.brand.purple,
                  color: theme.palette.neutral[0],
                  p: "2px 12px",
                  borderRadius: "4px",
                  width: "fit-content",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  {association.name}
                </Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}

      {alertData && (
        <Alert type={alertData.alertType} newAlert={!firstCardEntry}>
          {alertData.message}
        </Alert>
      )}
    </Stack>
  );
};
