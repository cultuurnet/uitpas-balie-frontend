'use client';

import { ChevronsUpDown, Contact, LogOut, User } from 'lucide-react';
import Link from 'next/link';

import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from '@/shared/lib/i18n/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/shadcn/dropdown-menu';
import { SidebarMenuButton } from '@/ui/SidebarMenuButton';

type Props = {
  name: string;
  email: string;
  profileUrl: string;
  onLogout: () => void;
};

const avatar = (size: 'sm' | 'lg') => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-full bg-neutral-400 ${size === 'lg' ? 'size-10' : 'size-8'}`}
  >
    <User className="size-4 text-neutral-600" />
  </div>
);

const SidebarUserFooter = ({ name, email, profileUrl, onLogout }: Props) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="h-auto gap-3 px-3.5 py-3">
          {avatar('lg')}
          <div className="flex min-w-0 flex-1 flex-col items-start overflow-hidden">
            <span className="w-full truncate font-semibold">{name}</span>
            <span className="w-full truncate text-xs text-muted-foreground">
              {email}
            </span>
          </div>
          <ChevronsUpDown className="shrink-0" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width)"
        side={isMobile ? 'top' : 'right'}
        align="end"
        avoidCollisions={false}
      >
        <DropdownMenuLabel className="flex items-center gap-3 font-normal">
          {avatar('sm')}
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={profileUrl} rel="noopener noreferrer" target="_blank">
            <Contact className="mr-2 size-4" />
            {t('nav.profile')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 size-4" />
          {t('nav.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { SidebarUserFooter };
