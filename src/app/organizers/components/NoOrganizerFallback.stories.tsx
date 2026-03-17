import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NoOrganizerFallback } from './NoOrganizerFallback';

const meta = {
  title: 'Organizers/NoOrganizerFallback',
  component: NoOrganizerFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NoOrganizerFallback>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
