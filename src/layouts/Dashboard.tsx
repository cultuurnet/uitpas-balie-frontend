'use client';

import {
  BarChart3,
  CalendarDays,
  Download,
  Gift,
  Home,
  IdCard,
  LogOut,
  Newspaper,
  Tablet,
  Usb,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import { useLogout } from '@/shared/lib/auth';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from '@/ui/shadcn/sidebar';
import { Sidebar } from '@/ui/Sidebar';
import { SidebarMenuButton } from '@/ui/SidebarMenuButton';

const primaryNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Pashouders', href: '/pashouders', icon: IdCard },
  { label: 'Activiteiten', href: '/activities', icon: CalendarDays },
  { label: 'Voordelen', href: '/voordelen', icon: Gift },
  { label: 'Zuilen', href: '/zuilen', icon: Tablet },
  { label: 'Onkostennota', href: '/expense-report', icon: Download },
  { label: 'Medewerkers', href: '/medewerkers', icon: Users },
  { label: 'Statistieken', href: '/statistieken', icon: BarChart3 },
];

const secondaryNavItems = [
  { label: 'Kaartlezers', href: '/kaartlezers', icon: Usb },
  { label: 'Nieuws', href: '/nieuws', icon: Newspaper },
];

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <SidebarProvider>
      <Sidebar>
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
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => logout()}>
                  <LogOut />
                  <span>Afmelden</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
      <main className="flex-1 bg-neutral-300">{children}</main>
    </SidebarProvider>
  );
};
