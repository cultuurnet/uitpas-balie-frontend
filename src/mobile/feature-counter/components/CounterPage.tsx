'use client';

import { Organizer } from '@/shared/lib/dataAccess';
import { CounterNoData, CounterPicker } from '@/mobile/feature-counter';
import { ChangeEvent, useEffect, useState } from 'react';
import { useCounter } from '@/mobile/feature-counter/context/useCounter';
import { UitpasLoading } from '@/mobile/lib/ui';
import { useActivity } from '@/mobile/feature-activities/useActivity';
import { useGetCounters } from '@/shared/feature-counter/hooks/useGetCounters';

export const CounterPage = () => {
  const [searchString, setSearchString] = useState<string>('');
  const { setActiveCounter, lastCounterUsed } = useCounter();
  const { setSelectedActivity } = useActivity();
  const { allData, data, isSuccess, isLoading } = useGetCounters(
    lastCounterUsed,
    searchString,
  );

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleCounterClick = (organizer: Organizer) => () => {
    setActiveCounter(organizer);
  };

  useEffect(() => setSelectedActivity(null), [setSelectedActivity]);

  useEffect(() => {
    const data = Array.isArray(allData?.data) ? allData.data : [];
    if (data.length === 1) {
      setActiveCounter(data[0].organizer);
    }
  }, [allData?.data, setActiveCounter]);

  if (isLoading) return <UitpasLoading />;

  if (isSuccess && Array.isArray(allData?.data) && allData.data.length > 0)
    return (
      <CounterPicker
        totalCounters={allData.data.length}
        counters={data}
        prevCounter={lastCounterUsed}
        onSearch={handleSearchInputChange}
        onCounterClick={handleCounterClick}
        searchString={searchString}
      />
    );

  return <CounterNoData />;
};
