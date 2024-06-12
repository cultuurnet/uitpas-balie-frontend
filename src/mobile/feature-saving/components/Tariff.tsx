import {
  getGetTariffsQueryOptions,
  TariffAvailibility,
} from "@/shared/lib/dataAccess";
import { getUuid } from "@/shared/lib/utils";
import { useQueries } from "@tanstack/react-query";
import {
  CommonName,
  EventPriceInfo,
} from "@/shared/lib/dataAccess/entry/generated/model";
import { TariffCard } from "@/mobile/feature-saving";
import { CircularProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "@/shared/lib/utils/hooks";

type TariffProps = {
  passHolderName?: string;
  eventId: string;
  uitpasNumber: string;
  priceInfo: EventPriceInfo;
  ticketSaleMutation: (tariffId: string, regularPrice: number) => void;
  isDrawerOpen: boolean;
};

type SortedType = {
  name: CommonName | undefined;
  price: number;
  tariff: TariffAvailibility | undefined;
  tariffMessage?: string;
};

export const Tariff = ({
  passHolderName,
  uitpasNumber,
  eventId,
  priceInfo,
  ticketSaleMutation,
  isDrawerOpen,
}: TariffProps) => {
  const { t, LANG_KEY } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();

  const priceInfoFiltered = priceInfo.filter((price) => price.price !== 0);

  const queryResults = useQueries({
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
  });

  useEffect(() => {
    if (priceInfoFiltered.length === 0) setIsLoading(false);
  }, [priceInfoFiltered.length]);

  useEffect(() => {
    if (isDrawerOpen) {
      queryResults.forEach((queryResult) => {
        if (queryResult.refetch) {
          queryResult.refetch();
        }
      });
    }
  }, [isDrawerOpen]);

  const data = queryResults.map((result) => result.data?.data);
  const socialTariffs = [] as SortedType[];
  const coupons = [] as SortedType[];
  const invalidTariffs = [] as SortedType[];

  priceInfoFiltered.forEach((priceInfo, index) => {
    const tariffResponse = data[index];

    if (
      tariffResponse?.available?.findIndex((t) => t.type === "SOCIALTARIFF") ===
      -1
    ) {
      socialTariffs.push({
        name: priceInfo.name,
        price: priceInfo.price,
        tariff: undefined,
        tariffMessage: tariffResponse.endUserMessage?.[LANG_KEY],
      });
    }

    tariffResponse?.available?.forEach((tariff) => {
      const item = {
        name: priceInfo.name,
        price: priceInfo.price,
        tariff: tariff,
      };

      if (tariff.type === "SOCIALTARIFF") {
        socialTariffs.push(item);
      } else if (tariff.type === "COUPON") {
        coupons.push({ ...item, tariffMessage: tariff.name });
      }
    });
  });

  const sorted = [...invalidTariffs, ...socialTariffs, ...coupons];

  return isLoading ? (
    <CircularProgress sx={{ m: "auto auto" }} />
  ) : (
    <>
      {sorted.length > 0 ? (
        sorted.map((tariff) => (
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
          {passHolderName
            ? t("saving.mobile.tariff.drawer.noTariffs", {
                name: passHolderName,
              })
            : t("saving.mobile.tariff.drawer.noTariffsNoName")}
        </Typography>
      )}
    </>
  );
};
