import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '<a href="https://ui.shadcn.com/docs/components/input" target="_blank" rel="noopener noreferrer">See the full shadcn component documentation</a>',
      },
    },
  },
  args: {
    placeholder: 'Voer tekst in...',
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Secondary: Story = { args: { focusColor: 'secondary' } };

export const Muted: Story = { args: { focusColor: 'muted' } };
