import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';

import { CounterContext } from '@/app/CounterProvider';
import type { Counter } from '@/store/counterStore';

import { CounterSelector } from './CounterSelector';

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

const withContext = (lastCounterUsed: Counter = null): Decorator =>
  function WithContext(Story) {
    return (
      <CounterContext.Provider
        value={{
          activeCounter: null,
          lastCounterUsed,
          setActiveCounter: () => {},
          setLastCounterUsed: () => {},
        }}
      >
        <Story />
      </CounterContext.Provider>
    );
  };

const meta = {
  title: 'Counters/CounterSelector',
  component: CounterSelector,
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
    withContext(),
  ],
  args: {
    data: mockData,
    filterString: '',
    isLoading: false,
    onSelect: () => {},
  },
} satisfies Meta<typeof CounterSelector>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const WithLastCounter: Story = {
  decorators: [withContext(mockOrganizer)],
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const EmptySearch: Story = {
  args: { data: [], filterString: 'xyz' },
};

export const NoCounters: Story = {
  args: { data: [], filterString: '' },
};
