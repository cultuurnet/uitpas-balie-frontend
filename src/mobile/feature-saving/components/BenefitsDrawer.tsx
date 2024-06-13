import { OutlinedButton, SearchInput } from "@/mobile/lib/ui";
import { useCounter } from "@/shared/feature-counter/context/useCounter";
import {
  Reward,
  RewardsPaginatedResponse,
  useGetRewards,
} from "@/shared/lib/dataAccess";
import { useTranslation } from "@/shared/lib/i18n/client";
import { Close } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
  useTheme,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BenefitsPicker } from "./BenefitsPicker";

type BenefitsDrawerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  passHolderId?: string;
  passHolderName?: string;
  passHolderPoints: number;
  startPosition?: number;
  benefitExchangeMutation?: () => void;
};

type ExtendedReward = Reward & { isNew: boolean };

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
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [showSearchInput, setShowSearchInput] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const FETCH_LIMIT = 10;
  const INITIAL_DATA = {
    facet: undefined,
    member: new Set<ExtendedReward>(),
    memberIndex: new Map<string, ExtendedReward>(),
    totalItems: 0,
  };
  const [data, setData] = useState<
    Omit<RewardsPaginatedResponse, "member"> & {
      member: Set<ExtendedReward>;
      memberIndex: Map<string, ExtendedReward>;
    }
  >(INITIAL_DATA);

  const {
    data: fetchedData,
    isSuccess,
    isFetching,
  } = useGetRewards({
    ...(activeCounter?.id && { organizerId: [activeCounter?.id] }),
    ...(passHolderId && { isRedeemableByPassholderId: passHolderId }),
    type: "ANY",
    limit: FETCH_LIMIT,
    start: offset,
  });

  useEffect(() => {
    if (isSuccess) {
      setData((prev) => {
        const updatedMembers = new Set<ExtendedReward>(
          [...prev.member].map((member) => ({ ...member, isNew: false }))
        );
        const updatedIndex = new Map<string, ExtendedReward>(prev.memberIndex);

        fetchedData.data.member?.forEach((member) => {
          const existingMember = prev.memberIndex.get(member.id!);
          if (existingMember) {
            Object.assign(existingMember, member);
          } else {
            const newMember: ExtendedReward = {
              ...member,
              isNew: prev.member.size === 0,
            };
            updatedMembers.add(newMember);
            updatedIndex.set(member.id!, newMember);
          }
        });

        return {
          ...fetchedData.data,
          member: updatedMembers,
          memberIndex: updatedIndex,
        };
      });

      setIsInitialLoading(false);

      if (showSearchInput === null && fetchedData.data.totalItems) {
        setShowSearchInput(fetchedData.data.totalItems > 5 || !!searchQuery);
      }
    }
  }, [fetchedData?.data]);

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
        {data.totalItems === 0
          ? t("saving.mobile.benefit.drawer.subtitleNoBenefits", {
              name: passHolderName,
              points: passHolderPoints,
            })
          : t("saving.mobile.benefit.drawer.subtitle", {
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
          placeholder={t("saving.mobile.benefit.drawer.searchPlaceholder")}
        />
      )}

      <BenefitsPicker
        data={data}
        isInitialLoading={isInitialLoading}
        fetchLimit={FETCH_LIMIT}
        totalFetchedItems={fetchedData?.data.totalItems ?? 0}
        setOffset={setOffset}
        isFetching={isFetching}
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
        {t("saving.mobile.benefit.drawer.close")}
      </OutlinedButton>
    </SwipeableDrawer>
  );
};
