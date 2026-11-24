import type { ShortVideo, ShortVideoListItem } from '@maw/content-sdk';
import { ensureShortInFeed } from './ensure-short-in-feed';

const makeShort = (id: string, slug: string) =>
  ({ id, slug }) as unknown as ShortVideoListItem;

describe('ensureShortInFeed', () => {
  it('keeps the feed untouched when it already contains the short', () => {
    const feed = [makeShort('a', 'a'), makeShort('b', 'b')];
    const result = ensureShortInFeed(feed, {
      id: 'b',
      slug: 'b',
    } as unknown as ShortVideo);

    expect(result).toBe(feed);
  });

  it('prepends a requested short that is missing from the feed', () => {
    const feed = [makeShort('a', 'a')];
    const result = ensureShortInFeed(feed, {
      id: 'b',
      slug: 'b',
    } as unknown as ShortVideo);

    expect(result.map((item) => item.id)).toEqual(['b', 'a']);
  });
});
