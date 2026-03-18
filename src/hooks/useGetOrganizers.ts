import {
  Organizer,
  OrganizerPermissions,
  useGetPermissions,
} from '@/shared/lib/dataAccess';

export const useGetOrganizers = (
  lastOrganizerUsed: Organizer | null,
  searchString = '',
) => {
  const { data: allData, isSuccess, isLoading } = useGetPermissions();

  const permissions = Array.isArray(allData?.data) ? allData.data : [];

  const dataWithoutLastOrganizer = permissions.filter(
    (permission: OrganizerPermissions) =>
      permission.organizer.id !== lastOrganizerUsed?.id,
  );

  const filteredData = searchString
    ? dataWithoutLastOrganizer.filter((permission: OrganizerPermissions) => {
        const term = searchString.toLowerCase();
        const matchesName = permission.organizer.name
          ?.toLowerCase()
          .includes(term);
        const matchesRegion = permission.organizer.cardSystems?.some((cs) =>
          cs.name?.toLowerCase().includes(term),
        );
        return matchesName || matchesRegion;
      })
    : dataWithoutLastOrganizer;

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
