import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Typography, UitpasLoading } from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";
import {
  FlashlightOn,
  FlashlightOff,
  Cameraswitch,
  Close,
} from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import { PermissionBox } from "@/mobile/feature-identification/scan/components/PermissionBox";
import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";
import { useCamera } from "@/shared/lib/utils/hooks/useCamera";
import adapter from "webrtc-adapter";

export const BarcodeScanner: React.FC = () => {
  const { t } = useTranslation();
  const {
    permission,
    setPermission,
    currentVideoDevice,
    frontBackCameraAvailable,
    toggleFrontBackCamera,
  } = useCamera();
  const params = useSearchParams();
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const router = useRouter();
  const scannerRef = useRef<HTMLDivElement>(null);
  const [scannerReady, setScannerReady] = useState<boolean>(false);
  const [torchSupported, setTorchSupported] = useState<boolean>(false);
  const [torchAvailable, setTorchAvailable] = useState<boolean>(false);
  const [codeFound, setCodeFound] = useState<boolean>(false);
  const firstCardEntry = Boolean(params.get("firstCardEntry")) ?? false;

  const handleFlashToggle = () => {
    setIsFlashOn((flashWasOn) => {
      if (flashWasOn) {
        Quagga.CameraAccess.disableTorch();
      } else {
        Quagga.CameraAccess.enableTorch();
      }
      return !flashWasOn;
    });
  };

  const handleClose = () => {
    setScannerReady(false);
    router.push("/mobile/identification");
  };

  const handleFlipCamera = () => {
    toggleFrontBackCamera();
  };

  const handleResultErrorCheck = useCallback(
    (result: QuaggaJSResultObject) => {
      const errors = result.codeResult.decodedCodes
        .flatMap((x) => x.error)
        .filter((x): x is number => x !== undefined)
        .sort((a, b) => a - b);

      const mid = Math.floor(errors.length / 2);
      const err =
        errors.length % 2 === 0
          ? (errors[mid - 1] + errors[mid]) / 2
          : errors[mid];

      // 90% confidence that the scan is correct
      if (
        err < 0.1 &&
        result.codeResult.code &&
        result.codeResult.code.length === 13
      ) {
        setCodeFound(true);
        router.push(
          `/mobile/saving?uitpas=${result.codeResult.code}${
            firstCardEntry ? "&firstCardEntry=true" : ""
          }`
        );
      }
    },
    [firstCardEntry, router]
  );

  useEffect(() => {
    if (permission === "granted" && currentVideoDevice && scannerRef.current) {
      const initWithDelay = (attempt = 1) => {
        setTimeout(() => {
          Quagga.init(
            {
              inputStream: {
                constraints: {
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                  deviceId: currentVideoDevice.deviceId,
                },
                area: {
                  top: "38%",
                  right: "5%",
                  left: "5%",
                  bottom: "38%",
                },
                // I'm already checking if scannerRef.current is defined in the if statement above
                target: scannerRef.current!,
              },
              locator: {
                patchSize: "medium",
                halfSample: true,
              },
              numOfWorkers: 4,
              decoder: {
                readers: ["code_128_reader"],
                multiple: false,
              },
              locate: false,
              frequency: 15,
            },
            (err: any) => {
              if (err) {
                console.error(
                  `(#${attempt}) Could not initialize barcode scanner:`,
                  err
                );
                if (attempt <= 5) {
                  initWithDelay(attempt + 1);
                  return;
                }
                setPermission("not_supported");
                return;
              }
              Quagga.start();
              setScannerReady(true);
              checkTorchAvailability();
            }
          );

          Quagga.onDetected(handleResultErrorCheck);
        }, 1000);
      };

      initWithDelay();

      return () => {
        Quagga.offDetected();
        Quagga.stop();
      };
    }
  }, [
    permission,
    currentVideoDevice,
    scannerRef,
    handleResultErrorCheck,
    setPermission,
  ]);

  const checkTorchAvailability = () => {
    try {
      const track = Quagga.CameraAccess.getActiveTrack();
      if (track && typeof track.getCapabilities === "function") {
        const capabilities = track.getCapabilities();
        setTorchSupported("torch" in capabilities);
        setTorchAvailable(capabilities.torch ?? false);
      } else {
        setTorchSupported(false);
        setTorchAvailable(false);
      }
    } catch (err) {
      console.error("Error checking torch availability:", err);
      setTorchSupported(false);
      setTorchAvailable(false);
    }
  };

  if (permission !== "granted") {
    return <PermissionBox permission={permission} />;
  }

  return (
    <>
      <UitpasLoading
        sx={{ ...(scannerReady && { display: "none !important" }) }}
      />
      <Box
        sx={{
          position: "relative",
          height: "100dvh",
          overflow: "hidden",
          ...(!scannerReady && { display: "none" }),
        }}
      >
        <IconButton
          disableRipple
          size="large"
          sx={(theme) => ({
            position: "absolute",
            color: theme.palette.neutral[0],
            left: "0%",
            zIndex: 20,
          })}
          onClick={handleClose}
        >
          <Close sx={{ fontSize: 30 }} />
        </IconButton>
        {!torchSupported ? null : (
          <IconButton
            disableRipple
            disabled={!torchAvailable}
            size="large"
            sx={(theme) => ({
              position: "absolute",
              color: theme.palette.neutral[0],
              right: "0%",
              zIndex: 20,
            })}
            onClick={handleFlashToggle}
          >
            {isFlashOn ? (
              <FlashlightOn sx={{ fontSize: 30 }} />
            ) : (
              <FlashlightOff sx={{ fontSize: 30 }} />
            )}
          </IconButton>
        )}
        {frontBackCameraAvailable() && (
          <IconButton
            disableRipple
            size="large"
            sx={(theme) => ({
              position: "absolute",
              color: theme.palette.neutral[0],
              right: !torchSupported ? "0%" : "15%",
              zIndex: 20,
            })}
            onClick={handleFlipCamera}
          >
            <Cameraswitch sx={{ fontSize: 30 }} />
          </IconButton>
        )}
        <Box
          ref={scannerRef}
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            video: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
            canvas: {
              display: "none",
            },
          }}
        />
        {/* bottom-right and top-left corner borders */}
        <Box
          sx={{
            position: "absolute",
            top: "38%",
            left: "5%",
            right: "5%",
            bottom: "38%",
            boxShadow: "0 0 0 2000px rgba(0, 0, 0, 0.7)",
            pointerEvents: "none",
            zIndex: 10,
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              backgroundColor: "transparent",
              border: `3px solid ${codeFound ? "#00ff00" : "white"}`,
            },
            "&::before": {
              top: -2,
              left: -3,
              width: "20px",
              height: "20px",
              borderBottom: "none",
              borderRight: "none",
            },
            "&::after": {
              bottom: -2,
              right: -3,
              width: "20px",
              height: "20px",
              borderTop: "none",
              borderLeft: "none",
            },
          }}
        >
          {/* bottom-left and top-right corner borders */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                backgroundColor: "transparent",
                border: `3px solid ${codeFound ? "#00ff00" : "white"}`,
              },
              "&::before": {
                top: -2,
                right: -3,
                width: "20px",
                height: "20px",
                borderBottom: "none",
                borderLeft: "none",
              },
              "&::after": {
                bottom: -2,
                left: -3,
                width: "20px",
                height: "20px",
                borderTop: "none",
                borderRight: "none",
              },
            }}
          />
        </Box>
        <Typography
          variant="h1"
          sx={(theme) => ({
            position: "absolute",
            top: "30%",
            width: "100%",
            textAlign: "center",
            color: theme.palette.neutral[0],
            zIndex: 20,
          })}
        >
          {t("identification.mobile.scan.scanOverlay")}
        </Typography>
      </Box>
    </>
  );
};
