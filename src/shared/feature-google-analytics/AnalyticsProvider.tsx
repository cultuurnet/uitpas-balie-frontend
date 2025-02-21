"use client";

import { ReactNode, useEffect } from "react";
import { useConfig } from "../feature-config/context/useConfig";
import ReactGA from "react-ga4";
import { AnalyticsContext } from "./context/AnalyticsContext";
import { UaEventOptions } from "react-ga4/types/ga4";

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const { publicRuntimeConfig } = useConfig();
  const GA_MEASUREMENT_ID = publicRuntimeConfig?.gaTag;

  useEffect(() => {
    if (GA_MEASUREMENT_ID && typeof window !== "undefined") {
      ReactGA.initialize([
        {
          trackingId: GA_MEASUREMENT_ID,
        },
      ]);
    }
  }, [GA_MEASUREMENT_ID]);

  const trackEvent = (
    event: UaEventOptions | string,
    params?: Record<string, any>
  ) => {
    if (GA_MEASUREMENT_ID) {
      ReactGA.event(event, params);
    }
  };

  const trackPageView = (path: string, title?: string) => {
    if (GA_MEASUREMENT_ID) {
      ReactGA.send({ hitType: "pageview", page: path, title });
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackPageView }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
