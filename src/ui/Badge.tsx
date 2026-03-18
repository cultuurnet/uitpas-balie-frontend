import type { ComponentProps } from 'react';

import { FocusColor } from '@/app/const/focusColors';
import { Badge as ShadcnBadge } from '@/ui/shadcn/badge';
import { cn } from '@/utils/shadcn';

const badgeBgClasses: Record<FocusColor, string> = {
  primary: 'bg-primary text-white border-transparent',
  secondary: 'bg-secondary text-white border-transparent',
  muted: 'bg-neutral-200 border-transparent',
};

const badgeTextClasses: Record<FocusColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  muted: 'text-neutral-700',
};

const defaultTextColor: Partial<Record<FocusColor, FocusColor>> = {
  muted: 'primary',
};

type BadgeProps = ComponentProps<typeof ShadcnBadge> & {
  color?: FocusColor;
  textColor?: FocusColor;
};

const Badge = ({
  color = 'muted',
  textColor,
  className,
  ...props
}: BadgeProps) => {
  const resolvedTextColor = textColor ?? defaultTextColor[color];
  return (
    <ShadcnBadge
      className={cn(
        'rounded-md font-normal',
        badgeBgClasses[color],
        resolvedTextColor && badgeTextClasses[resolvedTextColor],
        className,
      )}
      {...props}
    />
  );
};

export { Badge };
export type { BadgeProps };
