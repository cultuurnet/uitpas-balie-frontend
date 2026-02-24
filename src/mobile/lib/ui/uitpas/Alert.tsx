'use client';

import {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useReducer,
} from 'react';
import { Box, useTheme } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

type AlertProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    type: 'success' | 'error';
    newAlert: boolean;
  };

export const Alert = ({ type, style, newAlert, ...props }: AlertProps) => {
  const theme = useTheme();
  const [animate, dispatch] = useReducer(
    (_: boolean, action: 'start' | 'stop') => action === 'start',
    true
  );

  useEffect(() => {
    dispatch('start');
    const timeout = setTimeout(() => dispatch('stop'), 10000);
    return () => clearTimeout(timeout);
  }, [type, props.children]);

  const backgroundColor =
    type === 'success' ? theme.palette.brand[200] : theme.palette.error.light;
  const borderColor = theme.palette.brand[300];
  const color =
    type === 'success' ? theme.palette.brand[900] : theme.palette.neutral[0];
  const scaleFrames = keyframes`
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.025);
    }
    50% {
      transform: scale(1.05);
    }
    75% {
      transform: scale(1.025);
    }
    100% {
      transform: scale(1);
    }`;
  const animation = animate ? `${scaleFrames} 0.5s linear` : 'none';

  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '8px',
        border: `1px solid ${borderColor}`,
        alignItems: 'center',
        columnGap: '13px',
        padding: '8px 12px',
        backgroundColor,
        color,
        ...(newAlert && {
          animation,
        }),
        ...style,
      }}
      {...props}
    >
      {type === 'success' && (
        <CheckCircle
          sx={{ fontSize: '36px', color: theme.palette.primary.main }}
        />
      )}
      <p style={{ fontWeight: 700, fontSize: '16px', margin: 0 }}>
        {props.children}
      </p>
    </Box>
  );
};
