'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

import { Organizer } from '@/shared/lib/dataAccess';

export const OrganizerContext = createContext<{
  lastOrganizerUsed: Organizer | null;
  setLastOrganizerUsed: Dispatch<SetStateAction<Organizer | null>>;
}>({
  lastOrganizerUsed: null,
  setLastOrganizerUsed: () => {},
});
