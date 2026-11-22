'use client';

import type { ShortListItem } from '@maw/content-sdk';
import { Carousel, CarouselContent, CarouselItem } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { ShortPlayerOverlay } from './ShortPlayerOverlay';
import { ShortPlayerSlide } from './ShortPlayerSlide';
import { useShortPlayer } from './use-short-player';

export interface ShortsPlayerProps {
  shorts: ShortListItem[];
  initialIndex: number;
}

const isPlayerControl = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('[data-player-control]'));

/**
 * Full-screen vertical short feed.
 *
 * Slides own their media elements; a single fixed overlay owns the controls so
 * the top bar, rail and caption block do not slide away during a swipe.
 */
export function ShortsPlayer({ shorts, initialIndex }: ShortsPlayerProps) {
  const t = useTranslations('content.shorts');
  const player = useShortPlayer({ shorts, initialIndex });
  const startIndex = Math.min(
    Math.max(initialIndex, 0),
    Math.max(shorts.length - 1, 0),
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.dataset.shortsPlayer = 'true';

    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.shortsPlayer;
    };
  }, []);

  if (!player.activeShort) {
    return null;
  }

  return (
    <div
      ref={player.playerRef}
      className="relative h-dvh w-full overflow-hidden overscroll-none bg-black"
      data-testid="shorts-player"
    >
      <Carousel
        orientation="vertical"
        spacing={false}
        setApi={player.setApi}
        opts={{
          startIndex,
          loop: false,
          align: 'start',
          watchFocus: false,
          watchDrag: (_api, event) => !isPlayerControl(event.target),
        }}
        className="h-full w-full"
        aria-label={t('playerLabel')}
      >
        <CarouselContent viewportClassName="h-full" className="h-full">
          {shorts.map((short, index) => (
            <CarouselItem key={short.id} className="h-full">
              <ShortPlayerSlide
                short={short}
                index={index}
                isActive={index === player.activeIndex}
                isNearby={Math.abs(index - player.activeIndex) <= 1}
                muted={player.muted}
                onVideoRef={player.registerVideo}
                onTap={player.togglePlay}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <ShortPlayerOverlay
        short={player.activeShort}
        video={player.activeVideo}
        muted={player.muted}
        showCaptions={player.showCaptions}
        isPlaying={player.isPlaying}
        isFullscreen={player.isFullscreen}
        autoplayBlocked={player.autoplayBlocked}
        showPlayPause={player.showPlayPause}
        hasAudio={player.hasAudio}
        hasCaptions={player.hasCaptions}
        onTogglePlay={player.togglePlay}
        onToggleMute={player.toggleMute}
        onToggleCaptions={player.toggleCaptions}
        onToggleFullscreen={player.toggleFullscreen}
        onClose={player.close}
      />
    </div>
  );
}
