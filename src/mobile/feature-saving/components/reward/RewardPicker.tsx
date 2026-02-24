import { Reward } from '@/shared/lib/dataAccess';
import { CircularProgress } from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useRef,
  UIEvent,
  useEffect,
  useState,
} from 'react';
import { RewardCard } from '@/mobile/feature-saving';
import { ScrollableContainer } from '@/mobile/lib/ui';

type RewardPickerProps = {
  isInitialLoading: boolean;
  data: Reward[];
  fetchLimit: number;
  totalFetchedItems: number;
  onFetchNextPage: () => void;
  isFetchingNextPage: boolean;
  rewardRedemptionMutation: (rewardId: string) => void;
  totalItems: number;
};

export const RewardPicker = ({
  isInitialLoading,
  data,
  fetchLimit,
  totalFetchedItems,
  onFetchNextPage,
  isFetchingNextPage,
  rewardRedemptionMutation,
  totalItems,
}: RewardPickerProps) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasMoreItems = totalFetchedItems < totalItems;

  useEffect(() => {
    if (scrollRef.current && data.length > fetchLimit) {
      // Scroll one (new) item down
      scrollRef.current.scrollTo({
        top: scrollPosition + (data.length > 1 ? 165 : 0),
        behavior: 'smooth',
      });
    }
  }, [data, fetchLimit, scrollPosition]);

  useEffect(() => {
    // Ensure that we're showing the loading spinner when fetching
    if (isFetchingNextPage) {
      scrollRef.current?.scrollTo({
        top: scrollPosition + 100, // 100 -> doesn't have to be exact, it will bottom out anyway
        behavior: 'smooth',
      });
    }
  }, [isFetchingNextPage, scrollPosition]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const bottom =
      Math.trunc(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) <=
      e.currentTarget.clientHeight;

    if (!bottom || !hasMoreItems || isFetchingNextPage) return;

    onFetchNextPage();
    setScrollPosition(e.currentTarget.scrollTop);
    scrollRef.current?.scrollTo({
      top: e.currentTarget.scrollTop,
      behavior: 'smooth',
    });
  };

  if (isInitialLoading) {
    return <CircularProgress sx={{ m: 'auto auto' }} />;
  }

  if (totalItems && totalItems > 0) {
    return (
      <ScrollableContainer
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          mb: 1,
        }}
      >
        {data.map(
          (reward, index) =>
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
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: 'fade-in 0.6s ease-out forwards',
                  '@keyframes fade-in': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(20px)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              />
            ),
        )}

        {isFetchingNextPage && (
          <CircularProgress sx={{ m: 'auto auto' }} size={32} />
        )}
      </ScrollableContainer>
    );
  }

  return null;
};
