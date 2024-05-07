"use client";

import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { ButtonProps } from "@mui/material";

// ⚠️ Using LoadingButtonProps gives an error during build: "Type error: Excessive complexity comparing types"
export const LoadingButton = (props: ButtonProps & { loading?: boolean }) => {
  return (
    <MuiLoadingButton
      variant="contained"
      fullWidth
      {...props}
      sx={{
        height: "48px",
        borderRadius: "16px",
        textTransform: "none",
        fontWeight: 700,
        fontSize: "16px",
        ...props.sx,
      }}
    />
  );
};
