import { Box, Typography, useTheme } from '@mui/material';
import { Button, StepperField } from '@/mobile/lib/ui';
import { useTranslation } from '@/shared/lib/i18n/client';
import { useState } from 'react';

type TariffCardProps = {
  tariffName?: string;
  tariffId?: string;
  regularPrice: number;
  tariffType?: string;
  tariffPrice?: number;
  tariffMessage?: string;
  ticketSaleMutation: (
    tariffId: string,
    regularPrice: number,
    count?: number
  ) => void;
  isGroupPass?: boolean;
  remainingDiscounts?: number;
};

export const TariffCard = ({
  tariffName,
  tariffId,
  regularPrice,
  tariffType,
  tariffPrice,
  tariffMessage,
  ticketSaleMutation,
  isGroupPass,
  remainingDiscounts,
}: TariffCardProps) => {
  const [stepperCount, setStepperCount] = useState<number>(1);
  const { t } = useTranslation();
  const theme = useTheme();

  const handleApplyTariffClick = () => {
    if (!tariffId) return;

    ticketSaleMutation(tariffId, regularPrice, stepperCount);
  };

  const calculatedRemainingDiscounts = isNaN(stepperCount)
    ? remainingDiscounts
    : remainingDiscounts
    ? remainingDiscounts - stepperCount
    : 0;

  if (!tariffName) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        padding: '16px 12px 12px 12px',
        borderRadius: '6px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
        <Typography variant="h6">{`${tariffName}:`}</Typography>
        <Typography variant="h6" sx={{ color: theme.palette.brand.blue }}>
          {`€ ${regularPrice}`}
        </Typography>
      </Box>
      {tariffType ? (
        <>
          <Box
            sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}
          >
            <Typography variant="h6">{tariffType}:</Typography>
            <Typography variant="h6" sx={{ color: theme.palette.brand.blue }}>
              {`€ ${tariffPrice}`}
            </Typography>
          </Box>
          {tariffMessage && (
            <Typography
              variant="body2"
              sx={{ color: theme.palette.neutral[500], fontWeight: 500 }}
            >
              {tariffMessage}
            </Typography>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            columnGap: '10px',
          }}
        >
          <Typography variant="h6">
            {t('saving.mobile.tariff.card.noDiscount')}
          </Typography>
          <Typography variant="body2">{tariffMessage}</Typography>
        </Box>
      )}
      {isGroupPass && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: '10px',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{ ...(remainingDiscounts && { mt: '-16px' }) }}
          >
            {t('saving.mobile.tariff.card.count')}
          </Typography>
          <StepperField
            value={stepperCount}
            onChange={setStepperCount}
            {...(remainingDiscounts && {
              subtitle: t('saving.mobile.tariff.card.discountsAvailable', {
                count: calculatedRemainingDiscounts,
              }),
              maxValue: remainingDiscounts,
            })}
          />
        </Box>
      )}
      {tariffPrice !== undefined ? (
        <Button
          onClick={handleApplyTariffClick}
          sx={{
            backgroundColor: theme.palette.brand.blue,
            borderRadius: '6px',
            fontWeight: 400,
            height: '38px',
            mt: '16px',
          }}
        >
          {t('saving.mobile.tariff.card.applyTariff', { price: tariffPrice })}
        </Button>
      ) : null}
    </Box>
  );
};
