import type { ShortVideoListItem } from '@maw/content-sdk';

import { buildShortsJsonLd } from './build-shorts-json-ld';

jest.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string, values?: { page?: number }) =>
    values?.page ? `${key}:${values.page}` : key,
}));

const shorts = [
  { title: 'First clip', slug: 'first-clip' },
  { title: 'Second clip', slug: 'second-clip' },
] as unknown as ShortVideoListItem[];

interface WebPageNode {
  url?: string;
  breadcrumb?: { itemListElement: Array<{ name?: string }> };
}

interface ItemListNode {
  itemListElement?: Array<{
    position?: number;
    name?: string;
    item?: string;
  }>;
}

describe('buildShortsJsonLd', () => {
  it('describes the first page as a CollectionPage without a page breadcrumb', async () => {
    const [webPage] = (await buildShortsJsonLd({
      locale: 'en',
      page: 1,
      shorts,
      offset: 0,
    })) as unknown as [WebPageNode, ItemListNode];

    expect(webPage).toMatchObject({
      '@type': 'CollectionPage',
      name: 'title',
      inLanguage: 'en',
    });
    expect(webPage.url).toMatch(/\/en\/shorts\/?$/);
    expect(
      webPage.breadcrumb?.itemListElement.map((entry) => entry.name),
    ).toEqual(['home', 'title']);
  });

  it('lists clips with absolute positions across pages', async () => {
    const [, itemList] = (await buildShortsJsonLd({
      locale: 'en',
      page: 2,
      shorts,
      offset: 24,
    })) as unknown as [WebPageNode, ItemListNode];

    expect(itemList).toMatchObject({
      '@type': 'ItemList',
      name: 'pageTitle:2',
      numberOfItems: 2,
    });
    expect(itemList.itemListElement).toHaveLength(2);
    expect(
      itemList.itemListElement?.map((entry) => ({
        position: entry.position,
        name: entry.name,
        item: entry.item,
      })),
    ).toEqual([
      {
        position: 25,
        name: 'First clip',
        item: expect.stringMatching(/\/en\/shorts\/first-clip\/?$/),
      },
      {
        position: 26,
        name: 'Second clip',
        item: expect.stringMatching(/\/en\/shorts\/second-clip\/?$/),
      },
    ]);
  });

  it('adds a page-level breadcrumb for deeper pages', async () => {
    const [webPage] = (await buildShortsJsonLd({
      locale: 'en',
      page: 2,
      shorts,
      offset: 24,
    })) as unknown as [WebPageNode, ItemListNode];

    expect(webPage.url).toMatch(/\/en\/shorts\/page\/2\/?$/);
    expect(
      webPage.breadcrumb?.itemListElement.map((entry) => entry.name),
    ).toEqual(['home', 'title', 'pageTitle:2']);
  });
});
