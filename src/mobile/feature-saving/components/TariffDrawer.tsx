import { useEventGet } from "@/lib/dataAccess/entry/generated/events/events";
import { useTranslation } from "@/shared/lib/i18n/client";
import { getUuid } from "@/shared/lib/utils";
import {
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";
import { OutlinedButton } from "@/mobile/lib/ui";
import { Tariff } from "@/mobile/feature-saving";

type TariffModalProps = {
  name?: string;
  eventId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  startPosition?: number;
  uitpasNumber: string;
  ticketSaleMutation: (tariffId: string, regularPrice: number) => void;
};

export const TariffDrawer = ({
  name,
  eventId,
  isOpen,
  setIsOpen,
  startPosition,
  uitpasNumber,
  ticketSaleMutation,
}: TariffModalProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data } = useEventGet(getUuid(eventId) ?? "");

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <SwipeableDrawer
      open={isOpen}
      onOpen={() => null}
      onClose={handleClose}
      anchor="bottom"
      sx={{
        "& .MuiDrawer-paper": {
          ...(startPosition && {
            height: `calc(100% - ${startPosition + 10}px)`,
          }),
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          padding: "16px",
        },
      }}
    >
      {/*Title & close button*/}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "20px",
        }}
      >
        <Typography variant="h1" sx={{ color: theme.palette.neutral[900] }}>
          {name
            ? t("saving.mobile.tariff.drawer.title", { name })
            : t("saving.mobile.tariff.drawer.titleNoName")}
        </Typography>
        <IconButton
          disableRipple
          onClick={handleClose}
          sx={{ p: 0, transform: "scale(1.2)" }}
        >
          <Close />
        </IconButton>
      </Stack>
      {/*  Scrollable stack */}
      <Stack
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          height: "100%",
          rowGap: "20px",
          overflowY: "auto",
          pr: "6px",
          "::-webkit-scrollbar": {
            width: "6px",
            color: theme.palette.primary.main,
          },
          "::-webkit-scrollbar-track-piece": {
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            background: theme.palette.primary.main,
            borderRadius: "10px",
          },
          msOverflowStyle: "none",
        })}
      >
        {data?.data.priceInfo && (
          <Tariff
            eventId={eventId}
            uitpasNumber={uitpasNumber}
            priceInfo={data?.data.priceInfo}
            ticketSaleMutation={ticketSaleMutation}
            onDrawerClose={handleClose}
          />
        )}
      </Stack>

      <OutlinedButton
        sx={{
          mt: "20px",
          border: `1px solid ${theme.palette.brand.darkCyan}`,
          color: theme.palette.brand.darkCyan,
          borderRadius: "6px",
        }}
        onClick={handleClose}
      >
        {t("saving.mobile.tariff.drawer.close")}
      </OutlinedButton>
    </SwipeableDrawer>
  );
};
