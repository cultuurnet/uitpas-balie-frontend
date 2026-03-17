import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { OrganizerSelectorRow } from './OrganizerSelectorRow';

const meta = {
  title: 'Organizers/OrganizerSelectorRow',
  component: OrganizerSelectorRow,
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
    organizer: {
      id: '1',
      name: 'Muntpunt',
      cardSystems: [{ id: 1, name: 'Regio Gent' }],
    },
    onClick: () => {},
  },
} satisfies Meta<typeof CounterSelectorRow>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const MultipleRegions: Story = {
  args: {
    organizer: {
      id: '2',
      name: 'De Brakke Grond',
      cardSystems: [
        { id: 1, name: 'Regio Gent' },
        { id: 2, name: 'Paspartoe' },
        { id: 3, name: 'UiTPAS Brussel' },
      ],
    },
  },
};

export const ManyRegions: Story = {
  args: {
    organizer: {
      id: '3',
      name: 'Leietheater',
      cardSystems: [
        { id: 1, name: 'Regio Gent' },
        { id: 2, name: 'Paspartoe' },
        { id: 3, name: 'UiTPAS Brussel' },
        { id: 4, name: 'Regio Leuven' },
      ],
    },
  },
};

export const LongName: Story = {
  args: {
    organizer: {
      id: '4',
      name: 'Het gemeentelijk openbaar zwembad van Sint-Joris-Weert (a.k.a. "de vijvers van Het Zoete Water"',
      cardSystems: [{ id: 1, name: 'Regio Leuven' }],
    },
  },
};
