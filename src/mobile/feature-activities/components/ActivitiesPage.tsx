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
import { ChangeEvent, useState, useEffect, useReducer } from 'react';
import { useSearchQuery } from '@/shared/lib/utils/hooks/useSearchQuery';
import { ActivitiesPicker } from '@/mobile/feature-activities';
import { noActivity } from '@/mobile/feature-activities/useActivity';
import { clientRoutes } from '@/mobile/feature-routing';
import { getEventParams } from '@/shared/feature-events/getEventParams';

type ExtendedEvent = Search.Event & { isNew: boolean };

const FETCH_LIMIT = 50;

type ActivitiesState = {
  data: Omit<Search.GetEvents200, 'member'> & {
    member: Set<ExtendedEvent>;
    memberIndex: Map<string, ExtendedEvent>;
  };
  isInitialLoading: boolean;
  showSearchInput: boolean | null;
};

type ActivitiesAction =
  | {
      type: 'fetchSuccess';
      fetchedData: { data: Search.GetEvents200 };
      searchQuery: string | undefined;
    }
  | { type: 'reset' };

const INITIAL_STATE: ActivitiesState = {
  data: {
    facet: undefined,
    itemsPerPage: 0,
    member: new Set<ExtendedEvent>(),
    memberIndex: new Map<string, ExtendedEvent>(),
    totalItems: 0,
  },
  isInitialLoading: true,
  showSearchInput: null,
};

function activitiesReducer(
  state: ActivitiesState,
  action: ActivitiesAction
): ActivitiesState {
  switch (action.type) {
    case 'fetchSuccess': {
      const updatedMembers = new Set<ExtendedEvent>(
        [...state.data.member].map((member) => ({ ...member, isNew: false }))
      );
      const updatedIndex = new Map<string, ExtendedEvent>(
        state.data.memberIndex
      );

      action.fetchedData.data.member.forEach((member) => {
        const existingMember = state.data.memberIndex.get(member['@id']!);
        if (existingMember) {
          Object.assign(existingMember, member);
        } else {
          const newMember: ExtendedEvent = {
            ...member,
            isNew: state.data.member.size === 0,
          };
          updatedMembers.add(newMember);
          updatedIndex.set(member['@id']!, newMember);
        }
      });

      return {
        data: {
          ...action.fetchedData.data,
          member: updatedMembers,
          memberIndex: updatedIndex,
        },
        isInitialLoading: false,
        showSearchInput:
          state.showSearchInput ??
          (action.fetchedData.data.totalItems > 10 || !!action.searchQuery),
      };
    }
    case 'reset':
      return INITIAL_STATE;
  }
}

export const ActivitiesPage = () => {
  const { t } = useTranslation();
  const { activeCounter } = useCounter();

  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [{ data, isInitialLoading, showSearchInput }, dispatch] = useReducer(
    activitiesReducer,
    INITIAL_STATE
  );

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

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setScrollPosition(0);
    setOffset(0);
    dispatch({ type: 'reset' });
  };

  useEffect(() => {
    if (isSuccess && fetchedData) {
      dispatch({ type: 'fetchSuccess', fetchedData, searchQuery });
    }
  }, [isSuccess, fetchedData, searchQuery]);

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
