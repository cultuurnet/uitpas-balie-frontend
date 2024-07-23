import { useCallback, useEffect, useState, useMemo } from "react";
import { storeData } from "../localStorageUtils";
import adapter from "webrtc-adapter";

type PermissionStateExtended = PermissionState | "unknown" | "not_supported";

type CameraHookReturn = {
  permission: PermissionStateExtended;
  setPermission: (permission: PermissionStateExtended) => void;
  videoDevices: MediaDeviceInfo[];
  currentVideoDevice: MediaDeviceInfo | undefined;
  frontBackCameraAvailable: () => boolean;
  toggleFrontBackCamera: () => void;
};

export const useCamera = (): CameraHookReturn => {
  const [permission, setPermission] =
    useState<PermissionStateExtended>("unknown");
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<
    MediaDeviceInfo | undefined
  >(undefined);

  const overridePermission = useCallback(
    (permission: PermissionStateExtended) => {
      setPermission(permission);
      if (permission === "not_supported") {
        storeData<boolean>("cameraSupport", false);
      }
    },
    []
  );

  const setCameraPosition = useCallback(
    (position: "front" | "back") => {
      if (navigator.userAgent.includes("Firefox")) {
        const index = position === "front" ? 0 : videoDevices.length - 1;
        setCurrentVideoDevice(videoDevices[index]);
      } else {
        const device =
          videoDevices.find((device) =>
            device.label.toLowerCase().includes(position)
          ) || videoDevices[videoDevices.length - 1];
        setCurrentVideoDevice(device);
      }
    },
    [videoDevices]
  );

  const toggleFrontBackCamera = useCallback(() => {
    if (navigator.userAgent.includes("Firefox")) {
      const currentIndex = videoDevices.findIndex(
        (device) => device.deviceId === currentVideoDevice?.deviceId
      );
      const nextPosition =
        currentIndex === videoDevices.length - 1 ? "front" : "back";
      setCameraPosition(nextPosition);
    } else {
      const nextPosition = currentVideoDevice?.label
        .toLowerCase()
        .includes("back")
        ? "front"
        : "back";
      setCameraPosition(nextPosition);
    }
  }, [videoDevices, currentVideoDevice, setCameraPosition]);

  const askForPermission = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        stream.getVideoTracks().forEach((track) => track.stop());
        setPermission("granted");
      })
      .catch((err) => {
        console.error("Could not determine camera permissions:", err);
        overridePermission("not_supported");
      });
  }, [overridePermission]);

  const checkPermission = useCallback(() => {
    if (navigator.permissions && !navigator.userAgent.includes("Firefox")) {
      navigator.permissions
        .query({ name: "camera" as PermissionName })
        .then((status) => {
          if (permission === "unknown") {
            setPermission(status.state);
          }
          status.addEventListener("change", () => {
            setPermission(status.state);
          });
        })
        .catch((err) => {
          console.error("Error accessing the camera:", err);
          overridePermission("not_supported");
        });
    } else {
      askForPermission();
    }
  }, [permission, overridePermission, askForPermission]);

  const updateVideoDevices = useCallback(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevicesLocal = devices.filter(
        (device) => device.kind === "videoinput"
      );
      if (videoDevicesLocal.length === 0) {
        console.error("No video devices found");
        overridePermission("not_supported");
        return;
      }
      setVideoDevices(videoDevicesLocal);
    });
  }, [overridePermission]);

  useEffect(() => {
    if (permission === "unknown" || permission === "prompt") {
      askForPermission();
      checkPermission();
    }

    if (permission === "granted") {
      updateVideoDevices();
    }

    const handleDeviceChange = () => {
      if (permission === "granted") {
        updateVideoDevices();
      }
    };

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      );
    };
  }, [permission, askForPermission, checkPermission, updateVideoDevices]);

  useEffect(() => {
    if (
      permission === "granted" &&
      !currentVideoDevice &&
      videoDevices.length > 0
    ) {
      setCameraPosition("back");
    }
  }, [permission, currentVideoDevice, videoDevices, setCameraPosition]);

  const frontBackCameraAvailable = useMemo(() => {
    if (videoDevices.length <= 1) return false;
    if (videoDevices.some((device) => !device.label)) return true;
    return (
      videoDevices.some((device) =>
        device.label.toLowerCase().includes("front")
      ) &&
      videoDevices.some((device) => device.label.toLowerCase().includes("back"))
    );
  }, [videoDevices]);

  return {
    permission,
    setPermission: overridePermission,
    videoDevices,
    currentVideoDevice,
    frontBackCameraAvailable: () => frontBackCameraAvailable,
    toggleFrontBackCamera,
  };
};
