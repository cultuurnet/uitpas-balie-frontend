import { faker } from '@faker-js/faker/locale/nl';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from '@/ui/shadcn/sidebar';

import { CounterSelectionButton } from './CounterSelectionButton';

const mockCounter = {
  id: '1',
  name: 'Muntpunt',
  cardSystems: [{ id: 1, name: 'Paspartoe Brussel' }],
};

const mockCounters = [
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
      cardSystems: [{ id: 1, name: 'Regio Gent' }],
    },
  },
];

const meta = {
  title: 'UI/CounterSelectionButton',
  component: CounterSelectionButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <SidebarProvider className="min-h-0">
        <SidebarMenu className="w-56">
          <SidebarMenuItem>
            <Story />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarProvider>
    ),
  ],
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    activeCounter: mockCounter,
    counters: mockCounters,
    lastCounterUsed: mockCounter,
    requestAccessHref: '/counters/request',
    totalCounters: 3,
    onSelect: () => {},
  },
} satisfies Meta<typeof CounterSelectionButton>;

type Story = StoryObj<typeof meta>;

faker.seed(42);

const manyCounters = Array.from({ length: 20 }, (_, i) => ({
  organizer: {
    id: String(i + 10),
    name: faker.animal.petName(),
    cardSystems: [{ id: 1, name: `Regio ${faker.location.city()}` }],
  },
}));

export default meta;

export const Default: Story = {};

export const ManyCounters: Story = {
  args: { counters: manyCounters, totalCounters: 21 },
};
