'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

const FeatureFlags = {
  DISABLE_MOBILE_REDIRECT: 'disable_mobile_redirect',
} as const;

type FeatureFlagName = (typeof FeatureFlags)[keyof typeof FeatureFlags];

const COOKIE_PREFIX = 'ff_';

const createCookieName = (flag: FeatureFlagName): string =>
  `${COOKIE_PREFIX}${flag}`;

const getFeatureFlagCookieValue = (flag: FeatureFlagName): boolean | null => {
  if (typeof document === 'undefined') return null;
  const name = createCookieName(flag);
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
};

const setFeatureFlagCookie = (flag: FeatureFlagName, value: boolean): void => {
  const name = createCookieName(flag);
  document.cookie = `${name}=${value}; path=/; SameSite=Lax`;
  window.dispatchEvent(new Event('featureflag:change'));
};

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener('featureflag:change', callback);
  return () => window.removeEventListener('featureflag:change', callback);
};

const useFeatureFlag = (
  flag: FeatureFlagName,
): readonly [boolean, (value: boolean) => void] => {
  const value = useSyncExternalStore(
    subscribe,
    () => getFeatureFlagCookieValue(flag) ?? false,
    () => false,
  );

  const set = useCallback(
    (newValue: boolean) => setFeatureFlagCookie(flag, newValue),
    [flag],
  );

  return [value, set];
};

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

export type { FeatureFlagName };
export { FeatureFlags, useFeatureFlag, useFeatureFlagDevTools };
