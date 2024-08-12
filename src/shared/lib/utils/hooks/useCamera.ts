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
import adapter from "webrtc-adapter";

type Permission = "denied" | "granted" | "unknown" | "prompt";

type DetectedDevice = {
  id: string;
  label: string;
  canTorch: boolean;
};

type DeviceMap = {
  front?: DetectedDevice;
  back?: DetectedDevice;
};

type CameraType = "front" | "back";

type DetectedCamera = {
  type: CameraType;
  payload: DetectedDevice;
};

type useCameraReturn = {
  permission: Permission;
  setPermission: Dispatch<SetStateAction<Permission>>;
  browserHasSupport: boolean;
  isLoading: boolean;
  hasFrontAndBackCamera: boolean;
  selectedCamera?: DetectedDevice;
  cameraError?: string;
  toggleCamera: () => void;
};

const MAX_RETRY_ATTEMPTS = 3; // Max number of times to retry getting camera information
const RETRY_DELAY = 1000; // Delay between attempts in ms

export const useCamera = ({
  initializeCamera = true,
}: {
  initializeCamera?: boolean;
} = {}): useCameraReturn => {
  const [permission, setPermission] = useState<Permission>("unknown");
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCamera, setSelectedCamera] = useState<
    DetectedDevice | undefined
  >(undefined);
  const [browser, setBrowser] = useState<string | undefined>(undefined);
  const [browserHasSupport, setBrowserHasSupport] = useState(false);
  const [detectedCameras, setDetectedCameras] = useReducer(
    (
      state: DeviceMap,
      action: {
        type: CameraType;
        payload: DetectedDevice;
      }
    ) => ({
      ...state,
      [action.type]: action.payload,
    }),
    {} as DeviceMap
  );

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

  const toggleCamera = () => {
    if (selectedCamera === detectedCameras.back) {
      setSelectedCamera(detectedCameras.front);
    } else if (selectedCamera === detectedCameras.front) {
      setSelectedCamera(detectedCameras.back);
    }
  };

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

  const getCameraIdMap = async (retryCount = 0): Promise<void> => {
    // First, check if we have cached camera information
    const cachedFront = readData<DetectedDevice>("frontCamera");
    const cachedBack = readData<DetectedDevice>("backCamera");

    if (cachedFront && cachedBack) {
      setDetectedCameras({ type: "front", payload: cachedFront });
      setDetectedCameras({ type: "back", payload: cachedBack });
      setIsLoading(false);
      return;
    }

    try {
      const devices = await MediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices.length === 0) {
        throw new Error("No video devices found on this device");
      }

      const detectedCamerasLocal: DetectedCamera[] = [];

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

          // When looking for a back camera, it's preferable to find a device that supports torch,
          // but if by the last attempt we still don't find such a device, we will fall back to the first back camera that is found.
          if (
            cameraType === "back" &&
            capabilities &&
            !canTorch &&
            retryCount < MAX_RETRY_ATTEMPTS
          ) {
            continue;
          }

          if (!detectedCamerasLocal.find((c) => c.type === cameraType)) {
            const cameraInfo = {
              type: cameraType,
              payload: {
                id: device.deviceId,
                label:
                  device.label || `Camera ${detectedCamerasLocal.length + 1}`,
                canTorch,
              },
            };
            detectedCamerasLocal.push(cameraInfo);

            setDetectedCameras(cameraInfo);
            storeData<DetectedDevice>(
              `${cameraType}Camera`,
              cameraInfo.payload
            );
          }
        } catch (err) {
          console.error(`Failed to access device: ${device.deviceId}`, err);
        }
      }

      if (detectedCamerasLocal.length === 0) {
        throw new Error("Unable to access any camera");
      }

      const hasFront = detectedCamerasLocal.some(
        (camera) => camera.type === "front"
      );
      const hasBack = detectedCamerasLocal.some(
        (camera) => camera.type === "back"
      );

      if (!hasFront || !hasBack) {
        if (retryCount < MAX_RETRY_ATTEMPTS) {
          setTimeout(() => getCameraIdMap(retryCount + 1), RETRY_DELAY);
        } else {
          setBrowserHasSupport(false);
        }
      }
    } catch (err) {
      console.error("Could not detect camera devices:", err);
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        setTimeout(() => getCameraIdMap(retryCount + 1), RETRY_DELAY);
      } else {
        setBrowserHasSupport(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const hasFrontAndBackCamera = useMemo(
    () => Boolean(detectedCameras.front && detectedCameras.back),
    [detectedCameras]
  );

  useEffect(() => {
    // skip checking permissions & determining cameras if browser does not support it or if we don't want to initialize the camera
    // in case we only wish to access the browserHasSupport state
    if (!browserHasSupport || !initializeCamera) return;

    askForPermission();
    checkPermissions();
    if (permission === "granted") {
      getCameraIdMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- this is intentional, otherwise we would have infinite re-renders
  }, [browserHasSupport, initializeCamera, permission]);

  useEffect(() => {
    if (!selectedCamera && !isLoading) {
      if (!detectedCameras.back && !detectedCameras.front) return;

      if (detectedCameras.back) {
        setSelectedCamera(detectedCameras.back);
      }
    }
  }, [detectedCameras, isLoading, selectedCamera]);

  return {
    permission,
    setPermission,
    browserHasSupport,
    isLoading,
    hasFrontAndBackCamera,
    selectedCamera,
    toggleCamera,
  };
};
