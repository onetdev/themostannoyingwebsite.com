import type { ShortVideo, ShortVideoListItem } from '@maw/content-sdk';

/**
 * Ensures the requested short is part of the player feed.
 *
 * The feed is the latest slice of shorts; a deep link can point at an older
 * clip that is not in that slice. Prepending it keeps the player usable and
 * makes the requested clip the initial slide.
 */
export function ensureShortInFeed(
  feed: ShortVideoListItem[],
  short: ShortVideo,
): ShortVideoListItem[] {
  if (feed.some((item) => item.id === short.id)) {
    return feed;
  }

  return [short, ...feed];
}
