'use client';

import { useEffect } from 'react';
import {
  FeatureFlags,
  type FeatureFlagName,
  getFeatureFlagCookieValue,
  setFeatureFlagCookie,
} from '@/utils/featureFlags';

declare global {
  interface Window {
    FeatureFlags: typeof FeatureFlags;
    setFeatureFlag: (flag: FeatureFlagName, value: boolean) => void;
    getCurrentFeatureFlagConfiguration: () => void;
  }
}

const useFeatureFlagDevTools = () => {
  useEffect(() => {
    window.FeatureFlags = FeatureFlags;

    window.setFeatureFlag = (flag, value) => {
      setFeatureFlagCookie(flag, value);
      window.getCurrentFeatureFlagConfiguration();
    };

    window.getCurrentFeatureFlagConfiguration = () => {
      console.table(
        Object.entries(FeatureFlags).reduce(
          (acc, [constant, flag]) => {
            const value = getFeatureFlagCookieValue(flag);
            return {
              ...acc,
              [`FeatureFlags.${constant}`]: {
                enabled: value === true ? `✅` : '🚫',
              },
            };
          },
          {} as Record<string, { enabled: string }>,
        ),
      );
    };
  }, []);
};

export { useFeatureFlagDevTools };
