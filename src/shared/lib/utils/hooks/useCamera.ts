import MediaDevices from "media-devices";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import uaParser from "ua-parser-js";
import { readData, storeData } from "../localStorageUtils";
import { useTranslation } from "@/shared/lib/i18n/client";
import adapter from "webrtc-adapter";

type Permission = "denied" | "granted" | "unknown" | "prompt";

type DetectedDevice = {
  id: string;
  label: string;
  canTorch: boolean;
};

type CameraType = "front" | "back";

type DeviceMap = {
  front?: DetectedDevice;
  back?: DetectedDevice;
};

type useCameraReturn = {
  permission: Permission;
  setPermission: Dispatch<SetStateAction<Permission>>;
  browserHasSupport: boolean;
  isLoading: boolean;
  selectedCamera?: DetectedDevice;
  setSelectedCamera: Dispatch<SetStateAction<DetectedDevice | undefined>>;
  cameraError?: string;
  detectedCameras?: DetectedDevice[];
};

export const useCamera = ({
  initializeCamera = true,
}: {
  initializeCamera?: boolean;
} = {}): useCameraReturn => {
  const { t } = useTranslation();
  const [permission, setPermission] = useState<Permission>("unknown");
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCamera, setSelectedCamera] = useState<
    DetectedDevice | undefined
  >(undefined);
  const [browser, setBrowser] = useState<string | undefined>(undefined);
  const [browserHasSupport, setBrowserHasSupport] = useState(false);
  const [detectedCameras, setDetectedCameras] = useState<
    DetectedDevice[] | undefined
  >(undefined);

  useEffect(() => {
    setBrowser(uaParser(navigator.userAgent).browser.name);
    setBrowserHasSupport(
      ((navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === "function") ??
        false) &&
        browser !== "Opera"
    );
    if (!initializeCamera) setIsLoading(false);
  }, [browser, initializeCamera]);

  const askForPermission = () => {
    MediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        stream.getVideoTracks().forEach((track) => {
          track.stop();
        });
        setPermission("granted");
      })
      .catch((err) => {
        // Firefox does not support navigator.permissions, so we need to handle the error here.
        // For other browsers, we can rely on checkPermissions() to update the permission state.
        if (browser === "Firefox" && err instanceof Error) {
          if (err.name === "NotAllowedError") {
            setPermission("denied");
            return;
          }
        }
      });
  };

  const checkPermissions = () => {
    if (!navigator.permissions) {
      console.warn("Browser does not support querying permissions");
      return;
    }

    // Firefox does not expose camera permissions through navigator.permissions
    if (browser !== "Firefox") {
      navigator.permissions
        .query({ name: "camera" as PermissionName })
        .then((status) => {
          setPermission(status.state);
          status.addEventListener("change", () => {
            setPermission(status.state);
          });
        })
        .catch((err) => {
          console.error("Could not read camera permissions:", err);
        });
    }
  };

  const getRawCamerasMap = async (retryCount = 0): Promise<void> => {
    const cachedMap = readData<DetectedDevice[]>("camerasRaw");

    if (cachedMap) {
      setDetectedCameras(cachedMap);
      setIsLoading(false);
      return;
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices.length === 0) {
        throw new Error("No video devices found on this device");
      }

      const detectedCamerasLocal: DetectedDevice[] = [];

      for (const device of videoDevices) {
        if (!device.deviceId) {
          console.warn("Device without deviceId found, skipping");
          continue;
        }

        try {
          const stream = await MediaDevices.getUserMedia({
            video: { deviceId: { exact: device.deviceId } },
          });

          const track = stream.getVideoTracks()[0];
          const settings = track.getSettings();
          const capabilities =
            typeof track.getCapabilities === "function"
              ? track.getCapabilities()
              : undefined;

          track.stop();

          const cameraType: CameraType =
            settings.facingMode === "user" ? "front" : "back";

          let canTorch = false;
          if (capabilities) {
            try {
              canTorch = "torch" in capabilities;
            } catch (e) {
              console.warn(`Error checking torch capability:`, e);
              canTorch = false;
            }
          }

          let cameraLabel = t(`camera.${cameraType}`);
          if (
            detectedCamerasLocal.findIndex((c) =>
              c.label.includes(t(`camera.${cameraType}`))
            ) !== -1
          ) {
            const amountOfCameras = detectedCamerasLocal.filter((c) =>
              c.label.includes(t(`camera.${cameraType}`))
            ).length;
            cameraLabel = `${t(`camera.${cameraType}`)} ${amountOfCameras + 1}`;
          }

          if (
            detectedCamerasLocal.findIndex((c) => c.id === device.deviceId) ===
            -1
          ) {
            detectedCamerasLocal.push({
              id: device.deviceId,
              label: cameraLabel,
              canTorch,
            });
          }

          storeData<DetectedDevice[]>("camerasRaw", detectedCamerasLocal);
          setDetectedCameras(detectedCamerasLocal);
        } catch (err) {
          console.error(`Failed to access device: ${device.deviceId}`, err);
        }
      }
    } catch (err) {
      console.error("Could not enumerate devices:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // skip checking permissions & determining cameras if browser does not support it or if we don't want to initialize the camera
    // in case we only wish to access the browserHasSupport state
    if (!browserHasSupport || !initializeCamera) return;

    askForPermission();
    checkPermissions();
    if (permission === "granted") {
      getRawCamerasMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- this is intentional, otherwise we would have infinite re-renders
  }, [browserHasSupport, initializeCamera, permission]);

  useEffect(() => {
    if (!selectedCamera && !isLoading) {
      if (!detectedCameras) return;

      if (detectedCameras.length > 0) {
        setSelectedCamera(
          detectedCameras.find((c) => c.canTorch) ||
            detectedCameras.find((c) => c.label.includes(t(`camera.back`))) ||
            detectedCameras[detectedCameras.length - 1]
        );
      }
    }
  }, [detectedCameras, isLoading, selectedCamera, t]);

  return {
    permission,
    setPermission,
    browserHasSupport,
    isLoading,
    selectedCamera,
    detectedCameras,
    setSelectedCamera,
  };
};
