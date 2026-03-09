import { FC, PropsWithChildren } from 'react';

import { useCounter } from '@/hooks/useCounter';
import { Navbar } from '@/layouts/components/Navbar';
import { useUserInfo } from '@/shared/lib/user';
import { Box } from '@/web/lib/ui';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const userInfo = useUserInfo();
  const { activeCounter: counter } = useCounter();

  const renderNavBar = userInfo && counter;

  return (
    <Box
      height="100vh"
      width="100vw"
      overflow={renderNavBar ? 'hidden' : 'auto'}
    >
      {renderNavBar && <Navbar userInfo={userInfo} counter={counter} />}
      {children}
    </Box>
  );
};
