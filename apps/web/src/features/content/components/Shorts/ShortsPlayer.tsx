'use client';

import type { ShortVideoListItem } from '@maw/content-sdk';
import { Carousel, CarouselContent, CarouselItem } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState, type WheelEvent } from 'react';

import { ShortPlayerBackdrop } from './ShortPlayerBackdrop';
import { ShortPlayerOverlay } from './ShortPlayerOverlay';
import { ShortPlayerSlide } from './ShortPlayerSlide';
import { useShortFeedWheel } from './use-short-feed-wheel';
import { useShortPlayer } from './use-short-player';

export interface ShortsPlayerProps {
  shorts: ShortVideoListItem[];
  initialIndex: number;
}

const isPlayerControl = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('[data-player-control]'));

/**
 * Full-screen vertical short feed.
 *
 * Slides own their media elements; the active slide also owns the controls so
 * they travel with it during a swipe. The blurred backdrop stays behind the
 * carousel and crossfades between clips.
 */
export function ShortsPlayer({ shorts, initialIndex }: ShortsPlayerProps) {
  const t = useTranslations('content.shorts');
  const player = useShortPlayer({ shorts, initialIndex });
  const [likedShortIds, setLikedShortIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const scrollByWheel = useShortFeedWheel({
    onNext: player.next,
    onPrevious: player.previous,
  });

  // Scrubbing the seek bar or hovering a control must not advance the feed.
  const onWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (isPlayerControl(event.target)) {
        return;
      }

      scrollByWheel(event);
    },
    [scrollByWheel],
  );

  const likeShort = useCallback((id: string) => {
    setLikedShortIds((current) => {
      if (current.has(id)) {
        return current;
      }

      const next = new Set(current);
      next.add(id);
      return next;
    });
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLikedShortIds((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

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
      onWheel={onWheel}
    >
      <ShortPlayerBackdrop short={player.activeShort} />
      <Carousel
        orientation="vertical"
        spacing={false}
        setApi={player.setApi}
        opts={{
          startIndex: player.startIndex,
          loop: false,
          align: 'start',
          watchFocus: false,
          watchDrag: (_api, event) => !isPlayerControl(event.target),
        }}
        className="relative z-10 h-full w-full"
        aria-label={t('playerLabel')}
      >
        <CarouselContent viewportClassName="h-full" className="h-full">
          {shorts.map((short, index) => (
            <CarouselItem key={short.id} className="relative h-full">
              <ShortPlayerSlide
                short={short}
                index={index}
                isActive={index === player.activeIndex}
                isNearby={Math.abs(index - player.activeIndex) <= 1}
                muted={player.muted}
                onVideoRef={player.registerVideo}
                onTap={player.togglePlay}
                onLike={() => likeShort(short.id)}
              />
              {index === player.activeIndex && (
                <ShortPlayerOverlay
                  short={short}
                  video={player.activeVideo}
                  muted={player.muted}
                  showCaptions={player.showCaptions}
                  liked={likedShortIds.has(short.id)}
                  isPlaying={player.isPlaying}
                  isFullscreen={player.isFullscreen}
                  autoplayBlocked={player.autoplayBlocked}
                  showPlayPause={player.showPlayPause}
                  onTogglePlay={player.togglePlay}
                  onToggleMute={player.toggleMute}
                  onToggleCaptions={player.toggleCaptions}
                  onToggleFullscreen={player.toggleFullscreen}
                  onToggleLike={() => toggleLike(short.id)}
                  onClose={player.close}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
