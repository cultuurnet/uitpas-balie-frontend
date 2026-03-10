import {
  BarChart3,
  CalendarDays,
  Download,
  Gift,
  Home,
  IdCard,
  Tablet,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/ui/shadcn/sidebar';
import { Sidebar } from '@/ui/Sidebar';

const navItems = [
  { label: 'Home', href: '/app', icon: Home },
  { label: 'Pashouders', href: '/app/pashouders', icon: IdCard },
  { label: 'Activiteiten', href: '/app/activities', icon: CalendarDays },
  { label: 'Voordelen', href: '/app/voordelen', icon: Gift },
  { label: 'Zuilen', href: '/app/zuilen', icon: Tablet },
  { label: 'Onkostennota', href: '/app/expense-report', icon: Download },
  { label: 'Medewerkers', href: '/app/medewerkers', icon: Users },
  { label: 'Statistieken', href: '/app/statistieken', icon: BarChart3 },
];

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <Sidebar>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ label, href, icon: Icon }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      className="py-6 px-5  hover:bg-[#abefb680] hover:text-[#1e8a56]"
                    >
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
      </SidebarProvider>
      <div>{children}</div>
    </div>
  );
};
