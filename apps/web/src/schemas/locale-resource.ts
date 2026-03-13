import * as z from 'zod';
import i18nConfig from '@/root/i18n.config';

type LocaleKey = (typeof i18nConfig.allLocales)[number];

export const LocaleResourceSchema = z
  .object(
    i18nConfig.allLocales.reduce(
      (acc, locale) => {
        acc[locale as LocaleKey] = z.string();
        return acc;
      },
      {} as Record<LocaleKey, z.ZodString>,
    ),
  )
  .partial();

export type LocaleResource = z.infer<typeof LocaleResourceSchema>;
