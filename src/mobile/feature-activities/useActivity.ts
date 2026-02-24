import { useParams, useRouter } from 'next/navigation';
import { Search, useGetEvents } from '@/shared/lib/dataAccess';
import { clientRoutes } from '@/mobile/feature-routing';
import { getIdFromUrl } from '@/shared/lib/utils';
import { useEffect } from 'react';
import { getEventParams } from '@/shared/feature-events/getEventParams';

export const noActivity = '-';
export type NoActivity = typeof noActivity;

function isNoActivity(activity: unknown | NoActivity): activity is NoActivity {
  return activity === '-';
}

export const useActivity = () => {
  const router = useRouter();
  const params = useParams<{ counter: string; activity: string }>();

  const { data, isSuccess } = useGetEvents({
    ...getEventParams(),
    id: params.activity,
  });

  const idIsActivityId = params.activity && !isNoActivity(params.activity);

  const selectedActivity = idIsActivityId
    ? data
      ? data.data.member.find(
          (activity) => getIdFromUrl(activity['@id'] ?? '') === params.activity,
        )
      : null
    : undefined;

  const selectedActivityId = selectedActivity?.['@id'];

  useEffect(() => {
    if (idIsActivityId && !selectedActivityId && isSuccess) {
      router.push(clientRoutes.activities(params.counter));
    }
  }, [selectedActivityId, params.counter, router, isSuccess, idIsActivityId]);

  return {
    selectedActivity,
    setSelectedActivity: (activity?: Search.EventAllOf | null | NoActivity) => {
      if (!isNoActivity(activity) && !activity?.['@id']) return;

      router.push(
        clientRoutes.identification(
          params.counter,
          isNoActivity(activity)
            ? noActivity
            : getIdFromUrl(activity['@id'] ?? ''),
        ),
      );
    },
    clearActivity: () => {
      router.push(clientRoutes.activities(params.counter));
    },
    navigateToIdentification: (
      navigationType: 'replace' | 'push' = 'replace',
    ) => {
      router[navigationType](
        clientRoutes.identification(params.counter, params.activity),
      );
    },
    navigateToScanner: (
      navigationType: 'replace' | 'push' = 'replace',
      firstCardEntry = true,
    ) => {
      router[navigationType](
        clientRoutes.scan(params.counter, params.activity, firstCardEntry),
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
          params.counter,
          params.activity,
          code,
          cardType,
          firstCardEntry,
        ),
      );
    },
  };
};
