import { CircularProgress, Stack } from "@mui/material";
import { Search } from "@/shared/lib/dataAccess";
import { OutlinedButton } from "@/mobile/lib/ui/uitpas/OutlinedButton";
import {
  Dispatch,
  SetStateAction,
  UIEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ScrollableContainer, Typography } from "@/mobile/lib/ui";
import { useSearchQuery } from "@/shared/lib/utils/hooks/useSearchQuery";
import { useActivity } from "@/mobile/feature-activities/useActivity";
import { useTranslation } from "@/shared/lib/utils/hooks/useTranslation";

type ActivitiesPickerProps = {
  isInitialLoading: boolean;
  data: Omit<Search.GetEvents200, "member"> & {
    member: Set<Search.Event & { isNew: boolean }>;
  };
  fetchLimit: number;
  totalFetchedItems: number;
  setOffset: Dispatch<SetStateAction<number>>;
  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
  isFetching: boolean;
};

export const ActivitiesPicker = ({
  isInitialLoading,
  data,
  fetchLimit,
  totalFetchedItems,
  setOffset,
  scrollPosition,
  setScrollPosition,
  isFetching,
}: ActivitiesPickerProps) => {
  const { t, LANG_KEY } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { searchQuery } = useSearchQuery();
  const { setSelectedActivity } = useActivity();
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(false);

  useEffect(() => {
    if (scrollRef.current && data.member.size > fetchLimit) {
      // Scroll one (new) item down
      scrollRef.current.scrollTo({
        top: scrollPosition + (data.member.size > 7 ? 56 : 0),
        behavior: "smooth",
      });
    }
  }, [data.member]);

  useEffect(() => {
    if (totalFetchedItems === 0) return;
    setHasMoreItems(totalFetchedItems > data.member.size);
  }, [data.member.size, totalFetchedItems]);

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

  useEffect(() => {
    // Ensure that we're showing the loading spinner when fetching
    if (isFetching) {
      scrollRef.current?.scrollTo({
        top: scrollPosition + 100, // 100 -> doesn't have to be exact, it will bottom out anyway
        behavior: "smooth",
      });
    }
  }, [isFetching]);

  const handleActivityClick = (activity: Search.Event) =>
    setSelectedActivity(activity);

  if (isInitialLoading) {
    return <CircularProgress sx={{ m: "auto auto" }} />;
  }

  if (data.totalItems > 0) {
    return (
      <Stack>
        <ScrollableContainer
          sx={{ height: "410px" }}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {Array.from(data.member).map((activity) => (
            <OutlinedButton
              onClick={() => handleActivityClick(activity)}
              key={activity["@id"]}
              sx={{
                ...(activity.isNew && {
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
            >
              {activity.name[LANG_KEY]}
            </OutlinedButton>
          ))}

          {isFetching && <CircularProgress sx={{ m: "auto auto" }} size={20} />}
        </ScrollableContainer>
      </Stack>
    );
  }

  return (
    <Typography variant="body1">
      {searchQuery
        ? t("activities.mobile.noActivitiesSearch", {
            searchTerm: searchQuery,
          })
        : t("activities.mobile.noActivities")}
    </Typography>
  );
};
