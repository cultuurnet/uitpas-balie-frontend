import { HTMLAttributes, PropsWithChildren, useState } from "react";
import { IconButton, useTheme } from "@mui/material";
import { useTranslation } from "@/shared/lib/i18n/client";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

type OpportunityStateCardProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    status: "ACTIVE" | "SUSPENDED" | "EXPIRED" | "BLOCKED";
  };

export const OpportunityStateCard = ({
  status,
  ...props
}: OpportunityStateCardProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const statusColors = {
    ACTIVE: theme.palette.brand.blue,
    EXPIRED: theme.palette.brand.red,
    SUSPENDED: theme.palette.brand.orange,
    BLOCKED: theme.palette.brand.purple,
  };
  const backgroundColor = statusColors[status];
  const borderColor = theme.palette.brand[300];

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        border: `1px solid ${borderColor}`,
        rowGap: "6px",
        padding: "8px 12px",
        backgroundColor,
        color: theme.palette.neutral[0],
        ...props.style,
      }}
      onClick={handleClick}
      {...props}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <p style={{ fontWeight: 700, fontSize: "18px", margin: 0 }}>
          {t(`saving.mobile.opportunityState.${status.toLowerCase()}.title`)}
        </p>
        <IconButton
          disableRipple
          sx={{
            p: 0,
            color: theme.palette.neutral[0],
            transform: "scale(1.5)",
            width: "22px",
            height: "12px",
          }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>
      {open && <>{props.children}</>}
    </div>
  );
};
