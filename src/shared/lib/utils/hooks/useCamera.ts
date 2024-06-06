import { useCallback, useEffect, useState } from "react";

type PermissionStateExtended = PermissionState | "unknown" | "not_supported";

export const useCamera = () => {
  const [permission, setPermission] =
    useState<PermissionStateExtended>("unknown");
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<
    MediaDeviceInfo | undefined
  >(undefined);

  const setCameraPosition = (position: "front" | "back") => {
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
  };

  const toggleFrontBackCamera = () => {
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
  };

  const askForPermission = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        setPermission("granted");
        stream.getVideoTracks().forEach((track) => track.stop());
      })
      .catch((err) => {
        console.error("Could not determine camera permissions:", err);
        setPermission("not_supported");
      });
  }, []);

  const checkPermission = useCallback(() => {
    if (navigator.permissions && !navigator.userAgent.includes("Firefox")) {
      navigator.permissions
        .query({
          name: "camera" as PermissionName,
        })
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
          setPermission("not_supported");
        });
    } else {
      askForPermission();
    }
  }, [permission, askForPermission]);

  useEffect(() => {
    if (permission === "unknown" || permission === "prompt") {
      askForPermission();
      checkPermission();
    }

    if (permission === "granted") {
      if (videoDevices.length === 0) {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          const videoDevicesLocal = devices.filter(
            (device) => device.kind === "videoinput"
          );

          if (videoDevicesLocal.length === 0) {
            setPermission("not_supported");
            return;
          }

          setVideoDevices(videoDevicesLocal);
        });
      }

      if (!currentVideoDevice && videoDevices.length > 0) {
        setCameraPosition("back");
      }
    }
  }, [permission, videoDevices]);

  const frontBackCameraAvailable = () => {
    if (videoDevices.length <= 1) return false;

    // Firefox does not provide labels for the camera devices
    // Assume that front/back camera is available since we do have multiple devices
    if (videoDevices.some((device) => !device.label)) {
      return true;
    }

    return (
      videoDevices.some((device) =>
        device.label.toLowerCase().includes("front")
      ) &&
      videoDevices.some((device) => device.label.toLowerCase().includes("back"))
    );
  };

  return {
    permission,
    videoDevices,
    currentVideoDevice,
    frontBackCameraAvailable,
    toggleFrontBackCamera,
  };
};
