import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SearchUiTPASCard } from './SearchUiTPASCard';

const meta = {
  title: 'Dashboard/SearchUiTPASCard',
  component: SearchUiTPASCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    onSubmit: () => {},
    searchPassholderHref: '#',
  },
} satisfies Meta<typeof SearchUiTPASCard>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
