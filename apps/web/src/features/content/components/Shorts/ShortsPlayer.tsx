'use client';

import type { ShortVideoListItem } from '@maw/content-sdk';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerVirtualKeyboardProvider,
} from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState, type WheelEvent } from 'react';
import { MawLogo } from '@/components/MawLogo';
import { Link } from '@/core/i18n/navigation';
import { ShortsCommentsPanel } from '@/features/comments/components';
import type { Comment } from '@/features/comments/schemas';
import { countComments } from '@/features/comments/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { ShortPlayerBackdrop } from './ShortPlayerBackdrop';
import { ShortPlayerOverlay } from './ShortPlayerOverlay';
import { ShortPlayerSlide } from './ShortPlayerSlide';
import { useShortFeedWheel } from './use-short-feed-wheel';
import { useShortPlayer } from './use-short-player';

export interface ShortsPlayerProps {
  shorts: ShortVideoListItem[];
  initialIndex: number;
  commentsByShortId?: Record<string, Comment[]>;
}

const EMPTY_COMMENTS: Comment[] = [];
const EMPTY_COMMENTS_BY_SHORT: Record<string, Comment[]> = {};
const DESKTOP_QUERY = '(min-width: 1024px)';

const isPlayerControl = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('[data-player-control]'));

/**
 * Full-screen vertical short feed.
 *
 * Slides own their media elements; the active slide also owns the controls so
 * they travel with it during a swipe. The blurred backdrop stays behind the
 * carousel and crossfades between clips.
 */
export function ShortsPlayer({
  shorts,
  initialIndex,
  commentsByShortId = EMPTY_COMMENTS_BY_SHORT,
}: ShortsPlayerProps) {
  const t = useTranslations('content.shorts');
  const tComments = useTranslations('comments');
  const tApp = useTranslations('common.app');
  const player = useShortPlayer({ shorts, initialIndex });
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [likedShortIds, setLikedShortIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const scrollByWheel = useShortFeedWheel({
    onNext: player.next,
    onPrevious: player.previous,
  });

  const toggleComments = useCallback(() => {
    setCommentsOpen((current) => !current);
  }, []);
  const closeComments = useCallback(() => setCommentsOpen(false), []);

  // The desktop panel is not a dialog, so the player shortcut handler would
  // otherwise close the player on Escape instead of the comments panel.
  useEffect(() => {
    if (!commentsOpen || !isDesktop) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setCommentsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown, true);

    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [commentsOpen, isDesktop]);

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

  const activeComments =
    commentsByShortId[player.activeShort.id] ?? EMPTY_COMMENTS;
  const commentCount = countComments(activeComments);

  return (
    <>
      <div
        ref={player.playerRef}
        className="relative flex h-dvh w-full overflow-hidden overscroll-none bg-black"
        data-testid="shorts-player"
        onWheel={onWheel}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-40 flex justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))] lg:justify-start"
          data-testid="shorts-logo-slot"
        >
          <Link
            href="/"
            prefetch={false}
            aria-label={tApp('logo')}
            title={tApp('logo')}
            className="pointer-events-auto inline-flex text-white"
            data-track="navigation:logo"
            data-player-control
            data-testid="shorts-logo"
          >
            <MawLogo
              className="h-6 w-auto drop-shadow-md lg:h-7"
              title={tApp('logo')}
            />
          </Link>
        </div>

        <div className="relative h-full min-w-0 flex-1">
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
                      commentsOpen={commentsOpen}
                      commentCount={commentCount}
                      isPlaying={player.isPlaying}
                      isFullscreen={player.isFullscreen}
                      autoplayBlocked={player.autoplayBlocked}
                      showPlayPause={player.showPlayPause}
                      onTogglePlay={player.togglePlay}
                      onToggleMute={player.toggleMute}
                      onToggleComments={toggleComments}
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

        {isDesktop && (
          <aside
            className={cn(
              'bg-background relative h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-out will-change-[width]',
              commentsOpen ? 'w-[380px] xl:w-[420px]' : 'w-0',
            )}
            aria-label={tComments('sectionTitle')}
            aria-hidden={!commentsOpen}
            inert={!commentsOpen}
            data-player-control
            data-testid="shorts-comments-desktop"
          >
            <div className="border-border flex h-full w-[380px] border-s xl:w-[420px]">
              <ShortsCommentsPanel
                key={player.activeShort.id}
                comments={activeComments}
                onClose={closeComments}
              />
            </div>
          </aside>
        )}
      </div>

      <Drawer open={!isDesktop && commentsOpen} onOpenChange={setCommentsOpen}>
        <DrawerVirtualKeyboardProvider>
          <DrawerContent
            className="h-[80dvh]"
            data-testid="shorts-comments-drawer"
          >
            <DrawerTitle className="sr-only">
              {tComments('sectionTitle')}
            </DrawerTitle>
            <ShortsCommentsPanel
              key={player.activeShort.id}
              comments={activeComments}
              onClose={closeComments}
            />
          </DrawerContent>
        </DrawerVirtualKeyboardProvider>
      </Drawer>
    </>
  );
}
