import type { ComponentProps } from 'react';

import { Spinner as ShadcnSpinner } from '@/ui/shadcn/spinner';

export type SpinnerProps = ComponentProps<typeof ShadcnSpinner>;

export const Spinner = (props: SpinnerProps) => <ShadcnSpinner {...props} />;
