import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Search as SearchIcon, X } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from './InputGroup';

const meta = {
  title: 'UI/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '<a href="https://ui.shadcn.com/docs/components/radix/input-group" target="_blank" rel="noopener noreferrer">See the full shadcn component documentation</a>',
      },
    },
  },
  argTypes: {
    focusColor: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted'],
    },
  },
  args: { className: 'w-80', focusColor: 'primary' },
} satisfies Meta<typeof InputGroup>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Typ hier..." />
    </InputGroup>
  ),
};

export const WithLeadingIcon: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Zoeken..." />
    </InputGroup>
  ),
};

export const WithTrailingButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Zoeken..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="Wis zoekopdracht">
          <X />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Search: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Zoek balie..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="Wis zoekopdracht">
          <X />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithTextPrefix: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon align="inline-start">
        <InputGroupText>€</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="0,00" type="number" />
    </InputGroup>
  ),
};
