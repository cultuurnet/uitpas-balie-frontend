import { useGetPermissions } from '@/shared/lib/dataAccess';
import { Counter } from '@/shared/feature-counter/context/CounterContext';

export const useGetCounters = (lastCounterUsed: Counter, searchString = '') => {
  const { data: allData, isSuccess, isLoading } = useGetPermissions();

  const permissions = Array.isArray(allData?.data) ? allData.data : [];

  const dataWithoutLastCounter = permissions.filter(
    (permission) => permission.organizer.id !== lastCounterUsed?.id,
  );

  const filteredData = searchString
    ? dataWithoutLastCounter.filter((organizer) =>
        organizer.organizer.name
          ?.toLowerCase()
          .includes(searchString.toLowerCase()),
      )
    : dataWithoutLastCounter;

  const sortedData = filteredData.toSorted((a, b) =>
    a.organizer.name!.localeCompare(b.organizer.name!),
  );

  return {
    allData,
    data: sortedData,
    isLoading,
    isSuccess,
  };
};
