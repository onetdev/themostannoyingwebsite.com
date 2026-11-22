'use client';

import type { ShortListItem } from '@maw/content-sdk';
import { Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type PointerEvent, useCallback, useRef, useState } from 'react';

import { selectShortMedia } from './short-media';
import { SHORT_PLAYER_FRAME_CLASS } from './short-player-frame';

export interface ShortPlayerSlideProps {
  short: ShortListItem;
  index: number;
  isActive: boolean;
  isNearby: boolean;
  muted: boolean;
  onVideoRef: (index: number, video: HTMLVideoElement | null) => void;
  onTap: () => void;
  className?: string;
}

const DRAG_THRESHOLD_PX = 8;

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
  className,
}: ShortPlayerSlideProps) {
  const t = useTranslations('content.shorts');
  const { video, poster } = selectShortMedia(short);
  const [hasError, setHasError] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const wasDragged = useRef(false);

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

  const onTapLayer = () => {
    if (isActive && !wasDragged.current) {
      onTap();
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
      <div className={SHORT_PLAYER_FRAME_CLASS} style={frameStyle}>
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
          >
            {short.subtitle_url && (
              <track
                kind="captions"
                src={short.subtitle_url}
                srcLang={short.lang}
                label={short.lang}
              />
            )}
          </video>
        )}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/70 p-6 text-center text-white">
            <Icon icon="failed" aria-hidden />
            <p className="text-sm">{t('playbackFailed')}</p>
          </div>
        )}
        <div
          className="absolute inset-0 z-0 cursor-pointer"
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
