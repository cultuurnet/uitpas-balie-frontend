import type { ComponentProps } from 'react';

import { Button as ShadcnButton, buttonVariants } from '@/ui/shadcn/button';

export type ButtonProps = ComponentProps<typeof ShadcnButton>;

export const Button = (props: ButtonProps) => <ShadcnButton {...props} />;

export { buttonVariants };
