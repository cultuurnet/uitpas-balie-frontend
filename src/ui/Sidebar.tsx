import Image from 'next/image';
import { PropsWithChildren } from 'react';

import { getAssetUrl } from '@/shared/lib/utils';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from '@/ui/shadcn/sidebar';

const Sidebar = ({ children }: PropsWithChildren) => {
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
      </SidebarHeader>
      <SidebarSeparator className="mx-0 w-full" />
      <SidebarContent>{children}</SidebarContent>
      <SidebarFooter />
    </ShadcnSidebar>
  );
};

export { Sidebar };
