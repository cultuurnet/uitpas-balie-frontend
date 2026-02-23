import { Box, SvgIconTypeMap, SxProps, useTheme } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type NavBarIconProps = {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  sx?: SxProps;
};

export const NavBarIcon = ({ icon, sx }: NavBarIconProps) => {
  const theme = useTheme();

  return (
    <Box
      component={icon}
      sx={{ fontSize: 24, color: theme.palette.neutral[0], ...sx }}
    />
  );
};
