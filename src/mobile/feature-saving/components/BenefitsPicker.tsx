import { ScrollableActivitesContainer } from "@/mobile/feature-activities/components/ActivitiesPage.styles";
import { Reward, RewardsPaginatedResponse } from "@/shared/lib/dataAccess";
import { useTranslation } from "@/shared/lib/utils";
import { CircularProgress } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { BenefitCard } from "@/mobile/feature-saving";

type BenefitsPickerProps = {
  isInitialLoading: boolean;
  data: Omit<RewardsPaginatedResponse, "member"> & {
    member: Set<Reward & { isNew: boolean }>;
  };
  fetchLimit: number;
  totalFetchedItems: number;
  setOffset: Dispatch<SetStateAction<number>>;
  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
  isFetching: boolean;
};

export const BenefitsPicker = ({
  isInitialLoading,
  data,
  fetchLimit,
  totalFetchedItems,
  setOffset,
  scrollPosition,
  setScrollPosition,
  isFetching,
}: BenefitsPickerProps) => {
  const { t, LANG_KEY } = useTranslation();

  if (isInitialLoading) {
    return <CircularProgress sx={{ m: "auto auto" }} />;
  }

  if (data.totalItems && data.totalItems > 0) {
    return (
      <ScrollableActivitesContainer>
        {Array.from(data.member).map((reward) => (
          <BenefitCard key={reward.id} />
        ))}
      </ScrollableActivitesContainer>
    );
  }

  return null;
};
