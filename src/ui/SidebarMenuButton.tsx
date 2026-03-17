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
      'data-[active=true]:shadow-[inset_4px_0_0_var(--color-neutral-600)] data-[active=true]:bg-primary-light data-[active=true]:font-medium data-[active=true]:text-neutral-600 data-[active=true]:hover:bg-primary-light',
      className,
    )}
    {...props}
  />
);

export { SidebarMenuButton };
