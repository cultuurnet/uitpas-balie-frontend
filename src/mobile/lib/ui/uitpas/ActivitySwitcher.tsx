"use client";

import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import { useTranslation } from "@/shared/lib/utils/hooks/useTranslation";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export const ActivitySwitcher = () => {
  const { t, LANG_KEY } = useTranslation();
  const { selectedActivity, setSelectedActivity } = useActivity();
  const router = useRouter();
  const theme = useTheme();

  const handleChangeActivityClick = () => {
    setSelectedActivity(null);
    router.push("/mobile/activities");
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
      }}
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
};
