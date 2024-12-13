"use client";

import { useSearchParams } from "next/navigation";
import {
  type TicketSale,
  useGetPassholders,
  usePostTicketSales,
  usePostRewardsRedeemed,
  useGetGrouppasses,
} from "@/shared/lib/dataAccess";
import { MobileNavBar } from "@/mobile/layouts";
import {
  ActivitySwitcher,
  Button,
  MobileContentStack,
  OutlinedButton,
  UitpasLoading,
} from "@/mobile/lib/ui";
import {
  ScanFailed,
  TariffDrawer,
  RewardsDrawer,
} from "@/mobile/feature-saving";
import { Stack, Typography, Divider, useTheme } from "@mui/material";
import { useActivity } from "@/mobile/feature-activities/useActivity";
import { ElementRef, useEffect, useRef, useState } from "react";
import { ManualCardInput } from "@/mobile/feature-identification";
import { usePostCheckins } from "@/shared/lib/dataAccess/uitpas/generated/checkins/checkins";
import { getUuid } from "@/shared/lib/utils";
import { useTranslation } from "@/shared/lib/utils/hooks";
import { PassHolder } from "./PassHolder";
import { GroupPass } from "./GroupPass";

export const MobileSavingPage = () => {
  const { t, LANG_KEY } = useTranslation();
  const params = useSearchParams();
  const theme = useTheme();
  const uitpasNumber = params.get("uitpas") ?? undefined;
  const inszNumber = params.get("insz") ?? undefined;
  const { selectedActivity, navigateToScanner } = useActivity();
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
  const [isGroupPass, setIsGroupPass] = useState<boolean>(false);

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
    data: groupPassHolder,
    isLoading: isGroupPassLoading,
    isError: isGroupPassError,
  } = useGetGrouppasses(
    { uitpasNumber: uitpasNumber },
    {
      query: {
        enabled: isGroupPass && !!uitpasNumber,
      },
    }
  );

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
    navigateToScanner("replace", false);
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
    if (
      passHoldersData?.data?.member &&
      passHoldersData.data.member.length > 0
    ) {
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

  useEffect(() => {
    if (
      passHoldersData?.data.member &&
      passHoldersData.data.member.length === 0
    ) {
      setIsGroupPass(true);
    }
  }, [passHoldersData]);

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
      <MobileContentStack sx={{ height: "auto", mb: "12px" }}>
        <Typography variant="h1">
          {t("saving.mobile.chosenActivity")}
        </Typography>
        <ActivitySwitcher ref={activityRef} />

        {passHoldersData?.data.member?.[0] ? (
          <PassHolder
            passholder={passHoldersData?.data.member?.[0]}
            firstCardEntry={firstCardEntry}
            alertData={alertData}
          />
        ) : (
          groupPassHolder?.data.member?.[0] && (
            <GroupPass groupPass={groupPassHolder?.data.member?.[0]} />
          )
        )}

        <Stack rowGap="10px" sx={{ marginTop: "-10px" }}>
          {selectedActivity && (
            <OutlinedButton onClick={handleChooseTariffClick}>
              {t("saving.mobile.chooseTariffBtn")}
            </OutlinedButton>
          )}
          {!isGroupPass && (
            <OutlinedButton onClick={handleChooseBenefitClick}>
              {t("saving.mobile.tradeBenefitBtn")}
            </OutlinedButton>
          )}
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

        {/* TODO: remove !isGroupPass */}
        <ManualCardInput firstCardEntry={false} />
        {!isGroupPass &&
          selectedActivity &&
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

        {activityRef.current && passHoldersData?.data?.member && (
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
            passHolderPoints={passHoldersData.data.member[0].points ?? 0}
            rewardRedemptionMutation={handleRewardRedemption}
          />
        )}
      </MobileContentStack>
    </MobileNavBar>
  );
};
