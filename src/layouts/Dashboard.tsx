'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import {
  primaryNavItems,
  secondaryNavItems,
} from '@/app/const/navigationItems';
import { useGetOrganizers } from '@/hooks/useGetOrganizers';
import { useOrganizer } from '@/hooks/useOrganizer';
import { useConfig } from '@/shared/feature-config/context/useConfig';
import { useLogout } from '@/shared/lib/auth';
import { Organizer } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';
import { useUserInfo } from '@/shared/lib/user';
import { storeOrganizer } from '@/store/organizerStore';
import { OrganizerSelectionButton } from '@/ui/OrganizerSelectionButton';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/ui/shadcn/sidebar';
import { Sidebar } from '@/ui/Sidebar';
import { SidebarMenuButton } from '@/ui/SidebarMenuButton';
import { SidebarUserFooter } from '@/ui/SidebarUserFooter';

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const logout = useLogout();
  const { t } = useTranslation();
  const user = useUserInfo();
  const { publicRuntimeConfig } = useConfig();
  const {
    activeOrganizer,
    lastOrganizerUsed,
    setActiveOrganizer,
    setLastOrganizerUsed,
  } = useOrganizer();
  const { allData, data } = useGetOrganizers(lastOrganizerUsed);
  const totalOrganizers = Array.isArray(allData?.data)
    ? allData.data.length
    : 0;

  const handleSelectOrganizer = (organizer: Organizer) => {
    setLastOrganizerUsed(organizer);
    storeOrganizer(organizer);
    setActiveOrganizer(organizer);
  };

  return (
    <SidebarProvider>
      <Sidebar
        footerContent={
          user && (
            <SidebarUserFooter
              email={user.email}
              name={user.given_name}
              profileUrl={publicRuntimeConfig?.profileUrl ?? ''}
              onLogout={logout}
            />
          )
        }
        headerContent={
          <OrganizerSelectionButton
            activeOrganizer={activeOrganizer}
            organizerPermissions={data}
            requestAccessHref="/organizers/request"
            totalOrganizers={totalOrganizers}
            onSelect={handleSelectOrganizer}
          />
        }
      >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavItems.map(({ translationKey, href, icon: Icon }) => {
                const isActive =
                  href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={href}>
                        <Icon />
                        <span>{t(translationKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarSeparator className="mx-0 w-full" />
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map(({ translationKey, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild>
                    <Link href={href}>
                      <Icon />
                      <span>{t(translationKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
      <main className="flex-1 bg-neutral-300">
        <div className="flex items-center p-2 md:hidden">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};
