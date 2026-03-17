import { ComponentProps } from 'react';

import { SidebarMenuButton as ShadcnSidebarMenuButton } from '@/ui/shadcn/sidebar';
import { cn } from '@/utils/shadcn';

const SidebarMenuButton = ({
  className,
  ...props
}: ComponentProps<typeof ShadcnSidebarMenuButton>) => (
  <ShadcnSidebarMenuButton
    className={cn(
      'px-5 py-6 hover:bg-primary-light/50 hover:text-primary-dark',
      'data-[active=true]:border-l-4 data-[active=true]:border-primary-dark data-[active=true]:bg-primary-light data-[active=true]:pl-4 data-[active=true]:font-medium data-[active=true]:text-primary-dark data-[active=true]:hover:bg-primary-light',
      className,
    )}
    {...props}
  />
);

export { SidebarMenuButton };
