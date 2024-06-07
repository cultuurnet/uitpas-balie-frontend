import {
  getGetTariffsQueryOptions,
  TariffAvailibility,
} from "@/shared/lib/dataAccess";
import { getUuid } from "@/shared/lib/utils";
import { useTranslation } from "@/shared/lib/i18n/client";
import { useQueries } from "@tanstack/react-query";
import {
  CommonName,
  EventPriceInfo,
} from "@/lib/dataAccess/entry/generated/model";
import { EventName } from "@/shared/lib/dataAccess/search/generated/model";
import { TariffCard } from "@/mobile/feature-saving";
import { CircularProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

type TariffProps = {
  name?: string;
  eventId: string;
  uitpasNumber: string;
  priceInfo: EventPriceInfo;
  ticketSaleMutation: (tariffId: string, regularPrice: number) => void;
};

type SortedType = {
  name: CommonName | undefined;
  price: number;
  tariff: TariffAvailibility | undefined;
  tariffMessage?: string;
};

export const Tariff = ({
  name,
  uitpasNumber,
  eventId,
  priceInfo,
  ticketSaleMutation,
}: TariffProps) => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const LANG_KEY = i18n.language as keyof EventName;
  const theme = useTheme();

  const priceInfoFiltered = priceInfo.filter((price) => price.price !== 0);

  useEffect(() => {
    if (priceInfoFiltered.length === 0) setIsLoading(false);
  }, [priceInfoFiltered.length]);

  const data = useQueries({
    queries: priceInfoFiltered.map((tariff) => ({
      ...getGetTariffsQueryOptions({
        eventId: getUuid(eventId)!,
        regularPrice: tariff.price,
        uitpasNumber,
      }),
      cacheTime: 0,
      staleTime: 0,
      onSettled: () => setIsLoading(false),
    })),
  }).map((res) => res.data?.data);

  const socialTariffs = [] as SortedType[];
  const coupons = [] as SortedType[];
  const invalidTariffs = [] as SortedType[];

  priceInfoFiltered.forEach((priceInfo, index) => {
    const tariff = data[index];

    if (tariff?.available?.findIndex((t) => t.type === "SOCIALTARIFF") === -1) {
      socialTariffs.push({
        name: priceInfo.name,
        price: priceInfo.price,
        tariff: undefined,
        tariffMessage: tariff.endUserMessage?.[LANG_KEY],
      });
    }

    tariff?.available?.forEach((tariff) => {
      if (tariff.price === 0) return;
      const item = {
        name: priceInfo.name,
        price: priceInfo.price,
        tariff: tariff,
      };

      if (tariff.type === "SOCIALTARIFF") {
        socialTariffs.push(item);
      } else if (tariff.type === "COUPON") {
        coupons.push(item);
      }
    });
  });

  const sorted = [...invalidTariffs, ...socialTariffs, ...coupons];

  return isLoading ? (
    <CircularProgress sx={{ m: "auto auto" }} />
  ) : (
    <>
      {sorted.length > 0 ? (
        sorted.map((tariff, i) => (
          <TariffCard
            key={`${tariff.tariff?.id}-${tariff.name?.[LANG_KEY]}`}
            tariffId={tariff.tariff?.id}
            tariffName={tariff.name?.[LANG_KEY]}
            regularPrice={tariff.price}
            tariffType={
              tariff.tariff
                ? t(
                    `saving.mobile.tariff.card.${tariff.tariff?.type?.toLowerCase()}`
                  )
                : undefined
            }
            tariffMessage={tariff.tariffMessage}
            tariffPrice={tariff.tariff?.price}
            ticketSaleMutation={ticketSaleMutation}
          />
        ))
      ) : (
        <Typography variant="body2" sx={{ color: theme.palette.neutral[900] }}>
          {name
            ? t("saving.mobile.tariff.drawer.noTariffs", { name: name })
            : t("saving.mobile.tariff.drawer.noTariffsNoName")}
        </Typography>
      )}
    </>
  );
};
