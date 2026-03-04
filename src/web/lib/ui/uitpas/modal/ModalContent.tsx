'use client';

import { StackProps } from '@mui/joy';

import { Stack } from '@/web/lib/ui';

export const ModalContent = ({ ...props }: StackProps) => {
  return (
    <Stack sx={{ padding: '15px 15px' }} {...props}>
      {props.children}
    </Stack>
  );
};
