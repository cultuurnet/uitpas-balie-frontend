'use client';

import { MobileNavBar } from '@/mobile/layouts';
import {
  Link,
  MobileContentStack,
  SearchInput,
  Typography,
} from '@/mobile/lib/ui';
import { useTranslation } from '@/shared/lib/i18n/client';
import { debounce } from '@mui/material';
import { useGetEvents, Search } from '@/shared/lib/dataAccess';
import { useCounter } from '@/mobile/feature-counter/context/useCounter';
import { ChangeEvent, useState, useEffect, useMemo } from 'react';
import { useSearchQuery } from '@/shared/lib/utils/hooks/useSearchQuery';
import { ActivitiesPicker } from '@/mobile/feature-activities';
import { noActivity } from '@/mobile/feature-activities/useActivity';
import dayjs from 'dayjs';
import { dateToISODateTimeString } from '@/shared/lib/utils';
import { clientRoutes } from '@/mobile/feature-routing';
import { getEventParams } from '@/shared/feature-events/getEventParams';

type ExtendedEvent = Search.Event & { isNew: boolean };

const FETCH_LIMIT = 50;

export const ActivitiesPage = () => {
  const { t } = useTranslation();
  const { activeCounter } = useCounter();

  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const INITIAL_DATA = {
    facet: undefined,
    itemsPerPage: 0,
    member: new Set<ExtendedEvent>(),
    memberIndex: new Map<string, ExtendedEvent>(),
    totalItems: 0,
  };

  const [offset, setOffset] = useState<number>(0);
  const [data, setData] = useState<
    Omit<Search.GetEvents200, 'member'> & {
      member: Set<ExtendedEvent>;
      memberIndex: Map<string, ExtendedEvent>;
    }
  >(INITIAL_DATA);

  const {
    data: fetchedData,
    isSuccess,
    isFetching,
  } = useGetEvents({
    ...getEventParams(),
    organizerId: activeCounter?.id,
    ...(searchQuery && { q: searchQuery }),
    // @ts-expect-error Orval didn't include pagination in generated types
    limit: FETCH_LIMIT,
    start: offset,
  });
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [showSearchInput, setShowSearchInput] = useState<boolean | null>(null);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setScrollPosition(0);
    setOffset(0);
    setIsInitialLoading(true);
    setData(INITIAL_DATA);
  };

  useEffect(() => {
    if (isSuccess) {
      setData((prev) => {
        const updatedMembers = new Set<ExtendedEvent>(
          [...prev.member].map((member) => ({ ...member, isNew: false }))
        );
        const updatedIndex = new Map<string, ExtendedEvent>(prev.memberIndex);

        fetchedData.data.member.forEach((member) => {
          const existingMember = prev.memberIndex.get(member['@id']!);
          if (existingMember) {
            Object.assign(existingMember, member);
          } else {
            const newMember: ExtendedEvent = {
              ...member,
              isNew: prev.member.size === 0,
            };
            updatedMembers.add(newMember);
            updatedIndex.set(member['@id']!, newMember);
          }
        });

        return {
          ...fetchedData.data,
          member: updatedMembers,
          memberIndex: updatedIndex,
        };
      });

      setIsInitialLoading(false);

      if (showSearchInput === null) {
        setShowSearchInput(fetchedData.data.totalItems > 10 || !!searchQuery);
      }
    }
  }, [fetchedData?.data]);

  return (
    <MobileNavBar>
      <MobileContentStack>
        <Typography variant="h1">
          {t('activities.mobile.chooseActivity')}
        </Typography>

        {showSearchInput && (
          <SearchInput
            defaultValue={searchQuery}
            placeholder={t('activities.mobile.searchPlaceholder')}
            onChange={debounce(handleSearchInputChange, 500)}
          />
        )}

        <ActivitiesPicker
          data={data}
          isInitialLoading={isInitialLoading}
          fetchLimit={FETCH_LIMIT}
          totalFetchedItems={fetchedData ? fetchedData.data.totalItems : 0}
          setOffset={setOffset}
          scrollPosition={scrollPosition}
          setScrollPosition={setScrollPosition}
          isFetching={isFetching}
        />
        {!isInitialLoading && activeCounter && (
          <Link
            color="primary"
            href={clientRoutes.identification(activeCounter.id, noActivity)}
          >
            {t('activities.mobile.continueNoActivity')}
          </Link>
        )}
      </MobileContentStack>
    </MobileNavBar>
  );
};
