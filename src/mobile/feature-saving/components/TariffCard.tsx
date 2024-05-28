import { Box, Typography, useTheme } from "@mui/material";
import { Button } from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";

type TariffCardProps = {
  tariffName?: string;
  tariffId?: string;
  regularPrice: number;
  tariffType?: string;
  tariffPrice?: number;
  tariffMessage?: string;
  ticketSaleMutation: (tariffId: string, regularPrice: number) => void;
  onDrawerClose: () => void;
};

export const TariffCard = ({
  tariffName,
  tariffId,
  regularPrice,
  tariffType,
  tariffPrice,
  tariffMessage,
  ticketSaleMutation,
  onDrawerClose,
}: TariffCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  if (!tariffName) {
    return null;
  }

  const handleApplyTariffClick = () => {
    if (!tariffId) return;

    ticketSaleMutation(tariffId, regularPrice);
    onDrawerClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        padding: "16px 12px 12px 12px",
        borderRadius: "6px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
        <Typography variant="h6">{`${tariffName}:`}</Typography>
        <Typography variant="h6" sx={{ color: theme.palette.brand.blue }}>
          {`€ ${regularPrice}`}
        </Typography>
      </Box>
      {tariffType ? (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}
          >
            <Typography variant="h6">{tariffType}:</Typography>
            <Typography variant="h6" sx={{ color: theme.palette.brand.blue }}>
              {`€ ${tariffPrice}`}
            </Typography>
          </Box>
          {tariffType === "Coupon" && tariffPrice && (
            <Typography
              variant="body2"
              sx={{ color: theme.palette.neutral[500], fontWeight: 500 }}
            >
              {t("saving.mobile.tariff.card.couponDiscountPercentage", {
                discount:
                  tariffPrice === 0
                    ? "100"
                    : Math.round(100 * (tariffPrice / regularPrice)),
              })}
            </Typography>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            columnGap: "10px",
          }}
        >
          <Typography variant="h6">
            {t("saving.mobile.tariff.card.noDiscount")}
          </Typography>
          <Typography variant="body2">{tariffMessage}</Typography>
        </Box>
      )}
      {tariffPrice ? (
        <Button
          onClick={handleApplyTariffClick}
          sx={{
            backgroundColor: theme.palette.brand.blue,
            borderRadius: "6px",
            fontWeight: 400,
            height: "38px",
            mt: "16px",
          }}
        >
          {t("saving.mobile.tariff.card.applyTariff", { price: tariffPrice })}
        </Button>
      ) : null}
    </Box>
  );
};
