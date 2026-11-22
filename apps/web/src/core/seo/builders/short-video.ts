import type { VideoObject, WithContext } from 'schema-dts';
import {
  absoluteAssetUrl,
  absoluteUrl,
  localeSiteId,
  siteId,
} from '../absolute-url';

export interface ShortVideoSeoInput {
  baseUrl: string;
  locale: string;
  /** Root-relative player path, e.g. `shorts/gummy-bear-fork`. */
  path: string;
  name: string;
  description?: string;
  /** Absolute or root-relative poster URL. */
  thumbnailUrl?: string;
  /** ISO publication timestamp or date. */
  uploadDate: string;
  durationMs: number;
  /** Absolute video file URL. */
  contentUrl?: string;
  authorName?: string;
  /** Root-relative author profile path, e.g. `authors/jane-doe`. */
  authorPath?: string;
}

/**
 * Converts a millisecond duration to the ISO 8601 form schema.org expects.
 * Values are rounded to whole seconds; a zero-length clip becomes `PT1S`.
 */
export function toIsoDuration(durationMs: number): string {
  const seconds = Math.max(1, Math.round(durationMs / 1000));
  return `PT${seconds}S`;
}

/**
 * Builds a `VideoObject` node for a short-form player page.
 */
export function buildShortVideo(
  input: ShortVideoSeoInput,
): WithContext<VideoObject> {
  const url = absoluteUrl(input.baseUrl, input.locale, input.path);
  const authorUrl = input.authorPath
    ? absoluteUrl(input.baseUrl, input.locale, input.authorPath)
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': url,
    url,
    name: input.name,
    inLanguage: input.locale,
    isPartOf: { '@id': localeSiteId(input.baseUrl, input.locale) },
    publisher: { '@id': siteId(input.baseUrl, 'organization') },
    duration: toIsoDuration(input.durationMs),
    uploadDate: input.uploadDate,
    ...(input.contentUrl ? { contentUrl: input.contentUrl } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.thumbnailUrl
      ? { thumbnailUrl: absoluteAssetUrl(input.baseUrl, input.thumbnailUrl) }
      : {}),
    ...(input.authorName
      ? {
          author: {
            '@type': 'Person',
            name: input.authorName,
            ...(authorUrl
              ? { '@id': `${authorUrl}#person`, url: authorUrl }
              : {}),
          },
        }
      : {}),
  };
}
