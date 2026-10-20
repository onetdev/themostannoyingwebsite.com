import { buildArticleStaticParams } from './build-article-static-params';

describe('buildArticleStaticParams', () => {
  it('fetches each locale and flattens the entries in locale order', async () => {
    const requested: string[] = [];
    const articleService = {
      listAll: async ({ lang }: { lang: string }) => {
        requested.push(lang);
        return [{ slug: `${lang}-one` }];
      },
    };

    const params = await buildArticleStaticParams(['en', 'hu'], articleService);

    expect(requested).toEqual(['en', 'hu']);
    expect(params).toEqual([
      { slug: 'en-one', locale: 'en' },
      { slug: 'hu-one', locale: 'hu' },
    ]);
  });

  it('returns an empty list when no locales are configured', async () => {
    const articleService = { listAll: async () => [] };

    await expect(buildArticleStaticParams([], articleService)).resolves.toEqual(
      [],
    );
  });
});
