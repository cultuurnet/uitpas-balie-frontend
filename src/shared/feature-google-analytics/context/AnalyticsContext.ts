'use client';

import { createContext } from 'react';
import { UaEventOptions } from 'react-ga4/types/ga4';

interface AnalyticsContextType {
  trackEvent: (
    event: UaEventOptions | string,
    params?: Record<string, any>,
  ) => void;
  trackPageView: (path: string, title?: string) => void;
}

export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined,
);
