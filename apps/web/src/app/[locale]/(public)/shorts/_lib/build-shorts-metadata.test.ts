import { buildShortsMetadata } from './build-shorts-metadata';

jest.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}));

describe('buildShortsMetadata', () => {
  it('builds localized page-1 metadata with a self-canonical and alternates', async () => {
    const metadata = await buildShortsMetadata({ locale: 'en', page: 1 });

    expect(metadata.title).toBe('title');
    expect(metadata.description).toBe('description');
    expect(metadata.alternates).toMatchObject({
      canonical: '/en/shorts/',
      languages: {
        en: '/en/shorts/',
        de: '/de/shorts/',
        'x-default': '/en/shorts/',
      },
    });
    expect(metadata.openGraph).toMatchObject({
      title: 'title',
      description: 'description',
      type: 'website',
      siteName: 'title',
      url: '/en/shorts/',
    });
    expect(metadata.openGraph?.images).toEqual([expect.any(String)]);
  });

  it('uses a page-specific canonical without archive hreflang for deeper pages', async () => {
    const metadata = await buildShortsMetadata({ locale: 'en', page: 2 });

    expect(metadata.title).toBe('pageTitle');
    expect(metadata.alternates).toMatchObject({
      canonical: '/en/shorts/page/2/',
    });
    expect(metadata.alternates).not.toHaveProperty('languages');
    expect(metadata.openGraph?.url).toBe('/en/shorts/page/2/');
  });
});
