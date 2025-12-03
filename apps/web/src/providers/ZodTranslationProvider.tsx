'use client';

import { useLocale } from 'next-intl';
import { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { z } from 'zod';
import { en as zodEn, hu as zodHu } from 'zod/locales';

export const ZodTranslationConfig: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const appLocale = useLocale();

  useEffect(() => {
    const zodLocaleMap = { en: zodEn, hu: zodHu };
    const zodLocale =
      zodLocaleMap[appLocale as keyof typeof zodLocaleMap] ??
      zodLocaleMap['en'];
    z.config(zodLocale());
  }, [appLocale]);

  return <>{children}</>;
};
