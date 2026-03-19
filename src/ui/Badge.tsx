import type { ComponentProps } from 'react';

import { Badge as ShadcnBadge } from '@/ui/shadcn/badge';
import { cn } from '@/utils/shadcn';

type ShadcnVariant = NonNullable<ComponentProps<typeof ShadcnBadge>['variant']>;

type BrandVariant =
  | 'primary'
  | 'primary-inverted'
  | 'blue'
  | 'blue-inverted'
  | 'red'
  | 'red-inverted'
  | 'yellow'
  | 'yellow-inverted'
  | 'secondary'
  | 'secondary-inverted'
  | 'gray'
  | 'gray-inverted';

type BadgeVariant = ShadcnVariant | BrandVariant;

const brandVariantClasses: Record<BrandVariant, string> = {
  primary: 'bg-primary-light text-primary-dark border-transparent',
  'primary-inverted': 'bg-primary text-white border-transparent',
  blue: 'bg-blue-light text-blue border-transparent',
  'blue-inverted': 'bg-blue text-blue-light border-transparent',
  red: 'bg-red-light text-red border-transparent',
  'red-inverted': 'bg-red text-red-light border-transparent',
  yellow: 'bg-yellow-light text-gray border-transparent',
  'yellow-inverted': 'bg-yellow text-white border-transparent',
  secondary: 'bg-secondary-light text-secondary border-transparent',
  'secondary-inverted': 'bg-secondary text-secondary-light border-transparent',
  gray: 'bg-gray-light text-gray border-transparent',
  'gray-inverted': 'bg-gray text-white border-transparent',
};

const isBrandVariant = (v: BadgeVariant): v is BrandVariant =>
  v in brandVariantClasses;

type BadgeProps = Omit<ComponentProps<typeof ShadcnBadge>, 'variant'> & {
  variant?: BadgeVariant;
};

const Badge = ({ variant = 'primary', className, ...props }: BadgeProps) => (
  <ShadcnBadge
    variant={isBrandVariant(variant) ? undefined : variant}
    className={cn(
      'rounded-md font-normal',
      isBrandVariant(variant) && brandVariantClasses[variant],
      className,
    )}
    {...props}
  />
);

export { Badge };
export type { BadgeProps, BadgeVariant, BrandVariant };
