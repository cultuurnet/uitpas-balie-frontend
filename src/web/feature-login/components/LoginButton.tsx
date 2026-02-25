import { signIn } from 'next-auth/react';
import { Button } from '@/web/lib/ui';
import { FC, PropsWithChildren } from 'react';

export const LoginButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Button size="lg" onClick={() => signIn('keycloak')} variant="solid">
      {children}
    </Button>
  );
};
