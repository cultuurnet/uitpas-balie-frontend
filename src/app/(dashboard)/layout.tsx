import { FC, PropsWithChildren } from 'react';

import { DashboardLayout } from '@/layouts/Dashboard';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
