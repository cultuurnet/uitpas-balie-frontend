import { Box, BoxProps } from '@mui/material';
import { ElementType, ReactNode } from 'react';

type NavBarItemContainerProps<C extends ElementType> = BoxProps<C> & {
  component?: C;
  children: ReactNode;
};

export const NavBarItemContainer = <C extends ElementType = typeof Box>({
  children,
  component,
  ...props
}: NavBarItemContainerProps<C>) => {
  return (
    <Box
      component={component}
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mr: '8px',
        textDecoration: 'none',
        overflow: 'hidden',
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};
