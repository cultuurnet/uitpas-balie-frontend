import {
  OrganizerPermissions,
  useGetPermissions,
} from '@/shared/lib/dataAccess';
import { CardSystem, Counter } from '@/store/counterStore';

export const useGetCounters = (lastCounterUsed: Counter, searchString = '') => {
  const { data: allData, isSuccess, isLoading } = useGetPermissions();

  const permissions = Array.isArray(allData?.data) ? allData.data : [];

  const dataWithoutLastCounter = permissions.filter(
    (permission: OrganizerPermissions) =>
      permission.organizer.id !== lastCounterUsed?.id,
  );

  const filteredData = searchString
    ? dataWithoutLastCounter.filter((permission: OrganizerPermissions) => {
        const term = searchString.toLowerCase();
        const matchesName = permission.organizer.name
          ?.toLowerCase()
          .includes(term);
        // TODO: remove cast once Orval regenerates Organizer with cardSystems
        const matchesRegion = (
          permission.organizer as { cardSystems?: CardSystem[] }
        ).cardSystems?.some((cs) => cs.name.toLowerCase().includes(term));
        return matchesName || matchesRegion;
      })
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
