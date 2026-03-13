'use client';

import { useLocale } from 'next-intl';
import { routing } from '@/core/i18n/routing';
import type { LocaleResource } from '@/schemas';

export function useLocaleResource() {
  const locale = useLocale() as AppLocale;

  const resolve = (resource: string | LocaleResource) => {
    if (typeof resource === 'string') {
      return resource;
    }

    return resource[locale] ?? resource[routing.defaultLocale];
  };

  return { resolve, locale };
}
