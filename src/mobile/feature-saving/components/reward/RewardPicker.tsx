import { Reward, RewardsPaginatedResponse } from "@/shared/lib/dataAccess";
import { CircularProgress } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useRef,
  UIEvent,
  useState,
  useEffect,
} from "react";
import { RewardCard } from "@/mobile/feature-saving";
import { ScrollableContainer } from "@/mobile/lib/ui";

type RewardPickerProps = {
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
  rewardRedemptionMutation: (rewardId: string) => void;
};

export const RewardPicker = ({
  isInitialLoading,
  data,
  fetchLimit,
  totalFetchedItems,
  setOffset,
  scrollPosition,
  setScrollPosition,
  isFetching,
  rewardRedemptionMutation,
}: RewardPickerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(false);

  useEffect(() => {
    if (scrollRef.current && data.member.size > fetchLimit) {
      // Scroll one (new) item down
      scrollRef.current.scrollTo({
        top: scrollPosition + (data.member.size > 1 ? 165 : 0),
        behavior: "smooth",
      });
    }
  }, [data.member]);

  useEffect(() => {
    if (totalFetchedItems === 0) return;
    setHasMoreItems(totalFetchedItems > data.member.size);
  }, [data.member.size, totalFetchedItems]);

  useEffect(() => {
    // Ensure that we're showing the loading spinner when fetching
    if (isFetching) {
      scrollRef.current?.scrollTo({
        top: scrollPosition + 100, // 100 -> doesn't have to be exact, it will bottom out anyway
        behavior: "smooth",
      });
    }
  }, [isFetching]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const bottom =
      Math.trunc(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) <=
      e.currentTarget.clientHeight;

    if (!bottom || !hasMoreItems) return;

    setOffset((prev) => prev + fetchLimit);
    setScrollPosition(e.currentTarget.scrollTop);
    scrollRef.current?.scrollTo({
      top: e.currentTarget.scrollTop,
      behavior: "smooth",
    });
  };

  if (isInitialLoading) {
    return <CircularProgress sx={{ m: "auto auto" }} />;
  }

  if (data.totalItems && data.totalItems > 0) {
    return (
      <ScrollableContainer
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          mb: 1,
        }}
      >
        {Array.from(data.member).map(
          (reward) =>
            reward.id && (
              <RewardCard
                key={reward.id}
                rewardId={reward.id}
                rewardTitle={reward.title}
                rewardCost={reward.points}
                rewardType={reward.type}
                online={reward.online}
                rewardExchangeMutation={rewardRedemptionMutation}
                sx={{
                  ...(reward.isNew && {
                    opacity: 0,
                    transform: "translateY(20px)",
                    animation: "fade-in 0.3s ease-out forwards",
                    "@keyframes fade-in": {
                      "0%": {
                        opacity: 0,
                        transform: "translateY(20px)",
                      },
                      "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                  }),
                }}
              />
            )
        )}

        {isFetching && <CircularProgress sx={{ m: "auto auto" }} size={20} />}
      </ScrollableContainer>
    );
  }

  return null;
};
