/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { ShortVideoListItem } from '@maw/content-sdk';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { ShortPlayerSlide } from './ShortPlayerSlide';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt?: string;
    className?: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
  }) => (
    // biome-ignore lint/performance/noImgElement: test double for next/image
    <img src={src} alt={alt} className={className} />
  ),
}));

const short = {
  id: 'short-1',
  slug: 'gummy-bear-fork',
  lang: 'en',
  width: 720,
  height: 1280,
  subtitle_url: 'https://media.example.com/en.vtt',
  media: [
    {
      kind: 'thumbnail',
      variant: 'lg',
      format: 'webp',
      width: 720,
      height: 1280,
      duration_ms: null,
      file_size_bytes: 1,
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
      file_size_bytes: 1,
      default: true,
      url: 'https://media.example.com/video.mp4',
    },
  ],
} as ShortVideoListItem;

function renderSlide(
  overrides: Partial<Parameters<typeof ShortPlayerSlide>[0]> = {},
) {
  const handlers = {
    onVideoRef: jest.fn(),
    onTap: jest.fn(),
    onLike: jest.fn(),
  };

  const result = render(
    <ShortPlayerSlide
      short={short}
      index={0}
      isActive
      isNearby
      muted={false}
      {...handlers}
      {...overrides}
    />,
  );

  return { ...handlers, ...result };
}

describe('ShortPlayerSlide', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('mounts a looping inline video with its poster and registers the ref', () => {
    const { onVideoRef } = renderSlide();

    const video = screen
      .getByTestId('short-player-slide')
      .querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', 'https://media.example.com/video.mp4');
    expect(video).toHaveAttribute(
      'poster',
      'https://media.example.com/poster.webp',
    );
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video).not.toHaveAttribute('muted');
    expect(onVideoRef).toHaveBeenCalledWith(0, video);
  });

  it('keeps only the poster for far-away slides', () => {
    renderSlide({ isNearby: false, isActive: false });

    expect(
      screen.getByTestId('short-player-slide').querySelector('video'),
    ).not.toBeInTheDocument();
  });

  it('toggles playback on a tap but not after a drag', () => {
    const { onTap } = renderSlide();
    const tapLayer = screen.getByTestId('short-player-tap-layer');

    fireEvent(
      tapLayer,
      new MouseEvent('pointerdown', {
        bubbles: true,
        clientX: 10,
        clientY: 10,
      }),
    );
    fireEvent(
      tapLayer,
      new MouseEvent('pointermove', {
        bubbles: true,
        clientX: 12,
        clientY: 12,
      }),
    );
    fireEvent.click(tapLayer);
    expect(onTap).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(300));
    expect(onTap).toHaveBeenCalledTimes(1);

    fireEvent(
      tapLayer,
      new MouseEvent('pointerdown', {
        bubbles: true,
        clientX: 10,
        clientY: 10,
      }),
    );
    fireEvent(
      tapLayer,
      new MouseEvent('pointermove', {
        bubbles: true,
        clientX: 40,
        clientY: 10,
      }),
    );
    fireEvent.click(tapLayer);
    act(() => jest.advanceTimersByTime(300));
    expect(onTap).toHaveBeenCalledTimes(1);
  });

  it('likes the clip on a double tap without toggling playback', () => {
    const { onTap, onLike } = renderSlide();
    const tapLayer = screen.getByTestId('short-player-tap-layer');

    fireEvent.click(tapLayer);
    fireEvent.click(tapLayer);

    expect(onLike).toHaveBeenCalledTimes(1);
    expect(onTap).not.toHaveBeenCalled();
    expect(screen.getByTestId('short-like-burst')).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(800));
    expect(screen.queryByTestId('short-like-burst')).not.toBeInTheDocument();
  });
});
