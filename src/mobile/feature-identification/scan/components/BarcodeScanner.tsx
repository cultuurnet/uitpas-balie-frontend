import { useCallback, useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Typography, UitpasLoading } from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";
import {
  FlashlightOn,
  FlashlightOff,
  Cameraswitch,
  Close,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { PermissionBox } from "@/mobile/feature-identification/scan/components/PermissionBox";
import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";
import { useCamera } from "@/shared/lib/utils/hooks/useCamera";

export const BarcodeScanner = () => {
  const { t } = useTranslation();
  const {
    permission,
    currentVideoDevice,
    frontBackCameraAvailable,
    toggleFrontBackCamera,
  } = useCamera();
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const router = useRouter();
  const scannerRef = useRef<HTMLDivElement>();
  const [scannerReady, setScannerReady] = useState<boolean>(false);
  const [torchSupported, setTorchSupported] = useState<boolean>(false);
  const [torchAvailable, setTorchAvailable] = useState<boolean>(false);

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
    router.push("/mobile/identification");
    setScannerReady(false);
  };

  const handleValidScan = (code: string) => {
    router.push(`/mobile/saving?uitpas=${code}`);
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
        handleValidScan(result.codeResult.code);
      }
    },
    [handleValidScan]
  );

  useEffect(() => {
    if (permission === "granted" && currentVideoDevice && scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              width: { ideal: 1080 },
              height: { ideal: 1920 },
              aspectRatio: { ideal: 9 / 16 },
              deviceId: currentVideoDevice.deviceId,
            },
            target: scannerRef.current,
          },
          locator: {
            patchSize: "medium",
            halfSample: true,
          },
          frequency: 30,
          decoder: {
            readers: ["code_128_reader"],
          },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error("Could not initialize barcode scanner:", err);
            return;
          }
          Quagga.start();
          setScannerReady(true);
          setTorchAvailable(() => {
            try {
              setTorchSupported(true);
              return (
                Quagga.CameraAccess.getActiveTrack()?.getCapabilities().torch ??
                false
              );
            } catch (err) {
              setTorchSupported(false);
              return false;
            }
          });
        }
      );

      Quagga.onDetected(handleResultErrorCheck);

      return () => {
        Quagga.stop();
      };
    }
  }, [permission, currentVideoDevice, scannerRef]);

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
              border: "3px solid white",
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
                border: "3px solid white",
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
