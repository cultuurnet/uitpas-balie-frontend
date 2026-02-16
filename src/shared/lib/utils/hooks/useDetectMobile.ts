'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useConfig } from '@/shared/feature-config/context/useConfig';

export const DEVICE = {
  mobile: 'mobile',
  web: 'web',
  pending: 'pending',
} as const;

export const useDetectMobile = () => {
  const { publicRuntimeConfig } = useConfig();
  const disableMobile = publicRuntimeConfig?.blacklist.includes('mobile');
  const path = usePathname();
  const { replace } = useRouter();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobilePath = path.startsWith('/mobile');

  const shouldRedirectToMobile = !isMobilePath && isMobileScreen;

  useEffect(() => {
    if (shouldRedirectToMobile && !disableMobile) {
      replace(`/mobile${path}`);
    }
  }, [
    path,
    isMobilePath,
    isMobileScreen,
    shouldRedirectToMobile,
    disableMobile,
    replace,
  ]);

  if (shouldRedirectToMobile) {
    return DEVICE.pending;
  }

  if (isMobilePath) {
    if (disableMobile) {
      return DEVICE.web;
    }
    return DEVICE.mobile;
  }
  return DEVICE.web;
};
