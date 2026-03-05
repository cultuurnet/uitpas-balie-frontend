'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FeatureFlags, useFeatureFlag } from '@/hooks/useFeatureFlag';
import { useConfig } from '@/shared/feature-config/context/useConfig';

const DEVICE = {
  mobile: 'mobile',
  web: 'web',
  pending: 'pending',
} as const;

const useDetectMobile = () => {
  const [cookieDisableMobile] = useFeatureFlag(
    FeatureFlags.DISABLE_MOBILE_REDIRECT,
  );
  const disabledMobileRoute = cookieDisableMobile;
  const path = usePathname();
  const { replace } = useRouter();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobilePath = path.startsWith('/mobile');

  const shouldRedirectToMobile = !isMobilePath && isMobileScreen;

  useEffect(() => {
    if (shouldRedirectToMobile && !disabledMobileRoute) {
      replace(`/mobile${path}`);
    }
  }, [path, shouldRedirectToMobile, disabledMobileRoute, replace]);

  if (shouldRedirectToMobile && !disabledMobileRoute) {
    return DEVICE.pending;
  }

  if (isMobilePath) {
    if (disabledMobileRoute) {
      return DEVICE.web;
    }
    return DEVICE.mobile;
  }
  return DEVICE.web;
};

export { DEVICE, useDetectMobile };
