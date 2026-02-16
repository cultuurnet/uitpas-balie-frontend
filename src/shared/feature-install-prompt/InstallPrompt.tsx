'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone || !isIOS) return null;

  return (
    <div>
      <h3>{t('install.title')}</h3>
      {/*<button>{t("install.subTitle")}</button>*/}
      <p>
        {t('install.instructioniOS1')}
        <span role="img" aria-label="share icon">
          {' '}
          ⎋{' '}
        </span>
        {t('install.instructioniOS2')}
        <span role="img" aria-label="plus icon">
          {' '}
          ➕{' '}
        </span>
        .
      </p>
    </div>
  );
}
