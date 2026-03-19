import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CalendarDays } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from '@/ui/shadcn/sidebar';

import { SidebarMenuButton } from './SidebarMenuButton';

const meta = {
  title: 'Sidebar/SidebarMenuButton',
  component: SidebarMenuButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '<a href="https://ui.shadcn.com/docs/components/sidebar" target="_blank" rel="noopener noreferrer">See the full shadcn component documentation</a>',
      },
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider className="min-h-0">
        <SidebarMenu className="w-56">
          <SidebarMenuItem>
            <Story />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarProvider>
    ),
  ],
  args: {
    children: (
      <>
        <CalendarDays />
        <span>Activiteiten</span>
      </>
    ),
  },
} satisfies Meta<typeof SidebarMenuButton>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Active: Story = { args: { isActive: true } };
