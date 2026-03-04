import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Spinner } from './Spinner';

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      Laden...
    </div>
  ),
};
