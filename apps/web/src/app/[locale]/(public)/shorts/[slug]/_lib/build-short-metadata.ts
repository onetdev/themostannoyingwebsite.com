import type { ShortVideo } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { selectShortMedia } from '@/features/content/components/Shorts/short-media';
import i18nConfig from '@/root/i18n.config';

export interface BuildShortMetadataInput {
  short: ShortVideo;
  locale: AppLocale;
}

/**
 * Maps a media container format to the MIME type Open Graph expects.
 *
 * `video/${format}` is only correct for ISO base media formats, so non-standard
 * containers are normalized explicitly.
 */
const VIDEO_MIME_TYPE_BY_FORMAT: Record<string, string> = {
  m4v: 'video/mp4',
  mov: 'video/quicktime',
  mp4: 'video/mp4',
  webm: 'video/webm',
};

function toVideoMimeType(format: string): string {
  const normalized = format.toLowerCase();
  return VIDEO_MIME_TYPE_BY_FORMAT[normalized] ?? `video/${normalized}`;
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
                type: toVideoMimeType(media.video.format),
                width: media.video.width,
                height: media.video.height,
              },
            ],
          }
        : {}),
    },
  };
}
