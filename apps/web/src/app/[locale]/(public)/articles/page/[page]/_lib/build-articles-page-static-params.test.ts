import type { LanguageCode } from '@maw/content-sdk';
import { buildArticlesPageStaticParams } from './build-articles-page-static-params';

const createService = (counts: Record<string, number>) => ({
  listAll: jest.fn(async ({ lang }: { lang: LanguageCode }) =>
    Array.from({ length: counts[lang] ?? 0 }, (_, index) => ({ index })),
  ),
});

describe('buildArticlesPageStaticParams', () => {
  it('skips page 1 and emits nothing for a single-page archive', async () => {
    const params = await buildArticlesPageStaticParams(
      ['en'],
      createService({ en: 16 }),
    );

    expect(params).toEqual([]);
  });

  it('emits every page after the first', async () => {
    const params = await buildArticlesPageStaticParams(
      ['en'],
      createService({ en: 33 }),
    );

    expect(params).toEqual([
      { locale: 'en', page: '2' },
      { locale: 'en', page: '3' },
    ]);
  });

  it('builds params per locale from that locale’s own count', async () => {
    const params = await buildArticlesPageStaticParams(
      ['en', 'hu'],
      createService({ en: 17, hu: 0 }),
    );

    expect(params).toEqual([{ locale: 'en', page: '2' }]);
  });
});
