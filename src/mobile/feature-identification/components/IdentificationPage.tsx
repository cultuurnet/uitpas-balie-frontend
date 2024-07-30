import { MobileNavBar } from "@/mobile/layouts";
import {
  ActivitySwitcher,
  LoadingButton,
  MobileContentStack,
  UitpasLoading,
} from "@/mobile/lib/ui";
import { Typography } from "@mui/material";
import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ManualCardInput } from "@/mobile/feature-identification/components/ManualCardInput";
import { useTranslation } from "@/shared/lib/utils/hooks";
import { useCamera } from "@/shared/lib/utils/hooks/useCamera";

export const IdentificationPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { selectedActivity } = useActivity();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const { browserHasSupport, isLoading: isLoadingCamera } = useCamera({
    initializeCamera: false,
  });

  useEffect(() => {
    if (selectedActivity === null) {
      router.push("/mobile/activities");
    }
  }, [selectedActivity]);

  const handleScanBarcodeClick = () => {
    router.push("/mobile/identification/scan?firstCardEntry=true");
    setIsNavigating(true);
  };

  if (selectedActivity === null) {
    return (
      <MobileNavBar>
        <UitpasLoading />
      </MobileNavBar>
    );
  }

  return (
    <MobileNavBar>
      <MobileContentStack>
        <Typography variant="h1">
          {t("identification.mobile.chosenActivity")}
        </Typography>
        <ActivitySwitcher />

        <Typography variant="h1" sx={{ mt: 2 }}>
          {t("identification.mobile.identifyPassHolder")}
        </Typography>
        <LoadingButton
          onClick={handleScanBarcodeClick}
          loading={isNavigating || isLoadingCamera}
          disabled={!browserHasSupport}
        >
          {t("identification.mobile.scanBarcodeBtn")}
        </LoadingButton>

        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.neutral[900],
            textAlign: "center",
          })}
        >
          {t("identification.mobile.or")}
        </Typography>

        <ManualCardInput firstCardEntry={true} />
      </MobileContentStack>
    </MobileNavBar>
  );
};
