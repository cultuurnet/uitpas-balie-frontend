"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  type TicketSale,
  useGetPassholders,
  usePostTicketSales,
} from "@/shared/lib/dataAccess";
import { MobileNavBar } from "@/mobile/layouts";
import {
  ActivitySwitcher,
  Alert,
  Button,
  MobileContentStack,
  OutlinedButton,
  UitpasLoading,
} from "@/mobile/lib/ui";
import {
  ScanFailed,
  OpportunityState,
  TariffDrawer,
} from "@/mobile/feature-saving";
import { Stack, Typography, Divider, useTheme } from "@mui/material";
import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { ManualCardInput } from "@/mobile/feature-identification";
import { formatUitpasNumber } from "@/shared/lib/utils/stringUtils";
import { usePostCheckins } from "@/shared/lib/dataAccess/uitpas/generated/checkins/checkins";
import { getUuid } from "@/shared/lib/utils";
import { useTranslation } from "@/shared/lib/utils/hooks";

export const MobileSavingPage = () => {
  const { t, LANG_KEY } = useTranslation();
  const router = useRouter();
  const params = useSearchParams();
  const theme = useTheme();
  const uitpasNumber = params.get("uitpas");
  const inszNumber = params.get("insz");
  const { selectedActivity } = useActivity();
  const [showTariffModal, setShowTariffModal] = useState<boolean>(false);
  const activityRef = useRef<ElementRef<typeof Typography>>(null);
  const [prevUitpasNumber, setPrevUitpasNumber] = useState<string>("");
  const [firstCardEntry, setFirstCardEntry] = useState<boolean>(
    Boolean(params.get("firstCardEntry")) ?? false
  );

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

  const {
    mutateAsync: postCheckin,
    isLoading: isCheckinLoading,
    isError: isCheckinError,
    error: checkinError,
  } = usePostCheckins({
    mutation: {
      onSuccess: () => refetchPassholders().catch(() => null),
    },
  });

  const {
    mutate: postTicketSale,
    data: ticketSaleData,
    isLoading: isTicketSaleLoading,
    isError: isTicketSaleError,
    error: ticketSaleError,
  } = usePostTicketSales({
    mutation: {
      onSuccess: () => {
        setFirstCardEntry(false);
        refetchPassholders().catch(() => null);
      },
    },
  });

  const handleNextScanClick = () => {
    router.push("/mobile/identification/scan");
  };

  const handleChooseTariffClick = () => {
    setShowTariffModal(true);
  };

  const handleTicketSaleMutation = (tariffId: string, regularPrice: number) => {
    if (!passHoldersData?.data?.member || !selectedActivity) return;

    postTicketSale({
      data: Array.of({
        eventId: getUuid(selectedActivity?.["@id"] ?? ""),
        tariff: {
          id: tariffId,
        },
        regularPrice,
        uitpasNumber: passHoldersData?.data?.member
          ?.at(0)
          ?.cardSystemMemberships?.at(0)?.uitpasNumber,
      }) as TicketSale[],
    });
  };

  useEffect(() => {
    if (passHoldersData?.data?.member) {
      const uitpasNumber =
        passHoldersData.data.member[0].uitpasNumber ??
        passHoldersData.data.member[0].cardSystemMemberships?.at(0)
          ?.uitpasNumber;
      const eventId = getUuid(selectedActivity?.["@id"] ?? "");

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

  if (isPassholdersLoading || isCheckinLoading || isTicketSaleLoading)
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
      <MobileContentStack sx={{ height: "auto", mb: "12px" }}>
        <Typography variant="h1">
          {t("saving.mobile.chosenActivity")}
        </Typography>
        <ActivitySwitcher />

        {passHoldersData?.data.member?.[0] && (
          <Stack sx={{ rowGap: "10px" }}>
            <Stack
              sx={{
                flexDirection: "row",
                columnGap: "5px",
                alignItems: "center",
              }}
            >
              <Typography variant="h1">
                {t("saving.mobile.passholder")}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.brand[800],
                  fontSize: "13px",
                }}
              >
                {formatUitpasNumber(
                  passHoldersData.data.member
                    .at(0)
                    ?.cardSystemMemberships?.at(0)?.uitpasNumber
                )}
              </Typography>
            </Stack>

            <Stack sx={{ rowGap: "4px" }}>
              <Typography
                variant="h1"
                sx={{ color: theme.palette.neutral[900] }}
              >
                {t("saving.mobile.namePointsTxt", {
                  firstName: passHoldersData.data.member[0].firstName,
                  lastName: passHoldersData.data.member[0].name,
                  points: passHoldersData.data.member[0].points,
                })}
              </Typography>
              <OpportunityState passholder={passHoldersData.data.member[0]} />
            </Stack>
            {selectedActivity && (
              <>
                {(isTicketSaleError || ticketSaleData) && (
                  <Alert
                    type={isTicketSaleError ? "error" : "success"}
                    newAlert={!firstCardEntry}
                  >
                    {isTicketSaleError
                      ? ticketSaleError?.response?.data.endUserMessage?.[
                          LANG_KEY
                        ]
                      : t("saving.mobile.tariff.discountRegistered", {
                          price: ticketSaleData?.data?.[0]?.tariff.price,
                        })}
                  </Alert>
                )}
                {!(isTicketSaleError || ticketSaleData) && (
                  <Alert
                    type={isCheckinError ? "error" : "success"}
                    newAlert={!firstCardEntry}
                  >
                    {isCheckinError
                      ? checkinError?.response?.data.endUserMessage?.[LANG_KEY]
                      : t("saving.mobile.pointSaved")}
                  </Alert>
                )}
              </>
            )}
          </Stack>
        )}

        <Stack rowGap="10px" sx={{ marginTop: "-10px" }}>
          {selectedActivity && (
            <OutlinedButton onClick={handleChooseTariffClick}>
              {t("saving.mobile.chooseTariffBtn")}
            </OutlinedButton>
          )}
          <OutlinedButton onClick={() => console.log("TODO")}>
            {t("saving.mobile.tradeBenefitBtn")}
          </OutlinedButton>
        </Stack>

        {/*-16 comes from the padding that's already in the stack*/}
        <Divider sx={{ margin: "0 -16px" }} />
        <Button onClick={handleNextScanClick}>
          {t("saving.mobile.scanNextBtn")}
        </Button>
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.neutral[900],
            textAlign: "center",
          }}
        >
          {t("saving.mobile.or")}
        </Typography>

        <ManualCardInput firstCardEntry={false} />
        {selectedActivity &&
          selectedActivity["@id"] &&
          passHoldersData?.data?.member &&
          activityRef.current && (
            <TariffDrawer
              eventId={selectedActivity["@id"]}
              name={
                passHoldersData.data.member
                  ? `${passHoldersData.data.member[0].firstName} ${passHoldersData.data.member[0].name}`
                  : undefined
              }
              isOpen={showTariffModal}
              setIsOpen={setShowTariffModal}
              startPosition={activityRef.current.getBoundingClientRect().bottom}
              uitpasNumber={
                passHoldersData.data.member?.at(0)?.cardSystemMemberships?.at(0)
                  ?.uitpasNumber!
              }
              ticketSaleMutation={handleTicketSaleMutation}
            />
          )}
      </MobileContentStack>
    </MobileNavBar>
  );
};
