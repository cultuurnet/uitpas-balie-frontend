import type { ComponentProps } from 'react';

import { FocusColor, focusColorValues } from '@/app/const/focusColors';
import {
  InputGroup as ShadcnInputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/ui/shadcn/input-group';

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
