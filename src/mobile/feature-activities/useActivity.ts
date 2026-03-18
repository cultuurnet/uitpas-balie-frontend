import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { clientRoutes } from '@/mobile/feature-routing';
import { getEventParams } from '@/shared/feature-events/getEventParams';
import { Search, useGetEvents } from '@/shared/lib/dataAccess';
import { getIdFromUrl } from '@/shared/lib/utils';

const noActivity = '-';
type NoActivity = typeof noActivity;

function isNoActivity(activity: unknown | NoActivity): activity is NoActivity {
  return activity === '-';
}

const useActivity = () => {
  const router = useRouter();
  const params = useParams<{ organizer: string; activity: string }>();

  const { data, isSuccess } = useGetEvents({
    ...getEventParams(),
    id: params.activity,
  });

  const idIsActivityId = params.activity && !isNoActivity(params.activity);

  const selectedActivity = idIsActivityId
    ? data
      ? (data.data as Search.GetEvents200 | undefined)?.member?.find(
          (activity: Search.EventAllOf) =>
            getIdFromUrl(activity['@id'] ?? '') === params.activity,
        )
      : null
    : undefined;

  const selectedActivityId = selectedActivity?.['@id'];

  useEffect(() => {
    if (idIsActivityId && !selectedActivityId && isSuccess) {
      router.push(clientRoutes.activities(params.organizer));
    }
  }, [selectedActivityId, params.organizer, router, isSuccess, idIsActivityId]);

  return {
    selectedActivity,
    setSelectedActivity: (activity?: Search.EventAllOf | null | NoActivity) => {
      if (!isNoActivity(activity) && !activity?.['@id']) return;

      router.push(
        clientRoutes.identification(
          params.organizer,
          isNoActivity(activity)
            ? noActivity
            : getIdFromUrl(activity['@id'] ?? ''),
        ),
      );
    },
    clearActivity: () => {
      router.push(clientRoutes.activities(params.organizer));
    },
    navigateToIdentification: (
      navigationType: 'replace' | 'push' = 'replace',
    ) => {
      router[navigationType](
        clientRoutes.identification(params.organizer, params.activity),
      );
    },
    navigateToScanner: (
      navigationType: 'replace' | 'push' = 'replace',
      firstCardEntry = true,
    ) => {
      router[navigationType](
        clientRoutes.scan(params.organizer, params.activity, firstCardEntry),
      );
    },
    navigateToSaving: (
      code: string,
      firstCardEntry = true,
      cardType: 'insz' | 'uitpas' = 'uitpas',
      navigationType: 'replace' | 'push' = 'replace',
    ) => {
      router[navigationType](
        clientRoutes.saving(
          params.organizer,
          params.activity,
          code,
          cardType,
          firstCardEntry,
        ),
      );
    },
  };
};

export type { NoActivity };
export { noActivity, useActivity };
