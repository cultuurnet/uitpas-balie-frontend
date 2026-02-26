import NextLink from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/utils/shadcn';

const variantClasses = {
  default: 'text-neutral-550 hover:text-primary',
  primary: 'text-primary font-semibold hover:text-primary-dark',
  secondary: 'text-secondary font-semibold hover:text-secondary/80',
};

export type LinkProps = {
  href: string;
  title?: string;
  variant?: keyof typeof variantClasses;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export const Link = ({
  href,
  title,
  variant = 'default',
  children,
  icon,
  className,
}: LinkProps) => {
  const isExternal = !href.startsWith('/') && !href.startsWith('#');
  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <NextLink
      href={href}
      className={cn(
        'inline-flex items-center gap-2 underline underline-offset-4',
        variantClasses[variant],
        className,
      )}
      {...externalProps}
    >
      {children ?? title}
      {icon}
    </NextLink>
  );
};
