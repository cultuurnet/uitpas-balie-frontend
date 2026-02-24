'use client';

import { useSearchParams } from 'next/navigation';
import {
  type TicketSale,
  useGetPassholders,
  usePostTicketSales,
  usePostRewardsRedeemed,
  useGetGrouppasses,
} from '@/shared/lib/dataAccess';
import { MobileNavBar } from '@/mobile/layouts';
import {
  ActivitySwitcher,
  Button,
  MobileContentStack,
  OutlinedButton,
  UitpasLoading,
} from '@/mobile/lib/ui';
import {
  ScanFailed,
  TariffDrawer,
  RewardsDrawer,
} from '@/mobile/feature-saving';
import { Stack, Typography, Divider, useTheme } from '@mui/material';
import { useActivity } from '@/mobile/feature-activities/useActivity';
import { useCounter } from '@/mobile/feature-counter/context/useCounter';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { ManualCardInput } from '@/mobile/feature-identification';
import { usePostCheckins } from '@/shared/lib/dataAccess/uitpas/generated/checkins/checkins';
import { getIdFromUrl, getUuid } from '@/shared/lib/utils';
import { useTranslation } from '@/shared/lib/utils/hooks';
import { PassHolder } from './PassHolder';
import { GroupPass } from './GroupPass';
import { useGetPassholdersPassholderIdAssociationMemberships } from '@/shared/lib/dataAccess/uitpas/generated/passholders/passholders';
import type { AssociationMembership } from '@/shared/lib/dataAccess/uitpas/generated/model';

type UiTPASNumber = string;

export const MobileSavingPage = () => {
  const { t, LANG_KEY } = useTranslation();
  const params = useSearchParams();
  const theme = useTheme();
  const uitpasNumber = params.get('uitpas') ?? '';
  const inszNumber = params.get('insz') ?? undefined;
  const { selectedActivity, navigateToScanner } = useActivity();
  const { activeCounter } = useCounter();
  const [showTariffDrawer, setShowTariffDrawer] = useState<boolean>(false);
  const [showRewardsDrawer, setShowRewardsDrawer] = useState<boolean>(false);
  const [drawerStartPosition, setDrawerStartPosition] = useState<number>(0);
  const activityRef = useRef<ElementRef<'div'>>(null);
  const [prevUitpasNumber, setPrevUitpasNumber] = useState<string>('');
  const [firstCardEntry, setFirstCardEntry] = useState<boolean>(
    Boolean(params.get('firstCardEntry')) ?? false
  );
  const [alertData, setAlertData] = useState<
    | Record<
        UiTPASNumber,
        {
          alertType: 'error' | 'success';
          message?: string;
        }
      >
    | undefined
  >(undefined);

  const {
    data: passHoldersData,
    isError: isPassholdersError,
    error: passHoldersError,
    isLoading: isPassholdersLoading,
    refetch: refetchPassholders,
  } = useGetPassholders({
    ...(uitpasNumber && { uitpasNumber }),
    ...(inszNumber && { inszNumber }),
  });

  const passholderId = passHoldersData?.data.member?.[0]?.id;

  const { data: associationMembershipsData } =
    useGetPassholdersPassholderIdAssociationMemberships(
      passholderId ?? '',
      {
        organiserId: selectedActivity?.organizer?.['@id']
          ? getIdFromUrl(selectedActivity.organizer['@id'])
          : activeCounter?.id || '',
      },
      {
        query: {
          enabled: !!passholderId,
        },
      }
    );

  // Filter for ACTIVE memberships and extract the association
  const activeAssociations = associationMembershipsData?.data
    ?.filter(
      (membership: AssociationMembership) => membership.status === 'ACTIVE'
    )
    ?.map((membership: AssociationMembership) => membership.association);

  const isGroupPass =
    passHoldersData?.data.member && passHoldersData.data.member.length === 0;

  const { data: groupPassHolder, isLoading: isGroupPassLoading } =
    useGetGrouppasses(
      { uitpasNumber: uitpasNumber },
      {
        query: {
          enabled: isGroupPass && !!uitpasNumber,
        },
      }
    );

  const {
    mutateAsync: postCheckin,
    status: checkinStatus,
    data: checkinData,
    error: checkinError,
  } = usePostCheckins({
    mutation: {
      onSuccess: () => {
        setAlertData({
          [uitpasNumber]: {
            alertType: 'success',
            message: t('saving.mobile.pointSaved'),
          },
        });
        refetchPassholders().catch(() => null);
      },
      onError: (error) =>
        setAlertData({
          [uitpasNumber]: {
            alertType: 'error',
            message:
              error.response?.data.endUserMessage &&
              error.response.data.endUserMessage[LANG_KEY],
          },
        }),
    },
  });
  const isCheckinLoading = checkinStatus === 'pending';

  const { mutate: postTicketSale, status: ticketSaleStatus } =
    usePostTicketSales({
      mutation: {
        onSuccess: (data) => {
          setFirstCardEntry(false);
          refetchPassholders().catch(() => null);
          setAlertData({
            [uitpasNumber]: {
              alertType: 'success',
              message: t('saving.mobile.tariff.discountRegistered', {
                price: (data.data.at(0)?.tariff?.price ?? 0) * data.data.length,
              }),
            },
          });
        },
        onError: (error) =>
          setAlertData({
            [uitpasNumber]: {
              alertType: 'error',
              message:
                error.response?.data.endUserMessage &&
                error.response.data.endUserMessage[LANG_KEY],
            },
          }),
      },
    });
  const isTicketSaleLoading = ticketSaleStatus === 'pending';

  const { mutate: postRewardsRedeemed, status: rewardsStatus } =
    usePostRewardsRedeemed({
      mutation: {
        onSuccess: () => {
          setFirstCardEntry(false);
          setAlertData({
            [uitpasNumber]: {
              alertType: 'success',
              message: t('saving.mobile.reward.redeemed'),
            },
          });
          refetchPassholders().catch(() => null);
        },
        onError: (error) =>
          setAlertData({
            [uitpasNumber]: {
              alertType: 'error',
              message:
                error.response?.data.endUserMessage &&
                error.response.data.endUserMessage[LANG_KEY],
            },
          }),
      },
    });
  const isRewardsRedeemedLoading = rewardsStatus === 'pending';

  const handleNextScanClick = () => {
    navigateToScanner('replace', false);
  };

  const handleChooseTariffClick = () => {
    setDrawerStartPosition(activityRef.current?.getBoundingClientRect().bottom ?? 0);
    setShowTariffDrawer(true);
  };

  const handleChooseBenefitClick = () => {
    setDrawerStartPosition(activityRef.current?.getBoundingClientRect().bottom ?? 0);
    setShowRewardsDrawer(true);
  };

  const handleTicketSaleMutation = (
    tariffId: string,
    regularPrice: number,
    count?: number
  ) => {
    if ((!isGroupPass && !passHoldersData?.data?.member) || !selectedActivity)
      return;

    const uitpasNumber = isGroupPass
      ? groupPassHolder?.data.member?.[0]?.uitpasNumber
      : passHoldersData?.data.member?.[0]?.uitpasNumber ??
        passHoldersData?.data.member?.[0]?.cardSystemMemberships?.[0]
          ?.uitpasNumber;

    if (!uitpasNumber || !selectedActivity['@id']) return;

    if (!count) count = 1;

    postTicketSale({
      data: Array(count).fill({
        eventId: getUuid(selectedActivity['@id']),
        tariff: {
          id: tariffId,
        },
        regularPrice,
        uitpasNumber,
      }) as TicketSale[],
    });
  };

  const handleRewardRedemption = (rewardId: string) => {
    if (passHoldersData?.data.member) {
      const uitpasNumber =
        passHoldersData.data.member[0].uitpasNumber ??
        passHoldersData.data.member[0].cardSystemMemberships?.at(0)
          ?.uitpasNumber;

      if (!uitpasNumber) return;

      postRewardsRedeemed({
        data: {
          uitpasNumber,
          rewardId,
        },
      });
    }
  };

  useEffect(() => {
    if (
      passHoldersData?.data?.member &&
      passHoldersData.data.member.length > 0
    ) {
      const uitpasNumber =
        passHoldersData.data.member[0].uitpasNumber ??
        passHoldersData.data.member[0].cardSystemMemberships?.at(0)
          ?.uitpasNumber;
      const eventId = getUuid(selectedActivity?.['@id'] ?? '');

      if (!uitpasNumber || !eventId || uitpasNumber === prevUitpasNumber)
        return;

      postCheckin({
        data: {
          uitpasNumber,
          eventId,
        },
      })
        .catch(() => null)
        .finally(() => setPrevUitpasNumber(uitpasNumber));
    }
  }, [
    passHoldersData,
    postCheckin,
    prevUitpasNumber,
    refetchPassholders,
    selectedActivity,
  ]);

  if (
    isPassholdersLoading ||
    isCheckinLoading ||
    isTicketSaleLoading ||
    isRewardsRedeemedLoading ||
    isGroupPassLoading
  )
    return (
      <MobileNavBar>
        <UitpasLoading />
      </MobileNavBar>
    );

  if (isPassholdersError) {
    const { data } = passHoldersError?.response || {};
    const endUserMessage = data?.endUserMessage;

    if (endUserMessage) {
      return <ScanFailed errorMessage={endUserMessage[LANG_KEY]} />;
    }
  }

  return (
    <MobileNavBar>
      <MobileContentStack sx={{ height: 'auto', mb: '12px' }}>
        <Typography variant="h1">
          {t('saving.mobile.chosenActivity')}
        </Typography>
        <ActivitySwitcher ref={activityRef} />

        {passHoldersData?.data.member?.[0] ? (
          <PassHolder
            passholder={passHoldersData?.data.member?.[0]}
            firstCardEntry={firstCardEntry}
            associations={activeAssociations}
            alertData={alertData?.[uitpasNumber]}
          />
        ) : (
          groupPassHolder?.data.member?.[0] && (
            <GroupPass
              groupPass={groupPassHolder?.data.member?.[0]}
              firstCardEntry={firstCardEntry}
              alertData={alertData?.[uitpasNumber]}
            />
          )
        )}

        <Stack rowGap="10px" sx={{ marginTop: '-10px' }}>
          {selectedActivity && (
            <OutlinedButton onClick={handleChooseTariffClick}>
              {t('saving.mobile.chooseTariffBtn')}
            </OutlinedButton>
          )}
          {!isGroupPass && (
            <OutlinedButton onClick={handleChooseBenefitClick}>
              {t('saving.mobile.tradeBenefitBtn')}
            </OutlinedButton>
          )}
        </Stack>

        {/*-16 comes from the padding that's already in the stack*/}
        <Divider sx={{ margin: '0 -16px' }} />
        <Button onClick={handleNextScanClick}>
          {t('saving.mobile.scanNextBtn')}
        </Button>
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.neutral[900],
            textAlign: 'center',
          }}
        >
          {t('saving.mobile.or')}
        </Typography>

        <ManualCardInput firstCardEntry={false} />

        {selectedActivity &&
          selectedActivity['@id'] &&
          passHoldersData?.data?.member && (
            <TariffDrawer
              eventId={selectedActivity['@id']}
              passHolderName={
                isGroupPass
                  ? groupPassHolder?.data.member?.[0]?.name ?? undefined
                  : passHoldersData.data.member
                  ? `${passHoldersData.data.member[0].firstName} ${passHoldersData.data.member[0].name}`
                  : undefined
              }
              isOpen={showTariffDrawer}
              setIsOpen={setShowTariffDrawer}
              startPosition={drawerStartPosition}
              uitpasNumber={
                isGroupPass
                  ? groupPassHolder?.data.member?.at(0)?.uitpasNumber!
                  : passHoldersData.data.member
                      ?.at(0)
                      ?.cardSystemMemberships?.at(0)?.uitpasNumber!
              }
              ticketSaleMutation={handleTicketSaleMutation}
              isGroupPass={isGroupPass}
            />
          )}

        {/* Grouppass holders can't claim rewards, so this drawer will not render with grouppasses */}
        {!isGroupPass &&
          passHoldersData?.data?.member && (
            <RewardsDrawer
              isOpen={showRewardsDrawer}
              setIsOpen={setShowRewardsDrawer}
              startPosition={drawerStartPosition}
              passHolderId={passHoldersData.data.member[0].id}
              passHolderName={
                passHoldersData.data.member
                  ? `${passHoldersData.data.member[0].firstName} ${passHoldersData.data.member[0].name}`
                  : undefined
              }
              passHolderPoints={passHoldersData.data.member[0].points ?? 0}
              rewardRedemptionMutation={handleRewardRedemption}
            />
          )}
      </MobileContentStack>
    </MobileNavBar>
  );
};
