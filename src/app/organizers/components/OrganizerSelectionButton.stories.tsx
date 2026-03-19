import { faker } from '@faker-js/faker/locale/nl';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from '@/ui/shadcn/sidebar';

import { OrganizerSelectionButton } from './OrganizerSelectionButton';

const mockOrganizer = {
  id: '1',
  name: 'Muntpunt',
  cardSystems: [{ id: 1, name: 'Paspartoe Brussel' }],
};

const mockOrganizerPermissions = [
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
  title: 'Organizers/OrganizerSelectionButton',
  component: OrganizerSelectionButton,
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
    activeOrganizer: mockOrganizer,
    organizerPermissions: mockOrganizerPermissions,
    requestAccessHref: '/organizers/request',
    totalOrganizers: 3,
    onSelect: () => {},
  },
} satisfies Meta<typeof OrganizerSelectionButton>;

type Story = StoryObj<typeof meta>;

faker.seed(42);

const manyOrganizers = Array.from({ length: 20 }, (_, i) => ({
  organizer: {
    id: String(i + 10),
    name: faker.animal.petName(),
    cardSystems: [{ id: 1, name: `Regio ${faker.location.city()}` }],
  },
}));

export default meta;

export const Default: Story = {};

export const ManyOrganizers: Story = {
  args: { organizerPermissions: manyOrganizers, totalOrganizers: 21 },
};
