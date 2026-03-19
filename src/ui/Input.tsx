import type { ComponentProps } from 'react';

import { FocusColor, focusColorValues } from '@/app/const/focusColors';
import { Input as ShadcnInput } from '@/ui/shadcn/input';

type InputProps = ComponentProps<typeof ShadcnInput> & {
  focusColor?: FocusColor;
};

const Input = ({ focusColor = 'primary', style, ...props }: InputProps) => (
  <ShadcnInput
    style={
      {
        '--ring': focusColorValues[focusColor],
        ...style,
      } as React.CSSProperties
    }
    {...props}
  />
);

export { Input };
export type { InputProps };
