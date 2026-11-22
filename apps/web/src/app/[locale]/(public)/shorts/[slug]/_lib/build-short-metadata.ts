import type { Short } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { selectShortMedia } from '@/features/content/components/Shorts/short-media';
import i18nConfig from '@/root/i18n.config';

export interface BuildShortMetadataInput {
  short: Short;
  locale: AppLocale;
}

/**
 * Builds per-locale metadata for a short player page.
 *
 * Each localized player URL is self-canonical and linked to its available
 * translations through `hreflang`, matching the article convention.
 */
export function buildShortMetadata({
  short,
  locale,
}: BuildShortMetadataInput): Metadata {
  const media = selectShortMedia(short);
  const translations = short.translations ?? [];
  const self = { lang: short.lang, slug: short.slug };
  const allTranslations = translations.some(
    (translation) => translation.lang === short.lang,
  )
    ? translations
    : [self, ...translations];
  const defaultTranslation =
    allTranslations.find(
      (translation) => translation.lang === i18nConfig.defaultLocale,
    ) ?? self;

  const languages = Object.fromEntries(
    allTranslations.map((translation) => [
      translation.lang,
      `/${translation.lang}/shorts/${translation.slug}/`,
    ]),
  );

  return {
    title: short.title,
    description: short.summary,
    alternates: {
      canonical: `/${locale}/shorts/${short.slug}/`,
      languages: {
        ...languages,
        'x-default': `/${defaultTranslation.lang}/shorts/${defaultTranslation.slug}/`,
      },
    },
    openGraph: {
      title: short.title,
      description: short.summary,
      type: 'video.other',
      ...(media.poster?.url ? { images: media.poster.url } : {}),
      ...(media.video
        ? {
            videos: [
              {
                url: media.video.url,
                type: `video/${media.video.format}`,
                width: media.video.width,
                height: media.video.height,
              },
            ],
          }
        : {}),
    },
  };
}
