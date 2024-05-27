import { Passholder } from "@/shared/lib/dataAccess";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { useTranslation } from "@/shared/lib/i18n/client";
import { OpportunityStateCard } from "@/mobile/feature-saving";

type OpportunityStateDateProps = {
  passholder: Passholder;
};

export const OpportunityState = ({ passholder }: OpportunityStateDateProps) => {
  const { t } = useTranslation();

  if (!passholder.cardSystemMemberships) return null;

  if (
    passholder.cardSystemMemberships.filter((csm) => csm.status === "BLOCKED")
      .length > 0
  ) {
    const blockedCardSystems = passholder.cardSystemMemberships.filter(
      (csm) => csm.status === "BLOCKED"
    );

    return (
      <OpportunityStateCard status="BLOCKED">
        {blockedCardSystems.map((card) => (
          <p
            style={{ fontWeight: 700, fontSize: "11px", margin: 0 }}
            key={card.cardSystem.id}
          >
            {t("saving.mobile.opportunityState.blocked.content", {
              cardSystemName: card.cardSystem.name,
            })}
          </p>
        ))}

        <p style={{ fontWeight: 700, fontSize: "11px", margin: 0 }}>
          {t("saving.mobile.opportunityState.blocked.content2")}
        </p>
      </OpportunityStateCard>
    );
  }

  // Indien de pashouder maar één cardsystem heeft:
  if (passholder.cardSystemMemberships?.length === 1) {
    const csm = passholder.cardSystemMemberships[0];
    if (!csm.socialTariff) return null;

    if (csm.socialTariff.status === "ACTIVE") {
      return (
        <OpportunityStateCard status="ACTIVE">
          <p style={{ fontWeight: 700, fontSize: "11px", margin: 0 }}>
            {t("saving.mobile.opportunityState.active.content", {
              cardSystemName:
                passholder.cardSystemMemberships[0].cardSystem.name,
              socialTariffEndDate: dayjs(csm.socialTariff.endDate).format(
                "DD/MM/YYYY"
              ),
              interpolation: { escapeValue: false },
            })}
          </p>

          {csm.socialTariff.inGracePeriod && (
            <p style={{ fontWeight: 700, fontSize: "11px", margin: 0 }}>
              {t("saving.mobile.opportunityState.active.gracePeriod")}
            </p>
          )}
        </OpportunityStateCard>
      );
    }

    if (csm.socialTariff.status === "EXPIRED") {
      return (
        <OpportunityStateCard status="EXPIRED">
          <p style={{ fontWeight: 700, fontSize: "11px", margin: 0 }}>
            {t("saving.mobile.opportunityState.expired.content", {
              cardSystemName:
                passholder.cardSystemMemberships[0].cardSystem.name,
              socialTariffEndDate: dayjs(csm.socialTariff.endDate).format(
                "DD/MM/YYYY"
              ),
              interpolation: { escapeValue: false },
            })}
          </p>
        </OpportunityStateCard>
      );
    }

    if (csm.socialTariff.status === "SUSPENDED") {
      return (
        <OpportunityStateCard status="SUSPENDED">
          <p style={{ fontWeight: 700, fontSize: "11px", margin: 0 }}>
            {t("saving.mobile.opportunityState.suspended.content", {
              cardSystemName:
                passholder.cardSystemMemberships[0].cardSystem.name,
              suspendedUntilDate: dayjs(
                csm.socialTariff.suspendedUntilDate
              ).format("DD/MM/YYYY"),
              firstName: passholder.firstName,
              lastName: passholder.name,
              interpolation: { escapeValue: false },
            })}
          </p>
        </OpportunityStateCard>
      );
    }
  }

  // Indien de pashouder meerdere cardsystems heeft:
  if (passholder.cardSystemMemberships?.length > 1) {
    const cardSystem =
      passholder.cardSystemMemberships?.find(
        (card) =>
          card.status === "ACTIVE" && card.socialTariff?.status === "ACTIVE"
      ) ||
      passholder.cardSystemMemberships?.find(
        (card) => card.status === "ACTIVE"
      );

    if (cardSystem) {
      if (cardSystem.socialTariff) {
        return (
          <OpportunityStateCard status={cardSystem.socialTariff.status}>
            {passholder.cardSystemMemberships.map(
              (csm, i) =>
                csm.socialTariff && (
                  <Fragment key={csm.cardSystem.id}>
                    <p style={{ fontWeight: 700, fontSize: "11px", margin: 0 }}>
                      {t(
                        `saving.mobile.opportunityState.${csm.socialTariff.status?.toLowerCase()}.content`,
                        {
                          cardSystemName: csm.cardSystem.name,
                          socialTariffEndDate: dayjs(
                            csm.socialTariff?.endDate
                          ).format("DD/MM/YYYY"),
                          interpolation: { escapeValue: false },
                        }
                      )}
                    </p>
                    {csm.socialTariff?.inGracePeriod && (
                      <p
                        style={{ fontWeight: 700, fontSize: "11px", margin: 0 }}
                      >
                        {t(
                          `saving.mobile.opportunityState.${csm.socialTariff.status?.toLowerCase()}.gracePeriod`
                        )}
                      </p>
                    )}
                  </Fragment>
                )
            )}
          </OpportunityStateCard>
        );
      }
    }
  }

  return null;
};
