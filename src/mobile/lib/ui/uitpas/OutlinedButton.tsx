import { Button as MuiButton, ButtonProps, useTheme } from '@mui/material';

export const OutlinedButton = ({ children, ...props }: ButtonProps) => {
  const theme = useTheme();
  const { sx, ...restProps } = props;

  return (
    <MuiButton
      variant="outlined"
      fullWidth
      sx={{
        minHeight: '44px',
        height: '44px',
        borderRadius: '16px',
        textTransform: 'none',
        fontWeight: 700,
        fontSize: '16px',
        border: `2px solid ${theme.palette.primary.main}`,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textAlign: 'center',
        display: 'block',
        ...sx,
      }}
      {...restProps}
    >
      {children}
    </MuiButton>
  );
};
