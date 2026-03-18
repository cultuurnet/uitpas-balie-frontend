import { FC, PropsWithChildren } from 'react';

import { useOrganizer } from '@/hooks/useOrganizer';
import { Navbar } from '@/layouts/components/Navbar';
import { useUserInfo } from '@/shared/lib/user';
import { Box } from '@/web/lib/ui';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const userInfo = useUserInfo();
  const { activeOrganizer } = useOrganizer();

  const renderNavBar = userInfo && activeOrganizer;

  return (
    <Box
      height="100vh"
      width="100vw"
      overflow={renderNavBar ? 'hidden' : 'auto'}
    >
      {renderNavBar && (
        <Navbar userInfo={userInfo} organizer={activeOrganizer} />
      )}
      {children}
    </Box>
  );
};
