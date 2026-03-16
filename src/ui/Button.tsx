import type { ComponentProps } from 'react';

import { Button as ShadcnButton, buttonVariants } from '@/ui/shadcn/button';
import { cn } from '@/utils/shadcn';

export type ButtonProps = ComponentProps<typeof ShadcnButton>;

export const Button = ({ className, ...props }: ButtonProps) => (
  <ShadcnButton className={cn('cursor-pointer', className)} {...props} />
);

export { buttonVariants };
