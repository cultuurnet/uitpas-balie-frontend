"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  type TicketSale,
  useGetPassholders,
  usePostTicketSales,
  usePostRewardsRedeemed,
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
  RewardsDrawer,
} from "@/mobile/feature-saving";
import { Stack, Typography, Divider, useTheme } from "@mui/material";
import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import { ElementRef, useEffect, useRef, useState } from "react";
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
  const [showTariffDrawer, setShowTariffDrawer] = useState<boolean>(false);
  const [showRewardsDrawer, setShowRewardsDrawer] = useState<boolean>(false);
  const activityRef = useRef<ElementRef<"div">>(null);
  const [prevUitpasNumber, setPrevUitpasNumber] = useState<string>("");
  const [firstCardEntry, setFirstCardEntry] = useState<boolean>(
    Boolean(params.get("firstCardEntry")) ?? false
  );
  const [alertData, setAlertData] = useState<
    | {
        alertType: "error" | "success";
        message?: string;
      }
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

  const { mutateAsync: postCheckin, status: checkinStatus } = usePostCheckins({
    mutation: {
      onSuccess: () => {
        setAlertData({
          alertType: "success",
          message: t("saving.mobile.pointSaved"),
        });
        refetchPassholders().catch(() => null);
      },
      onError: (error) =>
        setAlertData({
          alertType: "error",
          message:
            error.response?.data.endUserMessage &&
            error.response.data.endUserMessage[LANG_KEY],
        }),
    },
  });
  const isCheckinLoading = checkinStatus === "pending";

  const { mutate: postTicketSale, status: ticketSaleStatus } =
    usePostTicketSales({
      mutation: {
        onSuccess: (data) => {
          setFirstCardEntry(false);
          refetchPassholders().catch(() => null);
          setAlertData({
            alertType: "success",
            message: t("saving.mobile.tariff.discountRegistered", {
              price: data.data.at(0)?.tariff.price,
            }),
          });
        },
        onError: (error) =>
          setAlertData({
            alertType: "error",
            message:
              error.response?.data.endUserMessage &&
              error.response.data.endUserMessage[LANG_KEY],
          }),
      },
    });
  const isTicketSaleLoading = ticketSaleStatus === "pending";

  const { mutate: postRewardsRedeemed, status: rewardsStatus } =
    usePostRewardsRedeemed({
      mutation: {
        onSuccess: () => {
          setFirstCardEntry(false);
          setAlertData({
            alertType: "success",
            message: t("saving.mobile.reward.redeemed"),
          });
          refetchPassholders().catch(() => null);
        },
        onError: (error) =>
          setAlertData({
            alertType: "error",
            message:
              error.response?.data.endUserMessage &&
              error.response.data.endUserMessage[LANG_KEY],
          }),
      },
    });
  const isRewardsRedeemedLoading = rewardsStatus === "pending";

  const handleNextScanClick = () => {
    router.push("/mobile/identification/scan");
  };

  const handleChooseTariffClick = () => {
    setShowTariffDrawer(true);
  };

  const handleChooseBenefitClick = () => {
    setShowRewardsDrawer(true);
  };

  const handleTicketSaleMutation = (tariffId: string, regularPrice: number) => {
    if (!passHoldersData?.data?.member || !selectedActivity) return;

    const uitpasNumber =
      passHoldersData.data.member[0].uitpasNumber ??
      passHoldersData.data.member[0].cardSystemMemberships?.at(0)?.uitpasNumber;

    if (!uitpasNumber) return;

    postTicketSale({
      data: Array.of({
        eventId: getUuid(selectedActivity?.["@id"] ?? ""),
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

  if (
    isPassholdersLoading ||
    isCheckinLoading ||
    isTicketSaleLoading ||
    isRewardsRedeemedLoading
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
      <MobileContentStack sx={{ height: "auto", mb: "12px" }}>
        <Typography variant="h1">
          {t("saving.mobile.chosenActivity")}
        </Typography>
        <ActivitySwitcher ref={activityRef} />

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

            {alertData && (
              <Alert type={alertData.alertType} newAlert={!firstCardEntry}>
                {alertData.message}
              </Alert>
            )}
          </Stack>
        )}

        <Stack rowGap="10px" sx={{ marginTop: "-10px" }}>
          {selectedActivity && (
            <OutlinedButton onClick={handleChooseTariffClick}>
              {t("saving.mobile.chooseTariffBtn")}
            </OutlinedButton>
          )}
          <OutlinedButton onClick={handleChooseBenefitClick}>
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
              passHolderName={
                passHoldersData.data.member
                  ? `${passHoldersData.data.member[0].firstName} ${passHoldersData.data.member[0].name}`
                  : undefined
              }
              isOpen={showTariffDrawer}
              setIsOpen={setShowTariffDrawer}
              startPosition={activityRef.current.getBoundingClientRect().bottom}
              uitpasNumber={
                passHoldersData.data.member?.at(0)?.cardSystemMemberships?.at(0)
                  ?.uitpasNumber!
              }
              ticketSaleMutation={handleTicketSaleMutation}
            />
          )}

        {activityRef.current &&
          passHoldersData?.data?.member &&
          passHoldersData.data.member[0].points && (
            <RewardsDrawer
              isOpen={showRewardsDrawer}
              setIsOpen={setShowRewardsDrawer}
              startPosition={activityRef.current.getBoundingClientRect().bottom}
              passHolderId={passHoldersData.data.member[0].id}
              passHolderName={
                passHoldersData.data.member
                  ? `${passHoldersData.data.member[0].firstName} ${passHoldersData.data.member[0].name}`
                  : undefined
              }
              passHolderPoints={passHoldersData.data.member[0].points}
              rewardRedemptionMutation={handleRewardRedemption}
            />
          )}
      </MobileContentStack>
    </MobileNavBar>
  );
};
