import {
  InputGroup as ShadcnInputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from '@/ui/shadcn/input-group';
import type { ComponentProps } from 'react';

export type InputGroupProps = ComponentProps<typeof ShadcnInputGroup>;

export const InputGroup = (props: InputGroupProps) => (
  <ShadcnInputGroup {...props} />
);

export {
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
