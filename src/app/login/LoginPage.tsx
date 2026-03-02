'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowRightFromBracket,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

import { Button, Card, CardContent, CardTitle, Link } from '@/ui';
import { useConfig } from '@/shared/feature-config/context/useConfig';
import { getAssetUrl } from '@/shared/lib/utils';
import { useTranslation } from '@/shared/lib/i18n/client';

export const LoginPage = () => {
  const { t } = useTranslation();
  const { publicRuntimeConfig } = useConfig();
  const search = useSearchParams();
  const destination = search.get('redirectTo') ?? '/';
  const loginHref = `${publicRuntimeConfig?.oauthPath ?? '/'}?destination=${destination}`;

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
        <div className="w-full max-w-2xl px-16 py-16 flex flex-col">
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
            <Button asChild className="h-12 text-xl">
              <a href={loginHref}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                {t('login.loginBtn')}
              </a>
            </Button>
          </div>

          <Link
            href={publicRuntimeConfig?.loginHowToLoginUrl || '#'}
            className="mb-10"
          >
            {t('login.howToLogin')}
          </Link>

          <Card
            accentColor="#3f2675"
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
