import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CounterFallback } from './CounterFallback';

const meta = {
  title: 'Counters/CounterFallback',
  component: CounterFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CounterFallback>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
