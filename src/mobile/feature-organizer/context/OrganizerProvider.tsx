'use client';

import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { Organizer } from '@/shared/lib/dataAccess';
import { readPrevOrganizer, storePrevOrganizer } from '@/store/organizerStore';

import { OrganizerContext } from './OrganizerContext';

export const OrganizerProvider: FC<
  {
    organizerPath: string;
  } & PropsWithChildren
> = ({ children }) => {
  const [lastOrganizerUsed, setLastOrganizerUsed] = useState<Organizer | null>(
    readPrevOrganizer,
  );

  useEffect(() => storePrevOrganizer(lastOrganizerUsed), [lastOrganizerUsed]);

  return (
    <OrganizerContext.Provider
      value={{
        lastOrganizerUsed,
        setLastOrganizerUsed,
      }}
    >
      {children}
    </OrganizerContext.Provider>
  );
};
