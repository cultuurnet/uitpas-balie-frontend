import type { Meta, StoryObj } from '@storybook/react';
import { Mail, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: { children: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = { args: { variant: 'destructive' } };

export const Outline: Story = { args: { variant: 'outline' } };

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Link: Story = { args: { variant: 'link' } };

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
