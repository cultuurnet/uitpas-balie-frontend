import { SearchInput } from "@/mobile/lib/ui";
import { useCounter } from "@/shared/feature-counter/context/useCounter";
import { useGetRewards } from "@/shared/lib/dataAccess";
import { useTranslation } from "@/shared/lib/i18n/client";
import { Close } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
  useTheme,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

type BenefitsDrawerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  passHolderId?: string;
  passHolderName?: string;
  passHolderPoints: number;
  startPosition?: number;
  benefitExchangeMutation?: () => void;
};

export const BenefitsDrawer = ({
  isOpen,
  setIsOpen,
  passHolderId,
  passHolderName,
  passHolderPoints,
  startPosition,
  benefitExchangeMutation,
}: BenefitsDrawerProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { activeCounter } = useCounter();
  const [start, setStart] = useState<number>(0);

  const FETCH_LIMIT = 10;

  const {
    data,
    error,
    // fetchNextPage,
    // hasNextPage,
    isFetching,
    // isFetchingNextPage,
    status,
    isSuccess,
  } = useGetRewards({
    ...(activeCounter?.id && { organizerId: [activeCounter?.id] }),
    ...(passHolderId && { isRedeemableByPassholderId: passHolderId }),
    type: "ANY",
    limit: FETCH_LIMIT,
    start,
  });

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
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "20px",
        }}
      >
        <Typography
          variant="h1"
          sx={{ color: theme.palette.neutral[900], fontSize: "16px" }}
        >
          {passHolderName
            ? t("saving.mobile.benefit.drawer.title", { name: passHolderName })
            : t("saving.mobile.benefit.drawer.titleNoName")}
        </Typography>
        <IconButton
          disableRipple
          onClick={handleClose}
          sx={{ p: 0, transform: "scale(1.2)" }}
        >
          <Close />
        </IconButton>
      </Stack>
      <Typography
        variant="body2"
        sx={{ color: theme.palette.neutral[500], fontWeight: 500, mt: "-8px" }}
      >
        {t("saving.mobile.benefit.drawer.subtitle", {
          name: passHolderName,
          points: passHolderPoints,
        })}
      </Typography>
      {isSuccess && (
        /* data.data.totalItems && data.data.totalItems >= 5 && */ <SearchInput
          sx={{ my: "8px" }}
          inputProps={{
            sx: {
              "&::placeholder": {
                color: theme.palette.neutral[500],
                opacity: 1,
              },
            },
          }}
          placeholder={t("saving.mobile.benefit.drawer.searchPlaceholder")}
        />
      )}
      {/* Scrollable Stack */}
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
        {isFetching ? (
          <CircularProgress sx={{ m: "auto auto" }} />
        ) : (
          data?.data.member &&
          data.data.member.map((reward) => (
            <Typography key={reward.id} variant="body2">
              {reward.title}
            </Typography>
          ))
        )}
      </Stack>
    </SwipeableDrawer>
  );
};
