import { signIn } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';

import { Button } from '@/web/lib/ui';

export const LoginButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Button size="lg" onClick={() => signIn('keycloak')} variant="solid">
      {children}
    </Button>
  );
};
