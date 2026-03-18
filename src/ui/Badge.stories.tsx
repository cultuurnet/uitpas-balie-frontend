import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Check } from 'lucide-react';

import { Badge } from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '<a href="https://ui.shadcn.com/docs/components/badge" target="_blank" rel="noopener noreferrer">See the full shadcn component documentation</a>',
      },
    },
  },
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'muted'] },
    textColor: {
      control: 'select',
      options: ['primary', 'secondary', 'muted'],
    },
  },
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Primary: Story = { args: { color: 'primary' } };

export const Secondary: Story = { args: { color: 'secondary' } };

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Check className="size-3" />
        eID lezer gevonden
      </>
    ),
  },
};
