'use client';

import type { ShortListItem } from '@maw/content-sdk';
import { Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { selectShortMedia } from './short-media';
import { SHORT_PLAYER_SURFACE_CLASS } from './short-player-frame';

export interface ShortPlayerSlideProps {
  short: ShortListItem;
  index: number;
  isActive: boolean;
  isNearby: boolean;
  muted: boolean;
  onVideoRef: (index: number, video: HTMLVideoElement | null) => void;
  onTap: () => void;
  onLike: () => void;
  className?: string;
}

const DRAG_THRESHOLD_PX = 8;
const DOUBLE_TAP_WINDOW_MS = 280;
const DOUBLE_TAP_DISTANCE_PX = 40;
const LIKE_BURST_MS = 700;

/**
 * One slide of the vertical feed.
 *
 * The video is only mounted while the slide is active or adjacent; every other
 * slide keeps its poster so the feed can hold many clips without loading them
 * all. A transparent tap layer handles play/pause while letting Embla receive
 * the same pointer events for swiping.
 */
export function ShortPlayerSlide({
  short,
  index,
  isActive,
  isNearby,
  muted,
  onVideoRef,
  onTap,
  onLike,
  className,
}: ShortPlayerSlideProps) {
  const t = useTranslations('content.shorts');
  const { video, poster } = selectShortMedia(short);
  const [hasError, setHasError] = useState(false);
  const [showLikeBurst, setShowLikeBurst] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const wasDragged = useRef(false);
  const lastTap = useRef<{ x: number; y: number; at: number } | null>(null);
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const burstTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
      }
      if (burstTimeout.current) {
        clearTimeout(burstTimeout.current);
      }
    };
  }, []);

  const setVideoElement = useCallback(
    (element: HTMLVideoElement | null) => {
      onVideoRef(index, element);
    },
    [index, onVideoRef],
  );

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    wasDragged.current = false;
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start) {
      return;
    }

    const distance = Math.hypot(
      event.clientX - start.x,
      event.clientY - start.y,
    );

    if (distance > DRAG_THRESHOLD_PX) {
      wasDragged.current = true;
    }
  };

  const showLike = () => {
    setShowLikeBurst(true);

    if (burstTimeout.current) {
      clearTimeout(burstTimeout.current);
    }

    burstTimeout.current = setTimeout(() => {
      setShowLikeBurst(false);
    }, LIKE_BURST_MS);
  };

  const onTapLayer = (event: MouseEvent<HTMLDivElement>) => {
    if (!isActive || wasDragged.current) {
      pointerStart.current = null;
      wasDragged.current = false;
      return;
    }

    const now = Date.now();
    const previousTap = lastTap.current;
    const isDoubleTap =
      previousTap !== null &&
      now - previousTap.at <= DOUBLE_TAP_WINDOW_MS &&
      Math.hypot(
        event.clientX - previousTap.x,
        event.clientY - previousTap.y,
      ) <= DOUBLE_TAP_DISTANCE_PX;

    if (isDoubleTap) {
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
        tapTimeout.current = null;
      }

      lastTap.current = null;
      onLike();
      showLike();
    } else {
      lastTap.current = {
        x: event.clientX,
        y: event.clientY,
        at: now,
      };

      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
      }

      tapTimeout.current = setTimeout(() => {
        tapTimeout.current = null;
        lastTap.current = null;
        onTap();
      }, DOUBLE_TAP_WINDOW_MS);
    }

    pointerStart.current = null;
    wasDragged.current = false;
  };

  const frameStyle = {
    aspectRatio: `${short.width} / ${short.height}`,
  };

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-black',
        className,
      )}
      data-testid="short-player-slide"
      data-short-slug={short.slug}
      data-track-impression="shorts:slide"
      data-track-index={index}
      data-track-key={short.id}
    >
      <div className={SHORT_PLAYER_SURFACE_CLASS} style={frameStyle}>
        {poster && (
          <Image
            className="object-cover"
            src={poster.url}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            priority={isActive}
          />
        )}
        {isNearby && video && (
          <video
            ref={setVideoElement}
            className="absolute inset-0 h-full w-full object-cover"
            src={video.url}
            poster={poster?.url}
            muted={muted}
            loop
            playsInline
            crossOrigin="anonymous"
            preload={isActive ? 'auto' : 'metadata'}
            onError={() => setHasError(true)}
            onLoadedData={() => setHasError(false)}
          />
        )}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/70 p-6 text-center text-white">
            <Icon icon="failed" aria-hidden />
            <p className="text-sm">{t('playbackFailed')}</p>
          </div>
        )}
        {showLikeBurst && (
          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            data-testid="short-like-burst"
          >
            <Icon
              icon="heart"
              className="animate-pulse text-8xl text-red-500 drop-shadow-lg"
              aria-hidden
            />
          </div>
        )}
        <div
          className="absolute inset-0 z-0 cursor-pointer touch-manipulation"
          aria-hidden="true"
          data-testid="short-player-tap-layer"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerCancel={() => {
            pointerStart.current = null;
            wasDragged.current = false;
          }}
          onClick={onTapLayer}
          data-track-ignore
        />
      </div>
    </div>
  );
}
