import { useContext, useEffect } from 'react';
import { CounterContext } from './CounterContext';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Organizer, useGetPermissions } from '@/shared/lib/dataAccess';
import { clientRoutes } from '@/mobile/feature-routing';

export const useCounter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ counter: string }>();
  const { data, isSuccess } = useGetPermissions({
    query: {
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    },
  });
  const allCounters = data?.data || [];

  const counter = params.counter
    ? allCounters.find((counter) => counter.organizer.id === params.counter)
        ?.organizer
    : null;

  const { lastCounterUsed, setLastCounterUsed } = useContext(CounterContext);

  const counterId = counter?.id;

  useEffect(() => {
    if (params.counter && !counterId && isSuccess) {
      router.push(clientRoutes.counters());
    }
  }, [counterId, params.counter, isSuccess, router]);

  return {
    activeCounter: counter,
    lastCounterUsed,
    setActiveCounter: (counter: Organizer) => {
      setLastCounterUsed(counter);
      router.push(clientRoutes.activities(counter.id));
    },
    clearCounter: () => {
      if (pathname === clientRoutes.counters()) return;
      if (counter) setLastCounterUsed(counter);
      router.push(clientRoutes.counters());
    },
  };
};
