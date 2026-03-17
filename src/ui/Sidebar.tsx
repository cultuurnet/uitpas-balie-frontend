import Image from 'next/image';
import { PropsWithChildren, ReactNode } from 'react';

import { getAssetUrl } from '@/shared/lib/utils';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from '@/ui/shadcn/sidebar';

type Props = PropsWithChildren<{ headerContent?: ReactNode }>;

const Sidebar = ({ children, headerContent }: Props) => {
  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-5">
        <Image
          src={getAssetUrl('/images/svg/logo-uitpas-green.svg')}
          alt="UiTPAS Logo"
          width={140}
          height={42}
          priority
        />
        {headerContent}
      </SidebarHeader>
      <SidebarSeparator className="mx-0 w-full" />
      <SidebarContent>{children}</SidebarContent>
      <SidebarFooter />
    </ShadcnSidebar>
  );
};

export { Sidebar };
