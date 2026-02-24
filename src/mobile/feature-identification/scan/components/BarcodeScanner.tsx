'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Typography, UitpasLoading } from '@/mobile/lib/ui';
import { useTranslation } from '@/shared/lib/i18n/client';
import { FlashlightOn, FlashlightOff, Close } from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';
import { PermissionBox } from '@/mobile/feature-identification/scan/components/PermissionBox';
import { useCamera } from '@/shared/lib/utils/hooks/useCamera';
import { useActivity } from '@/mobile/feature-activities/useActivity';

export const BarcodeScanner: React.FC = () => {
  const { t } = useTranslation();
  const {
    browserHasSupport,
    permission,
    selectedCamera,
    setSelectedCamera,
    isLoading,
    detectedCameras,
  } = useCamera();
  const params = useSearchParams();
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanningRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [scannerReady, setScannerReady] = useState<boolean>(false);
  const [codeFound, setCodeFound] = useState<boolean>(false);
  const { navigateToIdentification, navigateToSaving } = useActivity();
  const navigateToSavingRef = useRef(navigateToSaving);
  navigateToSavingRef.current = navigateToSaving;
  const firstCardEntry = Boolean(params.get('firstCardEntry')) ?? false;

  const scannerSupported =
    browserHasSupport &&
    typeof window !== 'undefined' &&
    'BarcodeDetector' in window;

  const stopScanner = useCallback(() => {
    scanningRef.current = false;
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const handleFlashToggle = () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (track) {
      const newFlashState = !isFlashOn;
      track
        .applyConstraints({
          advanced: [{ torch: newFlashState }],
        } as unknown as MediaTrackConstraints)
        .catch(() => {});
      setIsFlashOn(newFlashState);
    }
  };

  const handleClose = () => {
    setScannerReady(false);
    navigateToIdentification();
  };

  const handleCameraChange = (e: SelectChangeEvent<string>) => {
    const device = detectedCameras?.find((cam) => cam.id === e.target.value);
    if (device) {
      setSelectedCamera(device);
    } else if (detectedCameras) {
      setSelectedCamera(
        detectedCameras.find((c) => c.canTorch) ||
          detectedCameras.find((c) => c.label.includes(t(`camera.back`))) ||
          detectedCameras[detectedCameras.length - 1]
      );
    }
  };

  useEffect(() => {
    if (
      permission !== 'granted' ||
      !selectedCamera ||
      !videoRef.current ||
      isLoading ||
      !scannerSupported
    )
      return;

    let cancelled = false;

    const startScanner = async () => {
      setScannerReady(false);

      // Polyfill: sets BarcodeDetector globally if not natively supported
      await import('barcode-detector/polyfill');

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: selectedCamera.id },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
      } catch (err) {
        console.error('Could not start camera:', err);
        return;
      }

      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      if (!videoRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      if (cancelled) return;

      setScannerReady(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const detector = new (window as any).BarcodeDetector({
        formats: ['code_128'],
      });

      scanningRef.current = true;
      const scan = async () => {
        if (!scanningRef.current || !videoRef.current) return;
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const barcodes: any[] = await detector.detect(videoRef.current);
          for (const barcode of barcodes) {
            if (barcode.rawValue?.length === 13) {
              setCodeFound(true);
              navigateToSavingRef.current(barcode.rawValue, firstCardEntry);
              return;
            }
          }
        } catch {
          // Detection error on this frame, continue scanning
        }
        if (scanningRef.current) {
          rafRef.current = requestAnimationFrame(scan);
        }
      };
      rafRef.current = requestAnimationFrame(scan);
    };

    startScanner();
    return () => {
      cancelled = true;
      stopScanner();
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
    };
  }, [
    permission,
    selectedCamera,
    isLoading,
    scannerSupported,
    firstCardEntry,
    stopScanner,
  ]);

  if (!scannerSupported && !isLoading)
    return <PermissionBox permission="not_supported" />;

  if (permission !== 'granted') {
    return <PermissionBox permission={permission} />;
  }

  return (
    <>
      {!scannerReady && (
        <UitpasLoading
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'white',
          }}
        />
      )}
      <Box
        sx={{
          position: 'relative',
          height: '100dvh',
          overflow: 'hidden',
        }}
      >
        <IconButton
          disableRipple
          size="large"
          sx={(theme) => ({
            position: 'absolute',
            color: theme.palette.neutral[0],
            left: '0%',
            zIndex: 20,
          })}
          onClick={handleClose}
        >
          <Close sx={{ fontSize: 30 }} />
        </IconButton>
        {selectedCamera &&
          selectedCamera?.id &&
          detectedCameras &&
          detectedCameras.length > 1 && (
            <Select
              size="small"
              disableUnderline={true}
              value={
                detectedCameras.find((cam) => cam.id === selectedCamera?.id)?.id
              }
              onChange={handleCameraChange}
              sx={(theme) => ({
                position: 'absolute',
                width: 'max-content',
                left: '50%',
                top: '1%',
                transform: 'translateX(-50%)',
                zIndex: 20,
                border: `1px solid ${theme.palette.neutral[0]}`,
                borderRadius: 0,
                backgroundColor: 'transparent',
                color: theme.palette.neutral[0],
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiSelect-icon': {
                  color: theme.palette.neutral[0],
                },
              })}
            >
              {detectedCameras.map((camera) => (
                <MenuItem value={camera.id} key={camera.label}>
                  {camera.label}
                </MenuItem>
              ))}
            </Select>
          )}
        {!selectedCamera?.canTorch ? null : (
          <IconButton
            disableRipple
            size="large"
            sx={(theme) => ({
              position: 'absolute',
              color: theme.palette.neutral[0],
              right: '0%',
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
        <video
          ref={videoRef}
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* bottom-right and top-left corner borders */}
        <Box
          sx={{
            position: 'absolute',
            top: '38%',
            left: '5%',
            right: '5%',
            bottom: '38%',
            boxShadow: '0 0 0 2000px rgba(0, 0, 0, 0.7)',
            pointerEvents: 'none',
            zIndex: 10,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              backgroundColor: 'transparent',
              border: `3px solid ${codeFound ? '#00ff00' : 'white'}`,
            },
            '&::before': {
              top: -2,
              left: -3,
              width: '20px',
              height: '20px',
              borderBottom: 'none',
              borderRight: 'none',
            },
            '&::after': {
              bottom: -2,
              right: -3,
              width: '20px',
              height: '20px',
              borderTop: 'none',
              borderLeft: 'none',
            },
          }}
        >
          {/* bottom-left and top-right corner borders */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                backgroundColor: 'transparent',
                border: `3px solid ${codeFound ? '#00ff00' : 'white'}`,
              },
              '&::before': {
                top: -2,
                right: -3,
                width: '20px',
                height: '20px',
                borderBottom: 'none',
                borderLeft: 'none',
              },
              '&::after': {
                bottom: -2,
                left: -3,
                width: '20px',
                height: '20px',
                borderTop: 'none',
                borderRight: 'none',
              },
            }}
          />
        </Box>
        <Typography
          variant="h1"
          sx={(theme) => ({
            position: 'absolute',
            top: '30%',
            width: '100%',
            textAlign: 'center',
            color: theme.palette.neutral[0],
            zIndex: 20,
          })}
        >
          {t('identification.mobile.scan.scanOverlay')}
        </Typography>
      </Box>
    </>
  );
};
