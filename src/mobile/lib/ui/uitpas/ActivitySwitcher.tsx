"use client";

import { useActivity } from "@/mobile/feature-activities/useActivity";
import { useTranslation } from "@/shared/lib/utils/hooks/useTranslation";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  type BoxProps,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

export const ActivitySwitcher = forwardRef(({ ...props }: BoxProps, ref) => {
  const { t, LANG_KEY } = useTranslation();
  const { selectedActivity, clearActivity } = useActivity();
  const theme = useTheme();

  const handleChangeActivityClick = () => {
    clearActivity();
  };

  return (
    <Box
      onClick={handleChangeActivityClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        mt: "-20px",
        ...props.sx,
      }}
      ref={ref}
      {...props}
    >
      <Typography variant="h1" sx={{ color: theme.palette.neutral[900] }}>
        {selectedActivity
          ? selectedActivity.name[LANG_KEY]
          : t("identification.mobile.noActivity")}
      </Typography>
      <IconButton
        disableRipple={true}
        sx={{
          color: theme.palette.neutral[900],
          fontSize: 32,
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </IconButton>
    </Box>
  );
});

ActivitySwitcher.displayName = "ActivitySwitcher";
