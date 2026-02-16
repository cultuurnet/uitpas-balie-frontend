import { Grouppass } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/utils/hooks';
import { OpportunityStateCard } from './OpportunityStateCard';
import dayjs from 'dayjs';

type OpportunityStateGrouppassProps = {
  groupPass: Grouppass;
};

export const OpportunityStateGrouppass = ({
  groupPass,
}: OpportunityStateGrouppassProps) => {
  const { t } = useTranslation();

  if (!groupPass.socialTariff) return null;

  return (
    <OpportunityStateCard
      status={groupPass.socialTariff?.status}
      title={t(
        `saving.mobile.opportunityState.passholder.${groupPass.socialTariff?.status?.toLowerCase()}.title`
      )}
    >
      <p style={{ fontWeight: 700, fontSize: '11px', margin: 0 }}>
        {t(
          `saving.mobile.opportunityState.grouppass.${groupPass.socialTariff?.status?.toLowerCase()}.content`,
          {
            endDate: dayjs(groupPass.socialTariff.endDate).format('DD/MM/YYYY'),
            availableTickets: groupPass.socialTariff.availableTickets,
            interpolation: { escapeValue: false },
          }
        )}
      </p>
    </OpportunityStateCard>
  );
};
