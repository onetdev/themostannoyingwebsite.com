import type { Short, ShortListItem, ShortMedia } from '@maw/content-sdk';

type ShortWithMedia = Pick<Short | ShortListItem, 'media'>;

export interface ShortMediaSelection {
  /** Default video rendition, when the API exposes one. */
  video?: ShortMedia;
  /** Default poster thumbnail, when the API exposes one. */
  poster?: ShortMedia;
}

function pickDefault(items: ShortMedia[]): ShortMedia | undefined {
  return items.find((item) => item.default) ?? items[0];
}

/**
 * Selects the default video rendition and poster for a short.
 *
 * The API can expose multiple video qualities and thumbnail sizes; the
 * `default` flag is the canonical pick, with the first variant as a fallback.
 */
export function selectShortMedia(short: ShortWithMedia): ShortMediaSelection {
  const media = short.media ?? [];

  return {
    video: pickDefault(media.filter((item) => item.kind === 'video')),
    poster: pickDefault(media.filter((item) => item.kind === 'thumbnail')),
  };
}
