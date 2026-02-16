'use client';

import { Association, Passholder } from '@/shared/lib/dataAccess';
import { formatUitpasNumber } from '@/shared/lib/utils/stringUtils';
import { Alert } from '@/mobile/lib/ui';
import { OpportunityStatePassholder } from './OpportunityStatePassholder';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from '@/shared/lib/utils/hooks';

type PassHolderProps = {
  passholder: Passholder;
  alertData?: {
    alertType: 'error' | 'success';
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
    <Stack gap={2}>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography variant="h1">{t('saving.mobile.passholder')}</Typography>
        <Typography color={theme.palette.brand[800]} variant="body2">
          {formatUitpasNumber(
            passholder.cardSystemMemberships?.at(0)?.uitpasNumber
          )}
        </Typography>
      </Stack>

      <Stack gap={1}>
        <Typography variant="h1" color={theme.palette.neutral[900]}>
          {t('saving.mobile.namePointsTxt', {
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
            {t('saving.mobile.associations')}
          </Typography>
          <Stack gap={1}>
            {associations.map((association) => (
              <Box
                key={association.id}
                py={0.25}
                px={1.5}
                borderRadius={1}
                color={theme.palette.neutral[0]}
                bgcolor={theme.palette.brand.purple}
                width="fit-content"
              >
                <Typography fontWeight={600}>{association.name}</Typography>
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
