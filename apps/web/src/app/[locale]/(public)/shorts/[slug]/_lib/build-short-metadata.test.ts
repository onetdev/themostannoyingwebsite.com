import type { ShortVideo } from '@maw/content-sdk';
import { buildShortMetadata } from './build-short-metadata';

const short = {
  id: '01442b6f-2d4c-5d59-ab16-831cfb2957c8',
  short_video_group: '012-gummy-bear-fork',
  slug: 'gummy-bear-fork',
  lang: 'en',
  title: 'The Gummy Bears Were Warned',
  summary: 'The fork is not cutlery. It is a verdict.',
  author: {
    id: '1c6b313d-4a16-53a9-a146-2e5883dd1979',
    slug: 'old-world-connoisseur',
    name: 'Countess Beatrix von Harten',
    persona: 'The old-world connaisseur',
  },
  published_at: '2026-11-21',
  duration_ms: 8042,
  width: 720,
  height: 1280,
  has_audio: true,
  is_featured: false,
  ai_assisted: true,
  categories: [{ id: 'humor', label: 'Humor' }],
  cues: [],
  media: [
    {
      kind: 'thumbnail',
      variant: 'lg',
      format: 'webp',
      width: 720,
      height: 1280,
      duration_ms: null,
      file_size_bytes: 52_866,
      default: true,
      url: 'https://media.example.com/poster.webp',
    },
    {
      kind: 'video',
      variant: '720p',
      format: 'mp4',
      width: 720,
      height: 1280,
      duration_ms: 8042,
      file_size_bytes: 1_355_455,
      default: true,
      url: 'https://media.example.com/video.mp4',
    },
  ],
  subtitle_url: 'https://media.example.com/en.vtt',
  created_at: '2026-11-22 19:51:44',
  updated_at: '2026-11-22 19:51:44',
  translations: [
    {
      lang: 'en',
      slug: 'gummy-bear-fork',
      title: 'The Gummy Bears Were Warned',
    },
    {
      lang: 'de',
      slug: 'gummy-bear-fork',
      title: 'Die Gummibärchen wurden gewarnt',
    },
  ],
} as ShortVideo;

describe('buildShortMetadata', () => {
  it('builds self-canonical localized metadata with hreflang and video data', () => {
    const metadata = buildShortMetadata({ short, locale: 'en' });

    expect(metadata.title).toBe(short.title);
    expect(metadata.description).toBe(short.summary);
    expect(metadata.alternates).toEqual({
      canonical: '/en/shorts/gummy-bear-fork/',
      languages: {
        en: '/en/shorts/gummy-bear-fork/',
        de: '/de/shorts/gummy-bear-fork/',
        'x-default': '/en/shorts/gummy-bear-fork/',
      },
    });
    expect(metadata.openGraph).toMatchObject({
      type: 'video.other',
      images: 'https://media.example.com/poster.webp',
      videos: [
        {
          url: 'https://media.example.com/video.mp4',
          type: 'video/mp4',
          width: 720,
          height: 1280,
        },
      ],
    });
  });

  it('normalizes non-ISO container formats for the Open Graph video type', () => {
    const movShort = {
      ...short,
      media: short.media.map((item) =>
        item.kind === 'video' ? { ...item, format: 'mov' } : item,
      ),
    } as ShortVideo;

    const metadata = buildShortMetadata({ short: movShort, locale: 'en' });

    expect(metadata.openGraph).toMatchObject({
      videos: [{ type: 'video/quicktime' }],
    });
  });
});
