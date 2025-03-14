import { OutlinedButton, TextField } from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";
import { Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useActivity } from "@/mobile/feature-activities/useActivity";

type ManualCardInputProps = {
  firstCardEntry: boolean;
};

export const ManualCardInput = ({ firstCardEntry }: ManualCardInputProps) => {
  const { t } = useTranslation();
  const { navigateToSaving } = useActivity();
  const [cardNumber, setCardNumber] = useState<string>("");
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined
  );

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValidationError(undefined);
    setCardNumber(event.target.value);
  };

  const handleRouteChange = (cardType: "insz" | "uitpas", cardNumber: string) =>
    navigateToSaving(cardNumber, firstCardEntry, cardType, "push");

  const handleConfirmClick = () => {
    const sanitizedCardNumber = cardNumber.replace(/\D/g, "");
    let errorKey = "";

    if (sanitizedCardNumber.length === 11) {
      // Rijksregisternummer
      const controlNumber = Number(sanitizedCardNumber.slice(-2));
      const checksum = 97 - (Number(sanitizedCardNumber.slice(0, -2)) % 97);
      if (controlNumber !== checksum) {
        errorKey = "invalidInszNo";
      } else {
        handleRouteChange("insz", sanitizedCardNumber);
      }
    } else if (sanitizedCardNumber.length === 13) {
      handleRouteChange("uitpas", sanitizedCardNumber);
    } else if (sanitizedCardNumber.length === 0) {
      errorKey = "required";
    } else {
      errorKey = "invalidCardNo";
    }

    setValidationError(
      errorKey
        ? `identification.mobile.manualInput.validation.${errorKey}`
        : undefined
    );
  };

  return (
    <>
      <Typography
        variant="h1"
        sx={(theme) => ({
          color: theme.palette.neutral[900],
          textAlign: "center",
          fontWeight: 400,
        })}
      >
        {t("identification.mobile.manualInput.manualInputParagraph")}
      </Typography>
      <TextField
        value={cardNumber}
        placeholder={t("identification.mobile.manualInput.placeholderTxt")}
        error={!!validationError}
        helperText={validationError ? t(validationError) : undefined}
        onChange={handleCardNumberChange}
      />
      <OutlinedButton sx={{ mt: "-10px" }} onClick={handleConfirmClick}>
        {t("identification.mobile.confirmBtn")}
      </OutlinedButton>
    </>
  );
};
