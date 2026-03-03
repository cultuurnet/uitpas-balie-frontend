'use client';

import { useCallback, useSyncExternalStore } from 'react';
import {
  type FeatureFlagName,
  getFeatureFlagCookieValue,
  setFeatureFlagCookie,
} from '@/utils/featureFlags';

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

export { useFeatureFlag };
