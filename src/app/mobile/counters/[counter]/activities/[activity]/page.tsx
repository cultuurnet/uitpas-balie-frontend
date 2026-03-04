'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useCounter } from '@/hooks/useCounter';
import { useActivity } from '@/mobile/feature-activities/useActivity';
import { clientRoutes } from '@/mobile/feature-routing';
import { getIdFromUrl } from '@/shared/lib/utils';

export default function ActivityPage() {
  const { activeCounter } = useCounter();
  const { selectedActivity } = useActivity();
  const router = useRouter();
  const selectedActivityId = selectedActivity?.['@id'];

  useEffect(() => {
    if (activeCounter && selectedActivityId)
      router.push(
        clientRoutes.identification(
          activeCounter.id,
          getIdFromUrl(selectedActivityId),
        ),
      );
  });

  return null;
}
