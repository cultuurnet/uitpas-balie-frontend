import { Spinner as ShadcnSpinner } from '@/ui/shadcn/spinner';
import type { ComponentProps } from 'react';

export type SpinnerProps = ComponentProps<typeof ShadcnSpinner>;

export const Spinner = (props: SpinnerProps) => <ShadcnSpinner {...props} />;
