import { useParams, useRouter } from "next/navigation";
import { Search, useGetEvents } from "@/shared/lib/dataAccess";
import { clientRoutes } from "@/mobile/feature-routing";
import { getIdFromUrl } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { getEventParams } from "@/shared/feature-events/getEventParams";

export const noActivity = "-";
export type NoActivity = typeof noActivity;

function isNoActivity(activity: unknown | NoActivity): activity is NoActivity {
  return activity === "-";
}

export const useActivity = () => {
  const router = useRouter();
  const params = useParams<{ counter: string; activity: string }>();
  const idIsActivityId = params.activity && !isNoActivity(params.activity);

  const [cachedActivity, setCachedActivity] = useState<
    Search.EventAllOf | null | undefined
  >(undefined);

  const { data, isSuccess } = useGetEvents(
    {
      ...getEventParams(),
      id: params.activity,
    },
    {
      query: {
        enabled: Boolean(idIsActivityId),
        staleTime: 60 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    }
  );

  const foundActivity = idIsActivityId
    ? data
      ? data.data.member.find(
          (activity) => getIdFromUrl(activity["@id"] ?? "") === params.activity
        )
      : null
    : undefined;

  useEffect(() => {
    if (foundActivity) {
      setCachedActivity(foundActivity);
    }
  }, [foundActivity]);

  const selectedActivity =
    foundActivity || (foundActivity === null ? cachedActivity : undefined);

  const selectedActivityId = selectedActivity?.["@id"];

  useEffect(() => {
    if (idIsActivityId && !selectedActivityId && isSuccess) {
      router.push(clientRoutes.activities(params.counter));
    }
  }, [selectedActivityId, params.counter, router, isSuccess, idIsActivityId]);

  return {
    selectedActivityId: params.activity,
    selectedActivity,
    setSelectedActivity: (activity?: Search.EventAllOf | null | NoActivity) => {
      if (!isNoActivity(activity) && !activity?.["@id"]) return;

      router.push(
        clientRoutes.identification(
          params.counter,
          isNoActivity(activity)
            ? noActivity
            : getIdFromUrl(activity["@id"] ?? "")
        )
      );
    },
    clearActivity: () => {
      router.push(clientRoutes.activities(params.counter));
    },
    navigateToIdentification: (
      navigationType: "replace" | "push" = "replace"
    ) => {
      router[navigationType](
        clientRoutes.identification(params.counter, params.activity)
      );
    },
    navigateToScanner: (
      navigationType: "replace" | "push" = "replace",
      firstCardEntry = true
    ) => {
      router[navigationType](
        clientRoutes.scan(params.counter, params.activity, firstCardEntry)
      );
    },
    navigateToSaving: (
      code: string,
      firstCardEntry = true,
      cardType: "insz" | "uitpas" = "uitpas",
      navigationType: "replace" | "push" = "replace"
    ) => {
      router[navigationType](
        clientRoutes.saving(
          params.counter,
          params.activity,
          code,
          cardType,
          firstCardEntry
        )
      );
    },
  };
};
