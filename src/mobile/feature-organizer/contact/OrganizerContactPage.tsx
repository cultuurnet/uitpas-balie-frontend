import { Box } from '@mui/material';

import { Link, Typography } from '@/mobile/lib/ui';

export const OrganizerContactsPage = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.primary,
        height: '100vh',
      })}
    >
      <Typography variant="h1">Waiting on design</Typography>
      <Link href="/mobile/organizers">CLICK HERE TO GO BACK</Link>
    </Box>
  );
};
