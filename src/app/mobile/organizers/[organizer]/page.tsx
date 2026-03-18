'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useOrganizer } from '@/hooks/useOrganizer';
import { clientRoutes } from '@/mobile/feature-routing';

export default function OrganizerPage() {
  const { activeOrganizer } = useOrganizer();
  const router = useRouter();

  useEffect(() => {
    if (activeOrganizer)
      router.push(clientRoutes.activities(activeOrganizer.id));
  });

  return null;
}
