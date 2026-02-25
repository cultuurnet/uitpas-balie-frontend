'use client';

import Image from 'next/image';
import { LoginButton } from '@/ui';
import { getAssetUrl } from '@/shared/lib/utils';
import { useTranslation } from '@/shared/lib/i18n/client';
import { useConfig } from '@/shared/feature-config/context/useConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';

export const LoginPage = () => {
  const { t } = useTranslation();
  const { publicRuntimeConfig } = useConfig();

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src={getAssetUrl('/images/png/terecht-met-uitpas.jpg')}
          alt="Hier kan je terecht met UiTPAS"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-lg px-12 py-16 flex flex-col">
          <Image
            src={getAssetUrl('/images/svg/logo-uitpas-green.svg')}
            alt="UiTPAS Logo"
            width={200}
            height={60}
            priority
          />

          <h1 className="text-3xl font-bold mt-8 mb-4">{t('login.title')}</h1>

          <p className="text-neutral-600 mb-6">{t('login.intro')}</p>

          <div className="mb-3">
            <LoginButton>{t('login.loginBtn')}</LoginButton>
          </div>

          <a
            href={publicRuntimeConfig?.loginHowToLoginUrl || '#'}
            className="text-primary underline mb-10"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('login.howToLogin')}
          </a>

          <div className="relative bg-[linear-gradient(135deg,#fafafa,#f5f5f5)] border border-neutral-400 rounded-lg overflow-hidden p-6 mb-4">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#3f2675]" />
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg shadow-md bg-white mb-4">
              <FontAwesomeIcon icon={faShieldHalved} className="text-primary text-2xl" />
            </div>
            <h2 className="font-bold text-xl mb-4">{t('login.twoFa.title')}</h2>
            <p className="mb-3">{t('login.twoFa.text1')}</p>
            <p className="mb-4">{t('login.twoFa.text2')}</p>
            <a
              href={publicRuntimeConfig?.login2faUrl || '#'}
              className="text-primary underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('login.twoFa.link')} &rarr;
            </a>
          </div>

          <div className="text-right">
            <a
              href={publicRuntimeConfig?.loginHowTo2faUrl || '#'}
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('login.twoFa.helpLink')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
