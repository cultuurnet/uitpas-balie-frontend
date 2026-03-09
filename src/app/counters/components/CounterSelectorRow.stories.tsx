import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CounterSelectorRow } from './CounterSelectorRow';

const meta = {
  title: 'Counters/CounterSelectorRow',
  component: CounterSelectorRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-125">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: 'onClick' },
  },
  args: {
    organizer: { id: '1', name: 'Muntpunt' },
    onClick: () => {},
  },
} satisfies Meta<typeof CounterSelectorRow>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const LongName: Story = {
  args: {
    organizer: {
      id: '2',
      name: 'Het gemeentelijk openbaar zwembad van Sint-Joris-Weert (a.k.a. "de vijvers van Het Zoete Water"',
    },
  },
};
