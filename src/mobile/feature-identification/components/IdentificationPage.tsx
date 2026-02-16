import { MobileNavBar } from '@/mobile/layouts';
import {
  ActivitySwitcher,
  LoadingButton,
  MobileContentStack,
  UitpasLoading,
} from '@/mobile/lib/ui';
import { Typography } from '@mui/material';
import { useActivity } from '@/mobile/feature-activities/useActivity';
import { useState } from 'react';
import { ManualCardInput } from '@/mobile/feature-identification/components/ManualCardInput';
import { useTranslation } from '@/shared/lib/utils/hooks';
import { useCamera } from '@/shared/lib/utils/hooks/useCamera';

export const IdentificationPage = () => {
  const { t } = useTranslation();
  const { selectedActivity, navigateToScanner } = useActivity();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const { browserHasSupport, isLoading: isLoadingCamera } = useCamera({
    initializeCamera: false,
  });

  const handleScanBarcodeClick = () => {
    navigateToScanner();
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
          {t('identification.mobile.chosenActivity')}
        </Typography>
        <ActivitySwitcher />

        <Typography variant="h1" sx={{ mt: 2 }}>
          {t('identification.mobile.identifyPassHolder')}
        </Typography>
        <LoadingButton
          onClick={handleScanBarcodeClick}
          loading={isNavigating || isLoadingCamera}
          disabled={!browserHasSupport}
        >
          {t('identification.mobile.scanBarcodeBtn')}
        </LoadingButton>

        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.neutral[900],
            textAlign: 'center',
          })}
        >
          {t('identification.mobile.or')}
        </Typography>

        <ManualCardInput firstCardEntry={true} />
      </MobileContentStack>
    </MobileNavBar>
  );
};
