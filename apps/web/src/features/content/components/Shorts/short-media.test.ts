import type { ShortMedia } from '@maw/content-sdk';
import { selectShortMedia } from './short-media';

const videoDefault: ShortMedia = {
  kind: 'video',
  variant: '720p',
  format: 'mp4',
  width: 720,
  height: 1280,
  duration_ms: 8042,
  file_size_bytes: 1_355_455,
  default: true,
  url: 'https://media.example.com/video-720.mp4',
};

const videoFallback: ShortMedia = {
  ...videoDefault,
  variant: '480p',
  width: 480,
  height: 854,
  default: false,
  url: 'https://media.example.com/video-480.mp4',
};

const posterDefault: ShortMedia = {
  kind: 'thumbnail',
  variant: 'lg',
  format: 'webp',
  width: 720,
  height: 1280,
  duration_ms: null,
  file_size_bytes: 52_866,
  default: true,
  url: 'https://media.example.com/poster-lg.webp',
};

describe('selectShortMedia', () => {
  it('selects the default video rendition and poster', () => {
    expect(
      selectShortMedia({ media: [posterDefault, videoDefault, videoFallback] }),
    ).toEqual({ video: videoDefault, poster: posterDefault });
  });

  it('falls back to the first variant when no default is flagged', () => {
    const result = selectShortMedia({
      media: [
        { ...posterDefault, default: false },
        { ...videoDefault, default: false },
      ],
    });

    expect(result.poster?.url).toBe(posterDefault.url);
    expect(result.video?.url).toBe(videoDefault.url);
  });

  it('returns undefined media when the short exposes none', () => {
    expect(selectShortMedia({ media: [] })).toEqual({
      video: undefined,
      poster: undefined,
    });
  });
});
