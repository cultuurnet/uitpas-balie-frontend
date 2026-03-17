'use client';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUsb } from '@fortawesome/free-brands-svg-icons';
import {
  faCalendarDays,
  faChartBar,
  faDownload,
  faGift,
  faHouse,
  faIdCard,
  faNewspaper,
  faRightFromBracket,
  faTablet,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import { useCounter } from '@/hooks/useCounter';
import { useGetCounters } from '@/hooks/useGetCounters';
import { useLogout } from '@/shared/lib/auth';
import { Organizer } from '@/shared/lib/dataAccess';
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

const primaryNavItems: { label: string; href: string; icon: IconDefinition }[] = [
  { label: 'Home', href: '/', icon: faHouse },
  { label: 'Pashouders', href: '/pashouders', icon: faIdCard },
  { label: 'Activiteiten', href: '/activities', icon: faCalendarDays },
  { label: 'Voordelen', href: '/voordelen', icon: faGift },
  { label: 'Zuilen', href: '/zuilen', icon: faTablet },
  { label: 'Onkostennota', href: '/expense-report', icon: faDownload },
  { label: 'Medewerkers', href: '/medewerkers', icon: faUsers },
  { label: 'Statistieken', href: '/statistieken', icon: faChartBar },
];

const secondaryNavItems: { label: string; href: string; icon: IconDefinition }[] = [
  { label: 'Kaartlezers', href: '/kaartlezers', icon: faUsb },
  { label: 'Nieuws', href: '/nieuws', icon: faNewspaper },
];

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const logout = useLogout();
  const { activeCounter, lastCounterUsed, setActiveCounter } = useCounter();
  const { allData, data } = useGetCounters(lastCounterUsed);
  const totalCounters = Array.isArray(allData?.data) ? allData.data.length : 0;

  const handleSelectCounter = (organizer: Organizer) => {
    storeCounter(organizer);
    setActiveCounter(organizer);
  };

  return (
    <SidebarProvider>
      <Sidebar
        headerContent={
          <CounterSelectionButton
            activeCounter={activeCounter}
            counters={data}
            lastCounterUsed={lastCounterUsed}
            requestAccessHref="https://www.uitpas.be/toegang-aanvragen"
            totalCounters={totalCounters}
            onSelect={handleSelectCounter}
          />
        }
      >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavItems.map(({ label, href, icon }) => {
                const isActive =
                  href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={href}>
                        <FontAwesomeIcon icon={icon} />
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
              {secondaryNavItems.map(({ label, href, icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild>
                    <Link href={href}>
                      <FontAwesomeIcon icon={icon} />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => logout()}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span>Afmelden</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
