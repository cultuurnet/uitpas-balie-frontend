import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { OrganizerSelector } from './OrganizerSelector';

const mockOrganizer = {
  id: '1',
  name: 'Muntpunt',
  cardSystems: [{ id: 1, name: 'Regio Gent' }],
};

const mockData = [
  {
    organizer: {
      id: '1',
      name: '[TEST] UiTPAS Organisatie',
      cardSystems: [
        { id: 1, name: 'Regio Gent' },
        { id: 2, name: 'Paspartoe' },
      ],
    },
  },
  {
    organizer: {
      id: '2',
      name: 'Danshuis De Ingang',
      cardSystems: [{ id: 2, name: 'Paspartoe' }],
    },
  },
  {
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
];

const meta = {
  title: 'Organizers/OrganizerSelector',
  component: OrganizerSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  decorators: [
    (Story) => (
      <div className="w-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    data: mockData,
    filterString: '',
    isLoading: false,
    lastOrganizerUsed: undefined,
    onSelect: () => {},
  },
} satisfies Meta<typeof OrganizerSelector>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const WithLastOrganizer: Story = {
  args: { lastOrganizerUsed: mockOrganizer },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const EmptySearch: Story = {
  args: { data: [], filterString: 'xyz' },
};

export const NoOrganizers: Story = {
  args: { data: [], filterString: '' },
};
