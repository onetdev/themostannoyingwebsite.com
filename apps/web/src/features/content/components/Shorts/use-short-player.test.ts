/**
 * @jest-environment jsdom
 */
import type { ShortListItem } from '@maw/content-sdk';
import type { CarouselApi } from '@maw/ui-lib';
import { act, renderHook, waitFor } from '@testing-library/react';

import { useShortPlayer } from './use-short-player';

let mockEnableSound = true;
let mockReducedMotion = false;
let mockDocumentVisible = true;

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

jest.mock('@/core/i18n/navigation', () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn() }),
}));

jest.mock('@/stores', () => ({
  useUserPreferencesStore: (
    selector: (state: { enableSound: boolean }) => unknown,
  ) => selector({ enableSound: mockEnableSound }),
  useRuntimeStore: (
    selector: (state: {
      systemReducedMotion: boolean;
      document: { isVisible: boolean };
    }) => unknown,
  ) =>
    selector({
      systemReducedMotion: mockReducedMotion,
      document: { isVisible: mockDocumentVisible },
    }),
}));

const makeShort = (id: string, slug: string, title: string, hasAudio = true) =>
  ({
    id,
    slug,
    title,
    has_audio: hasAudio,
    subtitle_url: 'https://media.example.com/en.vtt',
  }) as ShortListItem;

const shorts = [
  makeShort('a', 'first', 'First'),
  makeShort('b', 'second', 'Second'),
];

function makeVideo() {
  const video = document.createElement('video');
  video.play = jest.fn().mockResolvedValue(undefined);
  video.pause = jest.fn();
  Object.defineProperty(video, 'textTracks', { value: [] });
  Object.defineProperty(video, 'paused', {
    value: false,
    writable: true,
  });
  return video;
}

function makeApi() {
  const handlers = new Map<string, () => void>();

  return {
    selectedScrollSnap: () => 1,
    on: (event: string, handler: () => void) => handlers.set(event, handler),
    off: jest.fn(),
    scrollNext: jest.fn(),
    scrollPrev: jest.fn(),
    canScrollPrev: () => true,
    canScrollNext: () => true,
    emit: (event: string) => handlers.get(event)?.(),
  } as unknown as CarouselApi & { emit: (event: string) => void };
}

describe('useShortPlayer', () => {
  beforeEach(() => {
    mockEnableSound = true;
    mockReducedMotion = false;
    mockDocumentVisible = true;
    jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('attempts sound-on autoplay for the active clip', async () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const video = makeVideo();

    act(() => result.current.registerVideo(0, video));

    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));
    expect(video.muted).toBe(false);
    expect(result.current.autoplayBlocked).toBe(false);
  });

  it('falls back to muted autoplay and exposes the unmute prompt when blocked', async () => {
    const video = makeVideo();
    (video.play as jest.Mock)
      .mockRejectedValueOnce(new DOMException('blocked', 'NotAllowedError'))
      .mockResolvedValueOnce(undefined);

    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );

    act(() => result.current.registerVideo(0, video));

    await waitFor(() => expect(result.current.autoplayBlocked).toBe(true));
    expect(video.muted).toBe(true);
    expect(result.current.muted).toBe(true);
    expect(video.play).toHaveBeenCalledTimes(2);
  });

  it('does not autoplay when reduced motion is requested', async () => {
    mockReducedMotion = true;
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const video = makeVideo();

    act(() => result.current.registerVideo(0, video));

    await waitFor(() => expect(video.pause).toHaveBeenCalled());
    expect(video.play).not.toHaveBeenCalled();
  });

  it('syncs the localized URL and document title when the slide changes', async () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const api = makeApi();

    act(() => result.current.setApi(api));
    act(() => api.emit('select'));

    await waitFor(() =>
      expect(window.history.replaceState).toHaveBeenLastCalledWith(
        null,
        '',
        '/en/shorts/second/',
      ),
    );
    expect(result.current.activeIndex).toBe(1);
  });

  it('toggles playback, mute and captions from the active clip', async () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const video = makeVideo();

    act(() => result.current.registerVideo(0, video));
    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => result.current.togglePlay());
    expect(video.pause).toHaveBeenCalledTimes(1);

    act(() => result.current.toggleMute());
    expect(result.current.muted).toBe(true);

    act(() => result.current.toggleCaptions());
    expect(result.current.showCaptions).toBe(true);
  });

  it('navigates the feed with arrow keys through the carousel api', () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const api = makeApi();

    act(() => result.current.setApi(api));
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    });

    expect(api.scrollNext).toHaveBeenCalledTimes(1);
    expect(api.scrollPrev).toHaveBeenCalledTimes(1);
  });

  it('keeps arrow navigation working while a control is focused', () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const api = makeApi();
    const button = document.createElement('button');
    document.body.append(button);
    button.focus();

    act(() => result.current.setApi(api));
    act(() => {
      button.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );
    });

    expect(api.scrollNext).toHaveBeenCalledTimes(1);
    button.remove();
  });
});
