'use client';

import type { ShortVideoListItem } from '@maw/content-sdk';
import type { CarouselApi } from '@maw/ui-lib';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from '@/core/i18n/navigation';
import { takeShortsEntry } from '@/features/content/shorts-entry';
import { useRuntimeStore, useUserPreferencesStore } from '@/stores';
import { useShortUrlSync } from './use-short-url-sync';

const PLAY_PAUSE_FLASH_MS = 900;

type WebkitVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

const INTERACTIVE_SELECTOR =
  'button, a, input, textarea, select, [role="slider"], [contenteditable="true"]';

const FORM_CONTROL_SELECTOR =
  'input, textarea, select, [role="slider"], [contenteditable="true"]';

function isInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest(INTERACTIVE_SELECTOR))
  );
}

function isFormControlTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest(FORM_CONTROL_SELECTOR))
  );
}

function hasOpenDialog(): boolean {
  return Boolean(
    document.querySelector('[data-slot="dialog-content"], [role="dialog"]'),
  );
}

function isCommentsPanelTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    Boolean(target.closest('[data-comments-panel]'))
  );
}

/**
 * Shortcuts belong to the feed unless a dialog, the comments panel, or an
 * interactive control is handling the key itself.
 */
function shouldIgnoreShortcut(event: KeyboardEvent): boolean {
  if (hasOpenDialog() || isCommentsPanelTarget(event.target)) {
    return true;
  }

  const isArrowKey = event.key === 'ArrowDown' || event.key === 'ArrowUp';

  return (
    isInteractiveTarget(event.target) &&
    event.key !== 'Escape' &&
    (!isArrowKey || isFormControlTarget(event.target))
  );
}

interface UseShortPlayerOptions {
  shorts: ShortVideoListItem[];
  initialIndex: number;
}

/**
 * State and side effects for the full-screen short feed.
 *
 * Playback is intentionally unmuted first: if the browser blocks it, the
 * active video falls back to muted autoplay and the UI offers an unmute prompt.
 */
export function useShortPlayer({
  shorts,
  initialIndex,
}: UseShortPlayerOptions) {
  const router = useRouter();
  const enableSound = useUserPreferencesStore((state) => state.enableSound);
  const systemReducedMotion = useRuntimeStore(
    (state) => state.systemReducedMotion,
  );
  const documentVisible = useRuntimeStore((state) => state.document.isVisible);
  const documentEverVisible = useRuntimeStore(
    (state) => state.document.hasEverBeenVisible,
  );
  // The store reports `isVisible: false` until the visibility observer runs, so
  // only treat the document as hidden once it has actually been visible.
  const documentHidden = documentEverVisible && !documentVisible;

  const lastIndex = Math.max(shorts.length - 1, 0);
  const clampedInitialIndex = Math.min(Math.max(initialIndex, 0), lastIndex);

  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(clampedInitialIndex);
  const [activeVideo, setActiveVideo] = useState<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(!enableSound);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [showPlayPause, setShowPlayPause] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef(new Map<number, HTMLVideoElement>());
  const activeIndexRef = useRef(activeIndex);
  const playPauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeShort = shorts[activeIndex] ?? shorts[0];

  useShortUrlSync({ short: activeShort });

  const flashPlayPause = useCallback(() => {
    setShowPlayPause(true);

    if (playPauseTimeout.current) {
      clearTimeout(playPauseTimeout.current);
    }

    playPauseTimeout.current = setTimeout(() => {
      setShowPlayPause(false);
    }, PLAY_PAUSE_FLASH_MS);
  }, []);

  const playVideo = useCallback(async (video: HTMLVideoElement) => {
    try {
      await video.play();
      setAutoplayBlocked(false);
    } catch {
      if (video.muted) {
        setAutoplayBlocked(true);
        return;
      }

      // Browser autoplay policy blocked sound. Retry muted and let the user
      // restore sound with the unmute prompt.
      video.muted = true;
      setMuted(true);
      setAutoplayBlocked(true);

      try {
        await video.play();
      } catch {
        // Remains paused with the poster visible; the play control is shown.
      }
    }
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  useEffect(() => {
    const nextVideo = videoRefs.current.get(activeIndex) ?? null;
    setActiveVideo(nextVideo);
    setAutoplayBlocked(false);
    setShowPlayPause(false);
  }, [activeIndex]);

  useEffect(() => {
    if (!enableSound) {
      setMuted(true);
    }
  }, [enableSound]);

  useEffect(() => {
    if (!activeVideo) {
      setIsPlaying(false);
      return;
    }

    const video = activeVideo;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    setIsPlaying(!video.paused);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.pause();
    };
  }, [activeVideo]);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    if (systemReducedMotion || documentHidden) {
      activeVideo.pause();
      return;
    }

    void playVideo(activeVideo);
  }, [activeVideo, documentHidden, playVideo, systemReducedMotion]);

  useEffect(() => {
    if (activeVideo) {
      activeVideo.muted = muted;
    }
  }, [activeVideo, muted]);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  useEffect(() => {
    return () => {
      if (playPauseTimeout.current) {
        clearTimeout(playPauseTimeout.current);
      }
    };
  }, []);

  const registerVideo = useCallback(
    (index: number, video: HTMLVideoElement | null) => {
      if (video) {
        videoRefs.current.set(index, video);
      } else {
        videoRefs.current.delete(index);
      }

      if (index === activeIndexRef.current) {
        setActiveVideo(video);
      }
    },
    [],
  );

  const togglePlay = useCallback(() => {
    if (!activeVideo) {
      return;
    }

    if (activeVideo.paused) {
      void playVideo(activeVideo);
    } else {
      activeVideo.pause();
    }

    flashPlayPause();
  }, [activeVideo, flashPlayPause, playVideo]);

  const toggleMute = useCallback(() => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setAutoplayBlocked(false);

    if (!nextMuted && activeVideo) {
      activeVideo.muted = false;
      void activeVideo.play().catch(() => setAutoplayBlocked(true));
    }
  }, [activeVideo, muted]);

  const toggleCaptions = useCallback(() => {
    setShowCaptions((current) => !current);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (typeof document === 'undefined') {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
      return;
    }

    const player = playerRef.current;
    if (player?.requestFullscreen) {
      await player.requestFullscreen().catch(() => undefined);
      return;
    }

    const video = activeVideo as WebkitVideoElement | null;
    video?.webkitEnterFullscreen?.();
  }, [activeVideo]);

  const close = useCallback(() => {
    const entryPath = takeShortsEntry();

    if (entryPath) {
      router.push(entryPath);
      return;
    }

    router.push('/');
  }, [router]);

  const next = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const previous = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  useEffect(() => {
    const shortcuts: Record<string, () => void> = {
      ArrowDown: next,
      ArrowUp: previous,
      ' ': togglePlay,
      k: togglePlay,
      m: toggleMute,
      c: toggleCaptions,
      f: () => void toggleFullscreen(),
      Escape: () => {
        if (document.fullscreenElement) {
          void document.exitFullscreen().catch(() => undefined);
          return;
        }

        close();
      },
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event)) {
        return;
      }

      const action = shortcuts[event.key];
      if (!action) {
        return;
      }

      if (event.key !== 'Escape') {
        event.preventDefault();
      }

      action();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    close,
    next,
    previous,
    toggleCaptions,
    toggleFullscreen,
    toggleMute,
    togglePlay,
  ]);

  return {
    activeIndex,
    activeShort,
    activeVideo,
    muted,
    showCaptions,
    isPlaying,
    isFullscreen,
    autoplayBlocked,
    showPlayPause,
    /** Clamped slide index the carousel starts on. */
    startIndex: clampedInitialIndex,
    playerRef,
    setApi,
    registerVideo,
    togglePlay,
    toggleMute,
    toggleCaptions,
    toggleFullscreen,
    close,
    next,
    previous,
  };
}
