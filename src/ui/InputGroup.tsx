import type { ComponentProps } from 'react';

import {
  InputGroup as ShadcnInputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/ui/shadcn/input-group';

type FocusColor = 'primary' | 'secondary' | 'muted';

const focusColorValues: Record<FocusColor, string> = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  muted: 'var(--color-ring)',
};

export type InputGroupProps = ComponentProps<typeof ShadcnInputGroup> & {
  focusColor?: FocusColor;
};

export const InputGroup = ({
  focusColor = 'primary',
  className,
  style,
  ...props
}: InputGroupProps) => (
  <ShadcnInputGroup
    className={className}
    style={
      {
        '--ring': focusColorValues[focusColor],
        ...style,
      } as React.CSSProperties
    }
    {...props}
  />
);

export {
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
