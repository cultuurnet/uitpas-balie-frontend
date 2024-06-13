import { Button } from "@/mobile/lib/ui";
import { RewardType } from "@/shared/lib/dataAccess";
import { useTranslation } from "@/shared/lib/utils/hooks/useTranslation";
import { Box, BoxProps, Typography, useTheme } from "@mui/material";

type rewardCardProps = BoxProps & {
  rewardId: string;
  rewardTitle: string;
  rewardCost?: number;
  rewardType: RewardType;
  online?: boolean;
  rewardExchangeMutation: (rewardId: string) => void;
};

export const RewardCard = ({
  rewardId,
  rewardTitle,
  rewardCost,
  rewardType,
  online,
  rewardExchangeMutation,
  ...props
}: rewardCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { sx, ...restProps } = props;

  const handleRedemptionClick = () => {
    rewardExchangeMutation(rewardId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        padding: "16px 12px 12px 12px",
        borderRadius: "6px",
        rowGap: "10px",
        ...sx,
      }}
      {...restProps}
    >
      <Typography variant="h6" sx={{ fontSize: 16, lineHeight: 1.1 }}>
        {rewardTitle}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", columnGap: "6px" }}>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.brand.blue, fontSize: 16 }}
        >
          {t("saving.mobile.reward.card.for")}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.brand.blue,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {t("saving.mobile.reward.card.cost", {
            price: rewardCost ?? 0,
          })}
        </Typography>
        {rewardType === RewardType.WELCOME && (
          <Box
            sx={{
              backgroundColor: theme.palette.brand.purple,
              color: theme.palette.neutral[0],
              p: "2px 12px",
              borderRadius: "4px",
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: 10 }}>
              {t("saving.mobile.reward.card.welcomeChip")}
            </Typography>
          </Box>
        )}
      </Box>

      <Button
        onClick={handleRedemptionClick}
        sx={{
          backgroundColor: theme.palette.brand.blue,
          borderRadius: "6px",
          fontWeight: 400,
          height: "38px",
          mt: "auto",
        }}
      >
        {t("saving.mobile.reward.card.exchange", { points: rewardCost ?? 0 })}
      </Button>

      {online && (
        <Typography variant="body2" sx={{ fontSize: 11, fontWeight: 600 }}>
          {t("saving.mobile.reward.card.online")}
        </Typography>
      )}
    </Box>
  );
};
