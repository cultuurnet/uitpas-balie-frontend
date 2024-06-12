import { useTranslation } from "@/shared/lib/utils/hooks/useTranslation";
import { Box, Button, Typography, useTheme } from "@mui/material";

export const BenefitCard = () => {
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
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
        <Typography variant="h6">{`tariffName:`}</Typography>
        <Typography variant="h6" sx={{ color: theme.palette.brand.blue }}>
          {`€ regularPrice`}
        </Typography>
      </Box>

      <>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
          <Typography variant="h6">tariffType:</Typography>
          <Typography variant="h6" sx={{ color: theme.palette.brand.blue }}>
            {`€ tariffPrice`}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.neutral[500], fontWeight: 500 }}
        >
          tariffMessage
        </Typography>
      </>
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
        <Typography variant="body2">tariffMessage</Typography>
      </Box>

      <Button
        onClick={() => null}
        sx={{
          backgroundColor: theme.palette.brand.blue,
          borderRadius: "6px",
          fontWeight: 400,
          height: "38px",
          mt: "16px",
        }}
      >
        {t("saving.mobile.tariff.card.applyTariff", { price: "tariffPrice" })}
      </Button>
    </Box>
  );
};
