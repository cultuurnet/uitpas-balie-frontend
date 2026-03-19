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
    variant: {
      control: 'select',
      options: [
        'primary',
        'primary-inverted',
        'blue',
        'blue-inverted',
        'red',
        'red-inverted',
        'yellow',
        'yellow-inverted',
        'secondary',
        'secondary-inverted',
        'gray',
        'gray-inverted',
      ],
    },
  },
  args: {
    children: 'Badge',
    variant: 'primary',
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

const colorPairs = [
  ['primary', 'primary-inverted'],
  ['blue', 'blue-inverted'],
  ['red', 'red-inverted'],
  ['yellow', 'yellow-inverted'],
  ['secondary', 'secondary-inverted'],
  ['gray', 'gray-inverted'],
] as const;

export default meta;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {colorPairs.map(([normal, inverted]) => (
        <div key={normal} className="flex gap-2">
          <Badge variant={normal}>Badge</Badge>
          <Badge variant={inverted}>Badge</Badge>
        </div>
      ))}
    </div>
  ),
};

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
