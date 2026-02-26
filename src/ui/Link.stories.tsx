import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from './Link';

const meta = {
  title: 'UI/Link',
  component: Link,
  parameters: { layout: 'centered' },
  args: {
    href: '/example',
    title: 'Link label',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const WithIcon: Story = {
  args: {
    icon: <ArrowRight />,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    icon: <ArrowRight />,
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <span>
        Custom <strong>component</strong> content
      </span>
    ),
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    title: 'Open external link',
    icon: <ExternalLink />,
  },
};
