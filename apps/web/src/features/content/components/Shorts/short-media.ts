import type {
  ShortVideo,
  ShortVideoListItem,
  ShortVideoMedia,
} from '@maw/content-sdk';

type ShortWithMedia = Pick<ShortVideo | ShortVideoListItem, 'media'>;

export interface ShortMediaSelection {
  /** Default video rendition, when the API exposes one. */
  video?: ShortVideoMedia;
  /** Default poster thumbnail, when the API exposes one. */
  poster?: ShortVideoMedia;
}

function pickDefault(items: ShortVideoMedia[]): ShortVideoMedia | undefined {
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
