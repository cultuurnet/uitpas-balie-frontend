'use client';

import {
  faArrowRight,
  faArrowRightFromBracket,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

import { useConfig } from '@/shared/feature-config/context/useConfig';
import { useTranslation } from '@/shared/lib/i18n/client';
import { getAssetUrl } from '@/shared/lib/utils';
import { Button, Card, CardContent, CardTitle, Link } from '@/ui';

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

      <div className="w-full md:w-1/2 flex items-end">
        <div className="w-full max-w-2xl mx-auto px-16 py-16 flex flex-col">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <Image
              src={getAssetUrl('/images/svg/logo-uitpas-green.svg')}
              alt="UiTPAS Logo"
              width={200}
              height={60}
              priority
            />

            <h1 className="text-2xl mt-8 mb-4">{t('login.title')}</h1>

            <p className="mb-6">{t('login.intro')}</p>

            <div className="mb-3">
              <Button
                className="h-12 text-xl"
                onClick={() => signIn('keycloak')}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                {t('login.loginBtn')}
              </Button>
            </div>

            <Link
              href={publicRuntimeConfig?.loginHowToLoginUrl || '#'}
              className="mb-10"
            >
              {t('login.howToLogin')}
            </Link>
          </div>

          <Card
            accentColor="var(--color-secondary)"
            background="gradient"
            className="border-neutral-400 mb-4"
          >
            <CardContent className="flex flex-col">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg shadow-md bg-white mb-4">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="text-secondary text-2xl"
                />
              </div>
              <CardTitle className="text-xl font-bold mb-4">
                {t('login.twoFa.title')}
              </CardTitle>
              <p className="mb-3">{t('login.twoFa.text1')}</p>
              <p className="mb-4">{t('login.twoFa.text2')}</p>
              <Link
                href={publicRuntimeConfig?.login2faUrl || '#'}
                variant="primary"
                icon={<FontAwesomeIcon icon={faArrowRight} />}
              >
                {t('login.twoFa.link')}
              </Link>
            </CardContent>
          </Card>

          <div className="text-right">
            <Link href={publicRuntimeConfig?.loginHowTo2faUrl || '#'}>
              {t('login.twoFa.helpLink')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
