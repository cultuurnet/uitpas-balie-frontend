'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FC, PropsWithChildren } from 'react';
import { useConfig } from '@/shared/feature-config/context/useConfig';

export const LoginButton: FC<PropsWithChildren> = ({ children }) => {
  const search = useSearchParams();
  const { publicRuntimeConfig } = useConfig();
  const destination = search.get('redirectTo') ?? '/';
  const href = `${
    publicRuntimeConfig?.oauthPath ?? '/'
  }?destination=${destination}`;

  return (
    <Button asChild className="h-12 !text-white text-base hover:bg-[#1A2F60]">
      <a href={href}>{children}</a>
    </Button>
  );
};
