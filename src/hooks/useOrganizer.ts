import { useContext } from 'react';

import { OrganizerContext } from '@/app/OrganizerProvider';

export const useOrganizer = () => {
  const {
    activeOrganizer,
    lastOrganizerUsed,
    setActiveOrganizer,
    setLastOrganizerUsed,
  } = useContext(OrganizerContext);
  return {
    activeOrganizer,
    lastOrganizerUsed,
    setActiveOrganizer,
    setLastOrganizerUsed,
  };
};
