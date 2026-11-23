import { buildFeaturedArticleStaticParams } from './build-featured-article-static-params';

describe('buildFeaturedArticleStaticParams', () => {
  it('returns featured articles for every locale', async () => {
    const listAll = jest.fn(async ({ lang }: { lang: string }) =>
      lang === 'en'
        ? [{ slug: 'featured-en' }]
        : [{ slug: `featured-${lang}` }],
    );

    const params = await buildFeaturedArticleStaticParams(['en', 'hu'], {
      listAll,
    });

    expect(params).toEqual([
      { slug: 'featured-en', locale: 'en' },
      { slug: 'featured-hu', locale: 'hu' },
    ]);
    expect(listAll).toHaveBeenCalledWith({
      lang: 'en',
      is_featured: true,
    });
  });

  it('returns nothing when no article is featured', async () => {
    const params = await buildFeaturedArticleStaticParams(['en'], {
      listAll: async () => [],
    });

    expect(params).toEqual([]);
  });
});
