import { buildAuthorStaticParams } from './build-author-static-params';

describe('buildAuthorStaticParams', () => {
  it('emits one entry per author per locale', () => {
    const params = buildAuthorStaticParams(
      ['en', 'hu'],
      [{ slug: 'a' }, { slug: 'b' }],
    );

    expect(params).toEqual([
      { slug: 'a', locale: 'en' },
      { slug: 'b', locale: 'en' },
      { slug: 'a', locale: 'hu' },
      { slug: 'b', locale: 'hu' },
    ]);
  });

  it('returns an empty list when there are no authors', () => {
    expect(buildAuthorStaticParams(['en'], [])).toEqual([]);
  });
});
