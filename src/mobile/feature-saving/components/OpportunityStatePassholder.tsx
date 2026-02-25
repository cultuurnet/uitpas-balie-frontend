import {
  CardSystemMembership,
  CardSystemMembershipSocialTariff,
  Passholder,
} from '@/shared/lib/dataAccess';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { useTranslation } from '@/shared/lib/i18n/client';
import { OpportunityStateCard } from '@/mobile/feature-saving';
import { Require } from '@/shared/lib/utils/typescriptUtil';

type OpportunityStateDateProps = {
  passholder: Passholder;
};

const paragraphStyle = { fontWeight: 700, fontSize: '11px', margin: 0 };

export const OpportunityStatePassholder = ({
  passholder,
}: OpportunityStateDateProps) => {
  const { t } = useTranslation();

  if (!passholder.cardSystemMemberships?.length) return null;

  // 1. Prepare filtered sets of memberships
  const blockedMemberships = passholder.cardSystemMemberships.filter(
    (csm) => csm.status === 'BLOCKED',
  );

  const hasActiveMemberships = passholder.cardSystemMemberships.some(
    (csm) => csm.status === 'ACTIVE',
  );

  // 2. Show blocked memberships *only* when there are no active memberships
  if (blockedMemberships.length && !hasActiveMemberships) {
    return (
      <OpportunityStateCard
        status="BLOCKED"
        title={t('saving.mobile.opportunityState.passholder.blocked.title')}
      >
        {blockedMemberships.map((csm) => (
          <p key={csm.cardSystem.id} style={paragraphStyle}>
            {t('saving.mobile.opportunityState.passholder.blocked.content', {
              cardSystemName: csm.cardSystem.name,
            })}
          </p>
        ))}
        <p style={paragraphStyle}>
          {t('saving.mobile.opportunityState.passholder.blocked.content2')}
        </p>
      </OpportunityStateCard>
    );
  }

  // 3. Filter memberships that have a social tariff.
  const memberships = passholder.cardSystemMemberships.filter(
    (csm) => csm.socialTariff,
  ) as Require<CardSystemMembership, 'socialTariff'>[];
  if (!memberships.length) return null;

  // 4. Determine the main membership to use for the card header.
  const mainMembership =
    memberships.find(
      (csm) => csm.status === 'ACTIVE' && csm.socialTariff?.status === 'ACTIVE',
    ) ||
    memberships.find((csm) => csm.status === 'ACTIVE') ||
    memberships[0];

  const headerStatus = mainMembership.socialTariff.status;
  const headerKey = headerStatus.toLowerCase();
  const cardTitle = t(
    `saving.mobile.opportunityState.passholder.${headerKey}.title`,
  );

  // 5. Render the card with content for each membership.
  return (
    <OpportunityStateCard status={headerStatus} title={cardTitle}>
      {memberships.map((csm) => {
        const { socialTariff, cardSystem } = csm;
        const statusKey = socialTariff.status.toLowerCase();

        const translationData = {
          cardSystemName: cardSystem.name,
          socialTariffEndDate: socialTariff.endDate
            ? dayjs(socialTariff.endDate).format('DD/MM/YYYY')
            : undefined,
          suspendedUntilDate: socialTariff.suspendedUntilDate
            ? dayjs(socialTariff.suspendedUntilDate).format('DD/MM/YYYY')
            : undefined,
          firstName: passholder.firstName,
          lastName: passholder.name,
          interpolation: { escapeValue: false },
        };

        return (
          <Fragment key={cardSystem.id}>
            <p style={paragraphStyle}>
              {t(
                `saving.mobile.opportunityState.passholder.${statusKey}.content`,
                translationData,
              )}
            </p>
            {socialTariff.inGracePeriod && (
              <p style={paragraphStyle}>
                {t(
                  `saving.mobile.opportunityState.passholder.${statusKey}.gracePeriod`,
                  translationData,
                )}
              </p>
            )}
          </Fragment>
        );
      })}
    </OpportunityStateCard>
  );
};
