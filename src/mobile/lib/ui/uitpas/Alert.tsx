import { HTMLAttributes, PropsWithChildren } from "react";
import { useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

type AlertProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    type: "success" | "error";
  };

export const Alert = ({ type, style, ...props }: AlertProps) => {
  const theme = useTheme();

  const backgroundColor =
    type === "success" ? theme.palette.brand[200] : theme.palette.error.light;
  const borderColor = theme.palette.brand[300];
  const color =
    type === "success" ? theme.palette.brand[900] : theme.palette.neutral[0];

  return (
    <div
      style={{
        display: "flex",
        borderRadius: "8px",
        border: `1px solid ${borderColor}`,
        alignItems: "center",
        columnGap: "13px",
        padding: "8px 12px",
        backgroundColor,
        color,
        ...style,
      }}
      {...props}
    >
      {type === "success" && (
        <CheckCircle
          sx={{ fontSize: "36px", color: theme.palette.primary.main }}
        />
      )}
      <p style={{ fontWeight: 700, fontSize: "16px", margin: 0 }}>
        {props.children}
      </p>
    </div>
  );
};
