'use client';

import { Grouppass } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/utils/hooks';
import { Stack, Typography, useTheme } from '@mui/material';
import { OpportunityStateGrouppass } from './OpportunityStateGrouppass';
import { Alert } from '@/mobile/lib/ui';

type GroupPassProps = {
  groupPass: Grouppass;
  alertData?: {
    alertType: 'error' | 'success';
    message?: string;
  };
  firstCardEntry: boolean;
};

export const GroupPass = ({
  groupPass,
  alertData,
  firstCardEntry,
}: GroupPassProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack
      sx={{
        rowGap: '10px',
      }}
    >
      <Typography variant="h1">{t('saving.mobile.grouppass')}</Typography>

      <Stack sx={{ rowGap: '4px' }}>
        <Typography variant="h1" sx={{ color: theme.palette.neutral[900] }}>
          {groupPass.name}
        </Typography>
        <OpportunityStateGrouppass groupPass={groupPass} />
      </Stack>

      {alertData && (
        <Alert type={alertData.alertType} newAlert={!firstCardEntry}>
          {alertData.message}
        </Alert>
      )}
    </Stack>
  );
};
