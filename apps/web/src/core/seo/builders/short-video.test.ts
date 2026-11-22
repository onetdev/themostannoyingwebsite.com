import { buildShortVideo, toIsoDuration } from './short-video';

const baseUrl = 'https://example.com';

const input = {
  baseUrl,
  locale: 'en',
  path: 'shorts/gummy-bear-fork',
  name: 'The Gummy Bears Were Warned',
  description: 'The fork is not cutlery. It is a verdict.',
  thumbnailUrl: '/assets/poster.webp',
  uploadDate: '2026-11-21',
  durationMs: 8042,
  contentUrl: 'https://media.example.com/720x1280.mp4',
  authorName: 'Countess Beatrix von Harten',
  authorPath: 'authors/old-world-connoisseur',
};

describe('toIsoDuration', () => {
  it.each([
    [8042, 'PT8S'],
    [8000, 'PT8S'],
    [0, 'PT1S'],
  ])('converts %dms to %s', (durationMs, expected) => {
    expect(toIsoDuration(durationMs)).toBe(expected);
  });
});

describe('buildShortVideo', () => {
  it('builds a VideoObject with canonical url, media and author', () => {
    const schema = buildShortVideo(input);

    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      '@id': 'https://example.com/en/shorts/gummy-bear-fork/',
      url: 'https://example.com/en/shorts/gummy-bear-fork/',
      name: input.name,
      description: input.description,
      contentUrl: input.contentUrl,
      duration: 'PT8S',
      uploadDate: input.uploadDate,
      inLanguage: 'en',
      thumbnailUrl: 'https://example.com/assets/poster.webp',
      author: {
        '@type': 'Person',
        name: input.authorName,
        url: 'https://example.com/en/authors/old-world-connoisseur/',
      },
      isPartOf: { '@id': 'https://example.com/en/#website' },
    });
  });

  it('omits optional media fields when they are unavailable', () => {
    const schema = buildShortVideo({
      ...input,
      thumbnailUrl: undefined,
      contentUrl: undefined,
      authorName: undefined,
      authorPath: undefined,
    });

    expect(schema).not.toHaveProperty('thumbnailUrl');
    expect(schema).not.toHaveProperty('contentUrl');
    expect(schema).not.toHaveProperty('author');
  });
});
