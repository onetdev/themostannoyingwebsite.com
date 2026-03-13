'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { z } from 'zod/mini';

const LOCALE_ZOD_MODULES = {
  ar: () => import('zod/v4/locales/ar.js'),
  de: () => import('zod/v4/locales/de.js'),
  en: () => import('zod/v4/locales/en.js'),
  es: () => import('zod/v4/locales/es.js'),
  fr: () => import('zod/v4/locales/fr.js'),
  hu: () => import('zod/v4/locales/hu.js'),
  hi: () => import('zod/v4/locales/en.js'), // Hmm, doesn't seem to have Hindi, going fallback :(
  it: () => import('zod/v4/locales/it.js'),
  ja: () => import('zod/v4/locales/ja.js'),
  ko: () => import('zod/v4/locales/ko.js'),
  pl: () => import('zod/v4/locales/pl.js'),
  pt: () => import('zod/v4/locales/pt.js'),
  ru: () => import('zod/v4/locales/ru.js'),
  tr: () => import('zod/v4/locales/tr.js'),
  zh: () => import('zod/v4/locales/zh-CN.js'),
};

const loadedLocales = new Set<string>();

export function useZodAutoConfigurator() {
  const locale = useLocale();

  useEffect(() => {
    if (loadedLocales.has(locale)) return;

    async function loadLocale() {
      const moduleLoader = LOCALE_ZOD_MODULES[locale];

      const { default: localeLoader } = await moduleLoader();

      z.config(localeLoader());
      loadedLocales.add(locale);
    }

    loadLocale();
  }, [locale]);
}
