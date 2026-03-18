'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useOrganizer } from '@/hooks/useOrganizer';
import { useActivity } from '@/mobile/feature-activities/useActivity';
import { clientRoutes } from '@/mobile/feature-routing';
import { getIdFromUrl } from '@/shared/lib/utils';

export default function ActivityPage() {
  const { activeOrganizer } = useOrganizer();
  const { selectedActivity } = useActivity();
  const router = useRouter();
  const selectedActivityId = selectedActivity?.['@id'];

  useEffect(() => {
    if (activeOrganizer && selectedActivityId)
      router.push(
        clientRoutes.identification(
          activeOrganizer.id,
          getIdFromUrl(selectedActivityId),
        ),
      );
  });

  return null;
}
