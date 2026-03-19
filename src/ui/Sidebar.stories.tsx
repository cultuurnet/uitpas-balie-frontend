import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  CalendarDays,
  Download,
  Home,
  IdCard,
  LogOut,
  Newspaper,
  Usb,
} from 'lucide-react';

import { SidebarMenuButton } from '@/layouts/components/SidebarMenuButton';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from '@/ui/shadcn/sidebar';

import { Sidebar } from './Sidebar';

const meta = {
  title: 'UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '<a href="https://ui.shadcn.com/docs/components/sidebar" target="_blank" rel="noopener noreferrer">See the full shadcn component documentation</a>',
      },
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

const primaryNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Activiteiten', href: '/activities', icon: CalendarDays },
  { label: 'Onkostennota', href: '/expense-report', icon: Download },
  { label: 'Pashouders', href: '/pashouders', icon: IdCard },
];

const secondaryNavItems = [
  { label: 'Kaartlezers', href: '/kaartlezers', icon: Usb },
  { label: 'Nieuws', href: '/nieuws', icon: Newspaper },
];

const allNavItems = [...primaryNavItems, ...secondaryNavItems];

type NavigationArgs = { activeHref: string | null };

export default meta;

export const Empty: StoryObj<typeof meta> = {};

export const WithNavigation: StoryObj<NavigationArgs> = {
  argTypes: {
    activeHref: {
      options: [...allNavItems.map((i) => i.href)],
      control: {
        type: 'select',
        labels: Object.fromEntries([
          ...allNavItems.map((i) => [i.href, i.label]),
        ]),
      },
    },
  },
  args: { activeHref: null },
  render: ({ activeHref }) => (
    <Sidebar>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {primaryNavItems.map(({ label, href, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton isActive={href === activeHref}>
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup className="mt-auto">
        <SidebarSeparator className="mx-0 w-full" />
        <SidebarGroupContent>
          <SidebarMenu>
            {secondaryNavItems.map(({ label, href, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton isActive={href === activeHref}>
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut />
                <span>Afmelden</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  ),
};
