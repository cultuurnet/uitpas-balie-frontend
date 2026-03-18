'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { useGetOrganizers } from '@/hooks/useGetOrganizers';
import { useActivity } from '@/mobile/feature-activities/useActivity';
import { OrganizerNoData, OrganizerPicker } from '@/mobile/feature-organizer';
import { useOrganizer } from '@/mobile/feature-organizer/context/useOrganizer';
import { UitpasLoading } from '@/mobile/lib/ui';
import { Organizer } from '@/shared/lib/dataAccess';

export const OrganizerPage = () => {
  const [searchString, setSearchString] = useState<string>('');
  const { setActiveOrganizer, lastOrganizerUsed } = useOrganizer();
  const { setSelectedActivity } = useActivity();
  const { allData, data, isSuccess, isLoading } = useGetOrganizers(
    lastOrganizerUsed,
    searchString,
  );

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleOrganizerClick = (organizer: Organizer) => () => {
    setActiveOrganizer(organizer);
  };

  useEffect(() => setSelectedActivity(null), [setSelectedActivity]);

  useEffect(() => {
    const data = Array.isArray(allData?.data) ? allData.data : [];
    if (data.length === 1) {
      setActiveOrganizer(data[0].organizer);
    }
  }, [allData?.data, setActiveOrganizer]);

  if (isLoading) return <UitpasLoading />;

  if (isSuccess && Array.isArray(allData?.data) && allData.data.length > 0)
    return (
      <OrganizerPicker
        totalOrganizers={allData.data.length}
        organizerPermissions={data}
        prevOrganizer={lastOrganizerUsed}
        onSearch={handleSearchInputChange}
        onOrganizerClick={handleOrganizerClick}
        searchString={searchString}
      />
    );

  return <OrganizerNoData />;
};
