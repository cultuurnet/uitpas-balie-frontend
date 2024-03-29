import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Typography, Button } from "@/lib/ui";
import { useLogout } from "@/lib/auth";
import { useCounter } from "@/feature-counter";
import {
  HamburgerButton,
  Header,
  LogoIconButtonStack,
  LogoLink,
  NavBarContentStack,
  NavBarStack,
  NavLink,
  UserStack,
} from "./Navbar.styles";
import { CounterMenu } from "./CounterMenu";
import { getAssetUrl } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Organizer, UserInfo } from "@/lib/dataAccess";

type NavbarProps = {
  userInfo: UserInfo;
  counter: Organizer;
};

export const Navbar = ({ userInfo, counter }: NavbarProps) => {
  const { t } = useTranslation();
  const { setActiveCounter, setLastCounterUsed } = useCounter();
  const logout = useLogout();
  const [open, setOpen] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(
    window.matchMedia("(max-width: 768px)").matches
  );

  const handleWindowResize = useCallback(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  if (!userInfo || !counter) return null;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Header sx={{ zIndex: 1 }}>
      <NavBarStack
        sx={{
          pt: mobile ? 1.4 : 0,
          pb: mobile ? (open ? 0 : 1.4) : 0,
        }}
      >
        <LogoIconButtonStack>
          <LogoLink href="/">
            <Image
              src={getAssetUrl(`images/svg/logo-uitpas.svg`)}
              width="90"
              height="25"
              alt="Logo UiTPAS"
            />
          </LogoLink>
          {mobile && (
            <HamburgerButton
              sx={(theme) => ({
                backgroundColor: open
                  ? theme.palette.text.primary
                  : "transparent",
              })}
              onClick={handleToggle}
              variant="solid"
              size="sm"
            >
              <FontAwesomeIcon icon={faBars} size="xl" />
            </HamburgerButton>
          )}
        </LogoIconButtonStack>
        {(open || !mobile) && (
          <>
            <NavBarContentStack>
              <CounterMenu
                name={counter.name}
                isMobile={mobile}
                setOpen={setOpen}
              />
              <NavLink
                href="/counters"
                onClick={(e) => {
                  e.preventDefault();
                  setLastCounterUsed(counter);
                  setActiveCounter(null);
                }}
              >
                {t("counter.changeCounter")}
              </NavLink>
            </NavBarContentStack>
            <UserStack>
              <Typography
                level="body2"
                sx={(theme) => ({
                  color: theme.vars.palette.neutral[200],
                  width: "max-content",
                })}
              >
                {t("login.loggedInAs", { name: userInfo.given_name })}
              </Typography>
              <Button
                variant="outlined"
                color="neutral"
                size="sm"
                sx={{
                  ml: "10px",
                  fontSize: "13px",
                  width: "100px",
                }}
                onClick={logout}
              >
                {t("login.logoutBtn")}
              </Button>
            </UserStack>
          </>
        )}
      </NavBarStack>
    </Header>
  );
};
