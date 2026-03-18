import { useParams, usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { clientRoutes } from '@/mobile/feature-routing';
import { Organizer, useGetPermissions } from '@/shared/lib/dataAccess';

import { OrganizerContext } from './OrganizerContext';

export const useOrganizer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ organizer: string }>();
  const { data, isSuccess } = useGetPermissions({
    query: {
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    },
  });
  const allPermissions = Array.isArray(data?.data) ? data.data : [];

  const organizer = params.organizer
    ? allPermissions.find(
        (permission) => permission.organizer.id === params.organizer,
      )?.organizer
    : null;

  const { lastOrganizerUsed, setLastOrganizerUsed } =
    useContext(OrganizerContext);

  const organizerId = organizer?.id;

  useEffect(() => {
    if (params.organizer && !organizerId && isSuccess) {
      router.push(clientRoutes.organizers());
    }
  }, [organizerId, params.organizer, isSuccess, router]);

  return {
    activeOrganizer: organizer,
    lastOrganizerUsed,
    setActiveOrganizer: (organizer: Organizer) => {
      setLastOrganizerUsed(organizer);
      router.push(clientRoutes.activities(organizer.id));
    },
    clearOrganizer: () => {
      if (pathname === clientRoutes.organizers()) return;
      if (organizer) setLastOrganizerUsed(organizer);
      router.push(clientRoutes.organizers());
    },
  };
};
