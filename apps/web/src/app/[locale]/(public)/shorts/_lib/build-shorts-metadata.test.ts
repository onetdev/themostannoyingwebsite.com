import { buildShortsMetadata } from './build-shorts-metadata';

jest.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}));

describe('buildShortsMetadata', () => {
  it('builds localized archive metadata with a self-canonical and alternates', async () => {
    const metadata = await buildShortsMetadata('en');

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
    });
  });
});
