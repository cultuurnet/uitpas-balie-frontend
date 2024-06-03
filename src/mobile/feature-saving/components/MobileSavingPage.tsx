"use client";

import { useTranslation } from "@/shared/lib/i18n/client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type TicketSale,
  useGetPassholders,
  usePostTicketSales,
} from "@/shared/lib/dataAccess";
import { EventName } from "@/shared/lib/dataAccess/search/generated/model";
import { MobileNavBar } from "@/mobile/layouts";
import {
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
import {
  IconButton,
  Stack,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { ManualCardInput } from "@/mobile/feature-identification";
import { formatUitpasNumber } from "@/shared/lib/utils/stringUtils";
import { usePostCheckins } from "@/shared/lib/dataAccess/uitpas/generated/checkins/checkins";
import { getUuid } from "@/shared/lib/utils";

export const MobileSavingPage = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useSearchParams();
  const uitpasNumber = params.get("uitpas");
  const inszNumber = params.get("insz");
  const { selectedActivity, setSelectedActivity } = useActivity();
  const [savedPoints, setSavedPoints] = useState<boolean>(false);
  const [showTariffModal, setShowTariffModal] = useState<boolean>(false);
  const activityRef = useRef<ElementRef<typeof Typography>>(null);
  const theme = useTheme();

  console.log({ selectedActivity });

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
    mutate: postCheckin,
    isLoading: isCheckinLoading,
    isError: isCheckinError,
    error: checkinError,
  } = usePostCheckins();

  const {
    mutate: postTicketSale,
    data: ticketSaleData,
    isLoading: isTicketSaleLoading,
    isError: isTicketSaleError,
    error: ticketSaleError,
  } = usePostTicketSales();

  const LANG_KEY = i18n.language as keyof EventName;

  const handleChangeActivityClick = () => {
    setSelectedActivity(null);
    router.push("/mobile/activities");
  };

  const handleNextScanClick = () => {
    router.push("/mobile/identification/scan");
  };

  const handleSavedPointsReset = () => {
    setSavedPoints(false);
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
    if (passHoldersData?.data?.member && !savedPoints) {
      const uitpasNumber = passHoldersData.data.member[0].uitpasNumber;
      const eventId = getUuid(selectedActivity?.["@id"] ?? "");

      if (!uitpasNumber || !eventId) return;

      postCheckin({
        data: {
          uitpasNumber,
          eventId,
        },
      });
      setSavedPoints(true);
      refetchPassholders().catch(() => null);
    }
  }, [
    passHoldersData?.data.member,
    postCheckin,
    refetchPassholders,
    savedPoints,
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
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            ref={activityRef}
            variant="h1"
            sx={{ color: theme.palette.neutral[900] }}
          >
            {selectedActivity
              ? selectedActivity.name[LANG_KEY]
              : t("saving.mobile.noActivity")}
          </Typography>
          <IconButton
            disableRipple
            onClick={handleChangeActivityClick}
            sx={{
              color: theme.palette.neutral[900],
              fontSize: 32,
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </IconButton>
        </Stack>

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
            {isTicketSaleError || ticketSaleData ? (
              <Alert type={isTicketSaleError ? "error" : "success"}>
                {isTicketSaleError
                  ? ticketSaleError?.response?.data.endUserMessage &&
                    ticketSaleError.response.data.endUserMessage[LANG_KEY]
                  : t("saving.mobile.tariff.discountRegistered", {
                      price: ticketSaleData?.data?.at(0)?.tariff.price,
                    })}
              </Alert>
            ) : (
              <Alert type={isCheckinError ? "error" : "success"}>
                {isCheckinError
                  ? checkinError?.response?.data.endUserMessage &&
                    checkinError.response.data.endUserMessage[LANG_KEY]
                  : t("saving.mobile.pointSaved")}
              </Alert>
            )}
          </Stack>
        )}

        <Stack rowGap="10px" sx={{ marginTop: "-10px" }}>
          <OutlinedButton
            onClick={handleChooseTariffClick}
            disabled={selectedActivity === null}
          >
            {t("saving.mobile.chooseTariffBtn")}
          </OutlinedButton>
          <OutlinedButton
            onClick={() => console.log("TODO")}
            disabled={selectedActivity === null}
          >
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

        <ManualCardInput resetSavedPoints={handleSavedPointsReset} />
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
