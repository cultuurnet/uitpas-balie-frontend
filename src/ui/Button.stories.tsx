import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChevronRight, Loader2, Mail } from 'lucide-react';

import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '<a href="https://ui.shadcn.com/docs/components/button" target="_blank" rel="noopener noreferrer">See the full shadcn component documentation</a>',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon'],
    },
  },
  args: { children: 'Button' },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      {(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const).map(
        (variant) => (
          <Button key={variant} variant={variant}>
            Button
          </Button>
        ),
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">Button</Button>
      <Button size="sm">Button</Button>
      <Button>Button</Button>
      <Button size="lg">Button</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="icon">
        <Mail />
      </Button>
      <Button>
        <Mail /> Send
      </Button>
      <Button>
        Next <ChevronRight />
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button disabled>
        <Loader2 className="animate-spin" /> Loading
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const AsChild: Story = {
  args: { asChild: true, children: <a href="#">Link</a> },
};
