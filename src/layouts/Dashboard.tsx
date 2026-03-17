'use client';

import {
  CalendarDays,
  ChartBar,
  Download,
  Gift,
  House,
  IdCard,
  LucideIcon,
  Newspaper,
  Tablet,
  Usb,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import { useCounter } from '@/hooks/useCounter';
import { useGetCounters } from '@/hooks/useGetCounters';
import { useConfig } from '@/shared/feature-config/context/useConfig';
import { useLogout } from '@/shared/lib/auth';
import { Organizer } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';
import { useUserInfo } from '@/shared/lib/user';
import { storeCounter } from '@/store/counterStore';
import { CounterSelectionButton } from '@/ui/CounterSelectionButton';
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

type NavItem = { label: string; href: string; icon: LucideIcon };

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const logout = useLogout();
  const { t } = useTranslation();
  const user = useUserInfo();
  const { publicRuntimeConfig } = useConfig();
  const { activeCounter, lastCounterUsed, setActiveCounter } = useCounter();
  const { allData, data } = useGetCounters(lastCounterUsed);
  const totalCounters = Array.isArray(allData?.data) ? allData.data.length : 0;

  const primaryNavItems: NavItem[] = [
    { label: t('nav.home'), href: '/', icon: House },
    { label: t('nav.passholders'), href: '/pashouders', icon: IdCard },
    { label: t('nav.activities'), href: '/activities', icon: CalendarDays },
    { label: t('nav.advantages'), href: '/voordelen', icon: Gift },
    { label: t('nav.checkindevices'), href: '/zuilen', icon: Tablet },
    { label: t('nav.expenseReport'), href: '/expense-report', icon: Download },
    { label: t('nav.counterMemberships'), href: '/medewerkers', icon: Users },
    {
      label: t('nav.counterStatistics'),
      href: '/statistieken',
      icon: ChartBar,
    },
  ];

  const secondaryNavItems: NavItem[] = [
    { label: t('nav.cardreaders'), href: '/kaartlezers', icon: Usb },
    { label: t('nav.news'), href: '/nieuws', icon: Newspaper },
  ];

  const handleSelectCounter = (organizer: Organizer) => {
    storeCounter(organizer);
    setActiveCounter(organizer);
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
          <CounterSelectionButton
            activeCounter={activeCounter}
            counters={data}
            lastCounterUsed={lastCounterUsed}
            requestAccessHref="/counters/request"
            totalCounters={totalCounters}
            onSelect={handleSelectCounter}
          />
        }
      >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavItems.map(({ label, href, icon: Icon }) => {
                const isActive =
                  href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={href}>
                        <Icon />
                        <span>{label}</span>
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
              {secondaryNavItems.map(({ label, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild>
                    <Link href={href}>
                      <Icon />
                      <span>{label}</span>
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
