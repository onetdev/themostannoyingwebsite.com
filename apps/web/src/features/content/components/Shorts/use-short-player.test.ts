/**
 * @jest-environment jsdom
 */
import type { ShortVideoListItem } from '@maw/content-sdk';
import type { CarouselApi } from '@maw/ui-lib';
import { act, renderHook, waitFor } from '@testing-library/react';
import { SHORTS_ENTRY_STORAGE_KEY } from '@/features/content/shorts-entry';
import { useShortPlayer } from './use-short-player';

let mockEnableSound = true;
let mockReducedMotion = false;
let mockDocumentVisible = true;
let mockDocumentEverVisible = true;

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

const mockRouter = {
  back: jest.fn(),
  push: jest.fn(),
};

jest.mock('@/core/i18n/navigation', () => ({
  useRouter: () => mockRouter,
}));

jest.mock('@/stores', () => ({
  useUserPreferencesStore: (
    selector: (state: { enableSound: boolean }) => unknown,
  ) => selector({ enableSound: mockEnableSound }),
  useRuntimeStore: (
    selector: (state: {
      systemReducedMotion: boolean;
      document: { isVisible: boolean; hasEverBeenVisible: boolean };
    }) => unknown,
  ) =>
    selector({
      systemReducedMotion: mockReducedMotion,
      document: {
        isVisible: mockDocumentVisible,
        hasEverBeenVisible: mockDocumentEverVisible,
      },
    }),
}));

const makeShort = (id: string, slug: string, title: string, hasAudio = true) =>
  ({
    id,
    slug,
    title,
    has_audio: hasAudio,
    subtitle_url: 'https://media.example.com/en.vtt',
    cues: [{ shot_id: 'shot-1', start_ms: 0, end_ms: 4000, text: 'cue' }],
  }) as ShortVideoListItem;

const shorts = [
  makeShort('a', 'first', 'First'),
  makeShort('b', 'second', 'Second'),
];

function makeVideo() {
  const video = document.createElement('video');
  video.play = jest.fn().mockResolvedValue(undefined);
  video.pause = jest.fn();
  video.load = jest.fn();
  Object.defineProperty(video, 'textTracks', { value: [] });
  Object.defineProperty(video, 'paused', {
    value: false,
    writable: true,
  });
  return video;
}

function mockMediaSession() {
  const mediaSession = {
    playbackState: 'playing',
    metadata: { title: 'Short' },
  };

  Object.defineProperty(navigator, 'mediaSession', {
    configurable: true,
    value: mediaSession,
  });

  return mediaSession;
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
    mockDocumentEverVisible = true;
    mockRouter.back.mockClear();
    mockRouter.push.mockClear();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    Reflect.deleteProperty(navigator, 'mediaSession');
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

  it('enables captions by default', () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );

    expect(result.current.showCaptions).toBe(true);
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

  it('does not pause before the visibility observer reports the document', async () => {
    // The runtime store starts with `isVisible: false` until the observer runs.
    mockDocumentVisible = false;
    mockDocumentEverVisible = false;
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const video = makeVideo();

    act(() => result.current.registerVideo(0, video));

    await waitFor(() => expect(video.play).toHaveBeenCalled());
    expect(video.pause).not.toHaveBeenCalled();
  });

  it('pauses playback when the document becomes hidden', async () => {
    const { result, rerender } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const video = makeVideo();

    act(() => result.current.registerVideo(0, video));
    await waitFor(() => expect(video.play).toHaveBeenCalled());

    mockDocumentVisible = false;
    rerender();

    await waitFor(() => expect(video.pause).toHaveBeenCalled());
  });

  it('exposes the clamped start index for the carousel', () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 99 }),
    );

    expect(result.current.startIndex).toBe(shorts.length - 1);
  });

  it('follows the carousel selection', () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const api = makeApi();

    act(() => result.current.setApi(api));
    act(() => api.emit('select'));

    expect(result.current.activeIndex).toBe(1);
  });

  it('closes the player by navigating to the site home', () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );

    act(() => result.current.close());

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('returns to the page the player was opened from', () => {
    window.sessionStorage.setItem(SHORTS_ENTRY_STORAGE_KEY, '/shorts/');
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );

    act(() => result.current.close());

    expect(mockRouter.push).toHaveBeenCalledWith('/shorts/');
    expect(window.sessionStorage.getItem(SHORTS_ENTRY_STORAGE_KEY)).toBeNull();
  });

  it('releases every registered video and clears the media session on close', () => {
    const mediaSession = mockMediaSession();
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const first = makeVideo();
    const second = makeVideo();
    first.setAttribute('src', 'first.mp4');
    second.setAttribute('src', 'second.mp4');

    act(() => {
      result.current.registerVideo(0, first);
      result.current.registerVideo(1, second);
    });
    act(() => result.current.close());

    for (const video of [first, second]) {
      expect(video.pause).toHaveBeenCalled();
      expect(video.hasAttribute('src')).toBe(false);
      expect(video.load).toHaveBeenCalled();
    }

    expect(mediaSession.playbackState).toBe('none');
    expect(mediaSession.metadata).toBeNull();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('does not resume a released video when unmuting after close', async () => {
    mockEnableSound = false;
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const video = makeVideo();

    act(() => result.current.registerVideo(0, video));
    await waitFor(() => expect(video.play).toHaveBeenCalledTimes(1));

    act(() => result.current.close());
    (video.play as jest.Mock).mockClear();
    act(() => result.current.toggleMute());

    expect(video.play).not.toHaveBeenCalled();
  });

  it('releases registered videos after unmount', () => {
    jest.useFakeTimers();
    const { result, unmount } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const video = makeVideo();
    video.setAttribute('src', 'first.mp4');

    act(() => result.current.registerVideo(0, video));
    unmount();
    act(() => jest.runOnlyPendingTimers());

    expect(video.pause).toHaveBeenCalled();
    expect(video.hasAttribute('src')).toBe(false);
    expect(video.load).toHaveBeenCalled();
  });

  it('does not retry playback when a pending play rejects after close', async () => {
    const { result } = renderHook(() =>
      useShortPlayer({ shorts, initialIndex: 0 }),
    );
    const video = makeVideo();
    let rejectPlay: (reason?: unknown) => void = () => undefined;
    video.play = jest.fn(
      () =>
        new Promise((_resolve, reject) => {
          rejectPlay = reject;
        }),
    );

    act(() => result.current.registerVideo(0, video));
    act(() => result.current.close());

    await act(async () => {
      rejectPlay(new DOMException('blocked', 'NotAllowedError'));
      await Promise.resolve();
    });

    expect(video.play).toHaveBeenCalledTimes(1);
    expect(video.pause).toHaveBeenCalled();
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
    expect(result.current.showCaptions).toBe(false);
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
