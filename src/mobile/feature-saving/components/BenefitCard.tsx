import { Button } from "@/mobile/lib/ui";
import { RewardType } from "@/shared/lib/dataAccess";
import { useTranslation } from "@/shared/lib/utils/hooks/useTranslation";
import { Box, Typography, useTheme } from "@mui/material";

type BenefitCardProps = {
  benefitTitle: string;
  pointsCost?: number;
  benefitType: RewardType;
  online?: boolean;
};

export const BenefitCard = ({
  benefitTitle,
  pointsCost,
  benefitType,
  online,
}: BenefitCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        padding: "16px 12px 12px 12px",
        borderRadius: "6px",
        rowGap: "10px",
      }}
    >
      <Typography variant="h6" sx={{ fontSize: 16, lineHeight: 1.1 }}>
        {benefitTitle}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", columnGap: "6px" }}>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.brand.blue, fontSize: 16 }}
        >
          {t("saving.mobile.benefit.card.for")}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.brand.blue,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {t("saving.mobile.benefit.card.pointsCost", {
            price: pointsCost ?? 0,
          })}
        </Typography>
        {benefitType === RewardType.WELCOME && (
          <Box
            sx={{
              backgroundColor: theme.palette.brand.purple,
              color: theme.palette.neutral[0],
              p: "2px 12px",
              borderRadius: "4px",
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: 10 }}>
              {t("saving.mobile.benefit.card.welcomeChip")}
            </Typography>
          </Box>
        )}
      </Box>

      <Button
        onClick={() => null}
        sx={{
          backgroundColor: theme.palette.brand.blue,
          borderRadius: "6px",
          fontWeight: 400,
          height: "38px",
          mt: "auto",
        }}
      >
        {t("saving.mobile.benefit.card.exchange", { points: pointsCost ?? 0 })}
      </Button>

      {online && (
        <Typography variant="body1">
          {t("saving.mobile.benefit.card.online")}
        </Typography>
      )}
    </Box>
  );
};
