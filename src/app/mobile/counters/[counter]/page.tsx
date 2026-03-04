'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useCounter } from '@/hooks/useCounter';
import { clientRoutes } from '@/mobile/feature-routing';

export default function CounterPage() {
  const { activeCounter } = useCounter();
  const router = useRouter();

  useEffect(() => {
    if (activeCounter) router.push(clientRoutes.activities(activeCounter.id));
  });

  return null;
}
