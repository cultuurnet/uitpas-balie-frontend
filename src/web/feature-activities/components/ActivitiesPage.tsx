'use client';

import { CircularProgress } from '@mui/joy';
import type { Theme } from '@mui/joy/styles';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useCounter } from '@/hooks/useCounter';
import { getEventParams } from '@/shared/feature-events/getEventParams';
import { useGetEvents } from '@/shared/lib/dataAccess';
import {
  EventAllOf,
  GetEvents200,
} from '@/shared/lib/dataAccess/search/generated/model';
import {
  getQrCodeUrl,
  getUitInDatabankurl,
  getUitInVlaanderenUrl,
} from '@/shared/lib/utils';
import { DATE_FORMAT } from '@/shared/lib/utils/dateUtils';
import { useTranslation } from '@/shared/lib/utils/hooks';
import { usePaginationQuery } from '@/shared/lib/utils/hooks/usePaginationQuery';
import { useRangeQuery } from '@/shared/lib/utils/hooks/useRangeQuery';
import { useSearchQuery } from '@/shared/lib/utils/hooks/useSearchQuery';
import {
  Grid,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
  PageWithSideBarNew,
  Typography,
} from '@/web/lib/ui';
import { ActionButton } from '@/web/lib/ui/uitpas/ActionButton';
import { Pagination } from '@/web/lib/ui/uitpas/Pagination';

import {
  ActionLink,
  StyledActionsStack,
  StyledActivityStack,
  StyledEventDate,
  StyledEventName,
  StyledItemStack,
  StyledPageContainerStack,
  StyledPageTitle,
  StyledUserInputStack,
} from './ActivitiesPages.styles';
import { RangeMenu } from './RangeMenu';
import { SearchInput } from './SearchInput';
import { SidebarContent } from './SidebarContent';

export const ActivitiesPage = () => {
  const { t, LANG_KEY } = useTranslation();
  const { activeCounter: counter } = useCounter();

  const { fetchLimit, offset } = usePaginationQuery();
  const { rangeQuery, dateRange } = useRangeQuery();
  const { searchQuery } = useSearchQuery();

  const [selectedActivity, setSelectedActivity] = useState<
    EventAllOf | undefined
  >(undefined);

  const { data, isSuccess, isLoading } = useGetEvents({
    ...getEventParams(),
    organizerId: counter?.id,
    ...(rangeQuery && { dateFrom: dateRange.from, dateTo: dateRange.to }),
    ...(searchQuery && { q: searchQuery }),
    // @ts-expect-error Orval didn't include pagination in generated types
    limit: fetchLimit,
    start: offset,
  });

  return (
    <>
      <PageWithSideBarNew sideBarContent={<SidebarContent />} hasBackButton>
        <StyledPageContainerStack>
          <StyledPageTitle level="h2">{t('activities.title')}</StyledPageTitle>
          <StyledUserInputStack customInput={rangeQuery === 'chooseDate'}>
            <RangeMenu defaultRange={rangeQuery} disabled={isLoading} />
            <SearchInput defaultSearch={searchQuery} disabled={isLoading} />
          </StyledUserInputStack>

          {!isLoading && isSuccess ? (
            <>
              {(data.data as GetEvents200).member.length > 0 ? (
                (data.data as GetEvents200).member.map((member, i) => (
                  <StyledActivityStack
                    key={`activity-${member.name[LANG_KEY]?.substring(0, 10)}}`}
                    sx={(theme: Theme) => ({
                      borderTop:
                        i === 0
                          ? `1px solid ${theme.palette.neutral[400]}`
                          : `1px solid ${theme.palette.neutral.outlinedBorder}`,
                    })}
                    onClick={() => setSelectedActivity(member)}
                  >
                    <StyledItemStack>
                      {member.startDate && member.endDate && (
                        <StyledEventDate level="body2">
                          {t('activities.fromStartToEndDate', {
                            startDate: dayjs(member.startDate).format(
                              DATE_FORMAT,
                            ),
                            endDate: dayjs(member.endDate).format(DATE_FORMAT),
                          })}
                        </StyledEventDate>
                      )}

                      <StyledEventName level="h3">
                        {member.name[LANG_KEY] ?? member.name.nl}
                      </StyledEventName>
                    </StyledItemStack>

                    <StyledActionsStack>
                      <ActionLink
                        href={getUitInVlaanderenUrl(
                          member.name.nl!,
                          member['@id']!,
                        )}
                        target="_blank"
                      >
                        {t('activities.viewUiTInVlaanderenBtn')}
                      </ActionLink>
                      <ActionLink
                        href={getUitInDatabankurl(member['@id']!)}
                        target="_blank"
                      >
                        {t('activities.viewUiTDatabaseBtn')}
                      </ActionLink>
                      <ActionLink href={getQrCodeUrl(member['@id']!)}>
                        {t('activities.downloadQrCodeBtn')}
                      </ActionLink>
                    </StyledActionsStack>
                  </StyledActivityStack>
                ))
              ) : (
                <Typography level="body2">
                  {t('activities.noActivities')}
                </Typography>
              )}
            </>
          ) : (
            <CircularProgress
              color="neutral"
              determinate={false}
              size="sm"
              variant="plain"
              sx={{ alignSelf: 'center', my: 10 }}
            />
          )}
          <Pagination
            totalItems={
              (data?.data as GetEvents200 | undefined)?.totalItems ?? 0
            }
          />
        </StyledPageContainerStack>
      </PageWithSideBarNew>

      <Modal
        open={selectedActivity !== undefined}
        onClose={() => setSelectedActivity(undefined)}
      >
        <ModalHeader>
          <Typography level="h4" sx={{ fontSize: '15px', fontWeight: 600 }}>
            {selectedActivity?.name[LANG_KEY] ?? selectedActivity?.name.nl}
          </Typography>
        </ModalHeader>

        <ModalContent>
          {selectedActivity?.startDate && selectedActivity?.endDate && (
            <Grid container sx={{ flexGrow: 1 }}>
              <Grid xs={3}>
                <Typography level="body2" fontStyle="italic">
                  {t('activities.activityModal.when')}
                </Typography>
              </Grid>
              <Grid xs={9}>
                <Typography level="body2">
                  {t('activities.fromStartToEndDate', {
                    startDate: dayjs(selectedActivity.startDate).format(
                      DATE_FORMAT,
                    ),
                    endDate: dayjs(selectedActivity.endDate).format(
                      DATE_FORMAT,
                    ),
                  })}
                </Typography>
              </Grid>
            </Grid>
          )}
        </ModalContent>

        <ModalActions>
          <ActionButton onClick={() => setSelectedActivity(undefined)}>
            {t('activities.activityModal.closeBtn')}
          </ActionButton>
        </ModalActions>
      </Modal>
    </>
  );
};
