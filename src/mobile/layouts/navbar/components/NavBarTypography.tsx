import { Typography, TypographyProps, useTheme } from "@mui/material";

export const NavBarTypography = ({ children, ...props }: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h1"
      {...props}
      sx={{
        color: theme.palette.neutral[0],
        padding: "0 0 0 16px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        ...props.sx,
      }}
    >
      {children}
    </Typography>
  );
};
