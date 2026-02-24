'use client';

import Image from 'next/image';
import { LoginButton } from '@/ui';
import { getAssetUrl } from '@/shared/lib/utils';
import { useTranslation } from '@/shared/lib/i18n/client';

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto pt-24 max-w-[500px]">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <Image
            src={getAssetUrl('/images/svg/logo-uitpas-full.svg')}
            alt={'UiTPAS Logo'}
            width={280}
            height={84}
            priority
            className="h-[84px] w-[280px]"
          />
          <p>{t('appName')}</p>
        </div>

        <p className="text-neutral-500 italic text-center my-10">
          {t('login.intro')}
        </p>

        <div className="text-center">
          <LoginButton>{t('login.loginBtn')}</LoginButton>
        </div>
      </div>
    </div>
  );
};
