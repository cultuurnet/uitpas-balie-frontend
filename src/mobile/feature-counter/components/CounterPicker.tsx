'use client';

import { Stack } from '@mui/material';
import { ChangeEvent, Fragment } from 'react';

import { MobileNavBar } from '@/mobile/layouts';
import { MobileContentStack, SearchInput, Typography } from '@/mobile/lib/ui';
import { OutlinedButton } from '@/mobile/lib/ui/uitpas/OutlinedButton';
import { Organizer, OrganizerPermissions } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';
import { Counter } from '@/store/counterStore';

type CounterPickerProps = {
  totalCounters: number;
  counters: OrganizerPermissions[];
  prevCounter: Counter;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onCounterClick: (organizer: Organizer) => () => void;
  searchString: string;
};

export const CounterPicker = ({
  totalCounters,
  counters,
  prevCounter,
  onSearch,
  onCounterClick,
  searchString,
}: CounterPickerProps) => {
  const { t } = useTranslation();

  return (
    <MobileNavBar>
      <MobileContentStack>
        <Typography variant="h1">
          {t('counter.mobile.selectCounter')}
        </Typography>
        {totalCounters >= 10 && (
          <SearchInput
            placeholder={t('counter.mobile.searchCounter')}
            onChange={onSearch}
          />
        )}
        {counters.length === 0 && searchString ? (
          <Typography>
            {t('counter.mobile.noCounterSearch', { searchTerm: searchString })}
          </Typography>
        ) : (
          <>
            {prevCounter && (
              <>
                <Typography variant="h1">
                  {t('counter.mobile.lastUsed')}
                </Typography>
                <OutlinedButton onClick={onCounterClick(prevCounter)}>
                  {prevCounter.name}
                </OutlinedButton>
              </>
            )}
            <Typography variant="h1">
              {t('counter.mobile.otherCounters')}
            </Typography>
            <Stack
              gap="12px"
              sx={{
                overflowY: 'scroll',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                pb: 1,
              }}
            >
              {counters.map((counter) => (
                <Fragment
                  key={`${counter.organizer.id} ${counter.organizer.name}`}
                >
                  <OutlinedButton
                    key={counter.organizer.id}
                    onClick={onCounterClick(counter.organizer)}
                  >
                    {counter.organizer.name}
                  </OutlinedButton>
                </Fragment>
              ))}
            </Stack>
          </>
        )}
      </MobileContentStack>
    </MobileNavBar>
  );
};
