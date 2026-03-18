'use client';

import { useSession } from 'next-auth/react';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { Organizer } from '@/shared/lib/dataAccess';
import {
  readOrganizer,
  readPrevOrganizer,
  storeOrganizer,
  storePrevOrganizer,
} from '@/store/organizerStore';

export const OrganizerContext = createContext<{
  activeOrganizer: Organizer | null;
  lastOrganizerUsed: Organizer | null;
  setActiveOrganizer: Dispatch<SetStateAction<Organizer | null>>;
  setLastOrganizerUsed: Dispatch<SetStateAction<Organizer | null>>;
}>({
  activeOrganizer: null,
  lastOrganizerUsed: null,
  setActiveOrganizer: () => {},
  setLastOrganizerUsed: () => {},
});

export const OrganizerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeOrganizer, setActiveOrganizer] = useState<Organizer | null>(
    readOrganizer,
  );
  const [lastOrganizerUsed, setLastOrganizerUsed] = useState<Organizer | null>(
    readPrevOrganizer,
  );
  const { status } = useSession();

  // Clear the organizer cookie when the user logs out
  const activeOrganizerForStorage =
    status === 'unauthenticated' ? null : activeOrganizer;

  useEffect(
    () => storeOrganizer(activeOrganizerForStorage),
    [activeOrganizerForStorage],
  );
  useEffect(() => storePrevOrganizer(lastOrganizerUsed), [lastOrganizerUsed]);

  return (
    <OrganizerContext.Provider
      value={{
        activeOrganizer: activeOrganizerForStorage,
        setActiveOrganizer,
        lastOrganizerUsed,
        setLastOrganizerUsed,
      }}
    >
      {children}
    </OrganizerContext.Provider>
  );
};
