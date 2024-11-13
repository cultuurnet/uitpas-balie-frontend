"use client";

import { useCounter } from "@/shared/feature-counter/context/useCounter";
import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import uitpasLogo from "public/images/svg/logo-uitpas.svg";
import Image from "next/image";
import { ExitToApp, Settings } from "@mui/icons-material";
import Link from "next/link";
import { useLogout } from "@/shared/lib/auth";
import { useTranslation } from "@/shared/lib/utils/hooks/useTranslation";
import { NavBarIcon } from "./components/NavBarIcon";
import { NavBarTypography } from "./components/NavBarTypography";
import { NavBarItemContainer } from "./components/NavBarItemContainer";

export const MobileNavBar = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const { setLastCounterUsed, setActiveCounter, activeCounter } = useCounter();
  const logout = useLogout();

  const handleCurrentCounterClick = () => {
    setLastCounterUsed(activeCounter);
    setActiveCounter(null);
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          height: "46px",
          width: "100%",
          backgroundColor: theme.palette.navigation.primary,
          alignItems: "center",
          boxShadow: "0px 6px 9px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        })}
      >
        <Image
          src={uitpasLogo}
          alt="uitpas logo"
          width={102}
          height={25}
          style={{ marginLeft: "12px" }}
          priority={true}
        />
        {activeCounter ? (
          <NavBarItemContainer
            component={Link}
            href="/mobile/counters"
            onClick={handleCurrentCounterClick}
          >
            <NavBarTypography>{activeCounter.name}</NavBarTypography>
            <NavBarIcon icon={Settings} />
          </NavBarItemContainer>
        ) : (
          <NavBarItemContainer
            onClick={logout}
            sx={{ columnGap: "4px", mr: "10px" }}
          >
            <NavBarTypography>{t("counter.mobile.logoutBtn")}</NavBarTypography>
            <NavBarIcon icon={ExitToApp} />
          </NavBarItemContainer>
        )}
      </Box>
      {children}
    </>
  );
};
