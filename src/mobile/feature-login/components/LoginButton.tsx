import { ButtonProps } from '@mui/material';
import { signIn } from 'next-auth/react';

import { Button } from '@/mobile/lib/ui';

export const LoginButton = ({ ...props }: ButtonProps) => {
  return (
    <Button onClick={() => signIn('keycloak')} {...props}>
      {props.children}
    </Button>
  );
};
