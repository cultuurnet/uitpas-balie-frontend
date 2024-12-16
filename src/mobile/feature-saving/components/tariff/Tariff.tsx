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
import { useEffect } from "react";
import { useTranslation } from "@/shared/lib/utils/hooks";

type TariffProps = {
  passHolderName?: string;
  eventId: string;
  uitpasNumber: string;
  priceInfo: EventPriceInfo;
  ticketSaleMutation: (
    tariffId: string,
    regularPrice: number,
    count?: number
  ) => void;
  isDrawerOpen: boolean;
  isGroupPass?: boolean;
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
  isGroupPass,
}: TariffProps) => {
  const { t, LANG_KEY } = useTranslation();
  const theme = useTheme();

  const priceInfoFiltered = priceInfo.filter((price) => price.price !== 0);

  const { data, isLoading, refetch } = useQueries({
    queries: priceInfoFiltered.map((tariff) => ({
      ...getGetTariffsQueryOptions({
        eventId: getUuid(eventId)!,
        regularPrice: tariff.price,
        uitpasNumber,
      }),
      cacheTime: 0,
      staleTime: 0,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
        refetch: results.map((result) => result.refetch),
      };
    },
  });

  useEffect(() => {
    if (isDrawerOpen) {
      refetch.forEach((refetchItem) => {
        refetchItem();
      });
    }
  }, [isDrawerOpen, refetch]);

  const socialTariffs = [] as SortedType[];
  const coupons = [] as SortedType[];
  const invalidTariffs = [] as SortedType[];

  priceInfoFiltered.forEach((priceInfo, index) => {
    const tariffResponse = data[index]?.data;

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
            isGroupPass={isGroupPass}
            remainingDiscounts={tariff.tariff?.remaining}
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
