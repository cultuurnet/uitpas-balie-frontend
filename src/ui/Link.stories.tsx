import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRight, ExternalLink } from 'lucide-react';

import { Link } from './Link';

const meta = {
  title: 'UI/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '<a href="https://nextjs.org/docs/app/api-reference/components/link" target="_blank" rel="noopener noreferrer">See the full Next.js Link documentation</a>',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
  },
  args: {
    href: '/example',
    title: 'Link label',
  },
} satisfies Meta<typeof Link>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(['default', 'primary', 'secondary'] as const).map((variant) => (
        <Link key={variant} href="/example" variant={variant}>
          Link label
        </Link>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
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
