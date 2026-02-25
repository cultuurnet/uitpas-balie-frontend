'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/ui/shadcn/button';
import { FC, PropsWithChildren } from 'react';
import { useConfig } from '@/shared/feature-config/context/useConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const LoginButton: FC<PropsWithChildren> = ({ children }) => {
  const search = useSearchParams();
  const { publicRuntimeConfig } = useConfig();
  const destination = search.get('redirectTo') ?? '/';
  const href = `${
    publicRuntimeConfig?.oauthPath ?? '/'
  }?destination=${destination}`;

  return (
    <Button asChild className="h-12 !text-white text-base">
      <a href={href}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        {children}
      </a>
    </Button>
  );
};
