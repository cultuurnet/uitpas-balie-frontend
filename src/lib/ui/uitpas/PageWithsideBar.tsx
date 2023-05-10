import { useTranslation } from "next-i18next";
import { Grid, Stack, Link } from "@/lib/ui";
import { Divider, styled } from "@mui/joy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren, ReactNode } from "react";

const SideBarContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.vars.palette.neutral[200],
}));

type Props = PropsWithChildren & {
  hasBackButton?: boolean;
  sideBarContent: ReactNode;
};

export const PageWithSidebar = ({
  children,
  hasBackButton,
  sideBarContent,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Grid container sx={{ height: "100%", marginTop: "64px" }}>
      <SideBarContainer xs={12} sm={5} md={4} lg={3}>
        <Stack spacing={2}>
          <>
            <Link href={"/"}>
              <FontAwesomeIcon icon={faArrowLeft} /> {t("Terug")}
            </Link>
            <Divider />
          </>
          {sideBarContent}
        </Stack>
      </SideBarContainer>
      <Grid xs={12} sm={7} md={8} lg={9}>
        {children}
      </Grid>
    </Grid>
  );
};
