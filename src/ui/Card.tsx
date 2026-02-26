import {
  Card as ShadcnCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '@/ui/shadcn/card';
import { cn } from '@/utils/shadcn';
import type { ComponentProps } from 'react';

const backgroundClasses = {
  white: 'bg-white',
  gradient: 'bg-[linear-gradient(135deg,#fafafa,#f5f5f5)]',
};

export type CardProps = ComponentProps<typeof ShadcnCard> & {
  accentColor?: string;
  background?: keyof typeof backgroundClasses;
};

export const Card = ({
  accentColor,
  background,
  className,
  children,
  ...props
}: CardProps) => (
  <ShadcnCard
    className={cn(
      'relative overflow-hidden',
      background && backgroundClasses[background],
      className,
    )}
    {...props}
  >
    {accentColor && (
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: accentColor }}
      />
    )}
    {children}
  </ShadcnCard>
);

export {
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
