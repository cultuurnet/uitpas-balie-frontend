'use client';

import { Stack } from '@mui/material';
import { ChangeEvent, Fragment } from 'react';

import { MobileNavBar } from '@/mobile/layouts';
import { MobileContentStack, SearchInput, Typography } from '@/mobile/lib/ui';
import { OutlinedButton } from '@/mobile/lib/ui/uitpas/OutlinedButton';
import { Organizer, OrganizerPermissions } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';

type OrganizerPickerProps = {
  totalOrganizers: number;
  organizerPermissions: OrganizerPermissions[];
  prevOrganizer: Organizer | null;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onOrganizerClick: (organizer: Organizer) => () => void;
  searchString: string;
};

export const OrganizerPicker = ({
  totalOrganizers,
  organizerPermissions,
  prevOrganizer,
  onSearch,
  onOrganizerClick,
  searchString,
}: OrganizerPickerProps) => {
  const { t } = useTranslation();

  return (
    <MobileNavBar>
      <MobileContentStack>
        <Typography variant="h1">
          {t('organizer.mobile.selectOrganizer')}
        </Typography>
        {totalOrganizers >= 10 && (
          <SearchInput
            placeholder={t('organizer.mobile.searchOrganizer')}
            onChange={onSearch}
          />
        )}
        {organizerPermissions.length === 0 && searchString ? (
          <Typography>
            {t('organizer.mobile.noOrganizerSearch', {
              searchTerm: searchString,
            })}
          </Typography>
        ) : (
          <>
            {prevOrganizer && (
              <>
                <Typography variant="h1">
                  {t('organizer.mobile.lastUsed')}
                </Typography>
                <OutlinedButton onClick={onOrganizerClick(prevOrganizer)}>
                  {prevOrganizer.name}
                </OutlinedButton>
              </>
            )}
            <Typography variant="h1">
              {t('organizer.mobile.otherOrganizers')}
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
              {organizerPermissions.map((permission) => (
                <Fragment
                  key={`${permission.organizer.id} ${permission.organizer.name}`}
                >
                  <OutlinedButton
                    key={permission.organizer.id}
                    onClick={onOrganizerClick(permission.organizer)}
                  >
                    {permission.organizer.name}
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
