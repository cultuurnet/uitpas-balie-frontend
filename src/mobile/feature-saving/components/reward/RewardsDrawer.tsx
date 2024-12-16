import { OutlinedButton, SearchInput } from "@/mobile/lib/ui";
import { useCounter } from "@/mobile/feature-counter/context/useCounter";
import { Reward, useGetRewardsInfinite } from "@/shared/lib/dataAccess";
import { useTranslation } from "@/shared/lib/i18n/client";
import { Close } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
  debounce,
  useTheme,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { RewardPicker } from "./RewardPicker";

type RewardsDrawerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  passHolderId?: string;
  passHolderName?: string;
  passHolderPoints: number;
  startPosition?: number;
  rewardRedemptionMutation: (rewardId: string) => void;
};

const FETCH_LIMIT = 10;

export const RewardsDrawer = ({
  isOpen,
  setIsOpen,
  passHolderId,
  passHolderName,
  passHolderPoints,
  startPosition,
  rewardRedemptionMutation,
}: RewardsDrawerProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { activeCounter } = useCounter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: fetchedData,
    status,
    isFetching,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useGetRewardsInfinite(
    {
      ...(activeCounter?.id && { organizerId: [activeCounter?.id] }),
      ...(passHolderId && { isRedeemableByPassholderId: passHolderId }),
      ...(searchQuery && { text: searchQuery }),
      type: "ANY",
      limit: FETCH_LIMIT,
    },
    {
      query: {
        enabled: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
          return (lastPage.config.params["start"] || 0) + FETCH_LIMIT;
        },
      },
      axios: {
        paramsSerializer: { indexes: null },
      },
    }
  );

  const isInitialLoading = status === "pending";

  const data: Reward[] =
    fetchedData?.pages.reduce((prev: Reward[], group) => {
      return [...prev, ...((group.data.member as Reward[]) || [])];
    }, []) || [];

  const totalItems = fetchedData?.pages[0]?.data.totalItems;

  const noRewards = !searchQuery && !isFetching && totalItems === 0;
  const showSearchInput =
    (typeof totalItems === "number" && totalItems >= 5) || Boolean(searchQuery);

  // Fetch rewards when the drawer opens
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  // Fetch rewards when the searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRewardRedemption = (rewardId: string) => {
    rewardRedemptionMutation(rewardId);
    handleClose();
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
            ? t("saving.mobile.reward.drawer.title", { name: passHolderName })
            : t("saving.mobile.reward.drawer.titleNoName")}
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
        {noRewards
          ? t("saving.mobile.reward.drawer.subtitleNoRewards", {
              name: passHolderName,
              points: passHolderPoints,
            })
          : t("saving.mobile.reward.drawer.subtitle", {
              name: passHolderName,
              points: passHolderPoints,
            })}
      </Typography>

      {showSearchInput && (
        <SearchInput
          sx={{ my: "8px" }}
          inputProps={{
            sx: {
              "&::placeholder": {
                color: theme.palette.neutral[500],
                opacity: 1,
              },
            },
          }}
          placeholder={t("saving.mobile.reward.drawer.searchPlaceholder")}
          onChange={debounce(handleSearchInputChange, 500)}
        />
      )}

      <RewardPicker
        data={data}
        isInitialLoading={isInitialLoading}
        fetchLimit={FETCH_LIMIT}
        totalFetchedItems={data.length}
        totalItems={totalItems ?? 0}
        onFetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        rewardRedemptionMutation={handleRewardRedemption}
      />

      <OutlinedButton
        sx={{
          mt: "auto",
          border: `1px solid ${theme.palette.brand.darkCyan}`,
          color: theme.palette.brand.darkCyan,
          borderRadius: "6px",
        }}
        onClick={handleClose}
      >
        {t("saving.mobile.reward.drawer.close")}
      </OutlinedButton>
    </SwipeableDrawer>
  );
};
