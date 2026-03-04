'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { clientRoutes } from '@/mobile/feature-routing';
import { useCounter } from '@/shared/feature-counter/context/useCounter';

export default function CounterPage() {
  const { activeCounter } = useCounter();
  const router = useRouter();

  useEffect(() => {
    if (activeCounter) router.push(clientRoutes.activities(activeCounter.id));
  });

  return null;
}
