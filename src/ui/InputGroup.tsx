import type { ComponentProps } from 'react';

import {
  InputGroup as ShadcnInputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/ui/shadcn/input-group';

export type InputGroupProps = ComponentProps<typeof ShadcnInputGroup>;

export const InputGroup = (props: InputGroupProps) => (
  <ShadcnInputGroup {...props} />
);

export {
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
