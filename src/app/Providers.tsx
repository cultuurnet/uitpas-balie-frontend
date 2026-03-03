'use client';

import { PropsWithChildren, useEffect } from 'react';

import { MobileProviders } from '@/app/MobileProviders';
import { WebProviders } from '@/app/WebProviders';
import { useFeatureFlagDevTools } from '@/hooks/useFeatureFlag';
import { poppinsFont } from '@/mobile/lib/ui';
import { DEVICE, useDetectMobile } from '@/shared/lib/utils';
import { openSansFont } from '@/web/lib/ui';

function Providers({ children }: PropsWithChildren) {
  useFeatureFlagDevTools();
  const device = useDetectMobile();

  useEffect(() => {
    document.body.className =
      device === DEVICE.mobile
        ? [poppinsFont.variable, poppinsFont.className].join(' ')
        : [openSansFont.variable, openSansFont.className].join(' ');
  }, [device]);

  if (device === DEVICE.mobile)
    return <MobileProviders>{children}</MobileProviders>;
  if (device === DEVICE.web) return <WebProviders>{children}</WebProviders>;

  return null;
}

export { Providers };
