import { useTranslation } from "@/shared/lib/i18n/client";
import { Box } from "@mui/material";
import { Link, Typography } from "@/mobile/lib/ui";
import { useMemo } from "react";
import uitpasHeart from "public/images/png/uitpas_heart.png";
import Image from "next/image";
import { PermissionDeniedInstructions } from "./PermissionDeniedInstructions";

type PermissionBoxProps = {
  permission: PermissionState | "unknown" | "not_supported";
};

export const PermissionBox = ({ permission }: PermissionBoxProps) => {
  const { t } = useTranslation();

  const messageKey = useMemo(() => {
    if (permission === "prompt" || permission === "unknown") {
      return "identification.mobile.scan.askForCameraPermission";
    }
    if (permission === "denied") {
      return "identification.mobile.scan.permissionDenied.title";
    }
    return "identification.mobile.scan.notSupported";
  }, [permission]);

  const showBackLink =
    permission === "denied" || permission === "not_supported";

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: theme.palette.neutral[0],
        padding: "40px 16px",
        alignItems: "center",
        rowGap: "24px",
        overflowY: "auto",
      })}
    >
      <Typography variant="h1">{t(messageKey)}</Typography>

      {permission === "denied" && <PermissionDeniedInstructions />}
      <Image
        src={uitpasHeart}
        alt="uitpas heart"
        style={{
          maxHeight: "40vh",
          width: "auto",
        }}
        priority={true}
      />
      {showBackLink && (
        <Link href={"/mobile/identification"} color="primary">
          {t("identification.mobile.scan.back")}
        </Link>
      )}
    </Box>
  );
};
