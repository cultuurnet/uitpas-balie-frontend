import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'centered' },
  args: {
    className: 'w-80',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AccentPrimary: Story = {
  args: { accentColor: 'var(--color-primary)' },
};

export const AccentSecondary: Story = {
  args: { accentColor: 'var(--color-secondary)' },
};

export const AccentCustomColor: Story = { args: { accentColor: '#3f2675' } };

export const BackgroundWhite: Story = { args: { background: 'white' } };

export const BackgroundGradient: Story = {
  args: {
    background: 'gradient',
    accentColor: 'var(--color-primary)',
    children: (
      <>
        <CardHeader>
          <CardTitle>Kaart met achtergrond</CardTitle>
          <CardDescription>
            Gradient achtergrond met accent kleur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Kaartinhoud met gradient achtergrond en primaire accentlijn.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Actie</Button>
        </CardFooter>
      </>
    ),
  },
};
