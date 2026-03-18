import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from '@/ui/shadcn/sidebar';

import { SidebarUserFooter } from './SidebarUserFooter';

const meta = {
  title: 'UI/SidebarUserFooter',
  component: SidebarUserFooter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
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
  argTypes: {
    onLogout: { action: 'onLogout' },
  },
  args: {
    name: 'Jan Janssen',
    email: 'jan.janssen@example.com',
    profileUrl: 'https://profile.uitid.be',
    onLogout: () => {},
  },
} satisfies Meta<typeof SidebarUserFooter>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const WithoutProfileLink: Story = {
  args: { profileUrl: '' },
};
