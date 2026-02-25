'use client';

import i18next from 'i18next';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';
import translations from './locales/nl/common.json';

i18next.use(initReactI18next).init({
  resources: { nl: { common: translations } },
  lng: 'nl',
  defaultNS: 'common',
});

export function useTranslation() {
  return useTranslationOrg('common');
}
