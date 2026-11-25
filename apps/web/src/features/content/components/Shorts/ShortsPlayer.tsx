'use client';

import type { ShortVideoListItem } from '@maw/content-sdk';
import { Carousel, CarouselContent, CarouselItem } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type WheelEvent,
} from 'react';
import { MawLogo } from '@/components/MawLogo';
import { Link } from '@/core/i18n/navigation';
import { ShortsCommentsPanel } from '@/features/comments/components';
import type { Comment } from '@/features/comments/schemas';
import { countComments } from '@/features/comments/utils';

import { ShortPlayerBackdrop } from './ShortPlayerBackdrop';
import { ShortPlayerOverlay } from './ShortPlayerOverlay';
import { ShortPlayerSlide } from './ShortPlayerSlide';
import { useShortFeedWheel } from './use-short-feed-wheel';
import { useShortPlayer } from './use-short-player';
import { useShortsSheetDrag } from './use-shorts-sheet-drag';

export interface ShortsPlayerProps {
  shorts: ShortVideoListItem[];
  initialIndex: number;
  commentsByShortId?: Record<string, Comment[]>;
}

const EMPTY_COMMENTS: Comment[] = [];
const EMPTY_COMMENTS_BY_SHORT: Record<string, Comment[]> = {};

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
  const sheetRef = useRef<HTMLElement>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [likedShortIds, setLikedShortIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const scrollByWheel = useShortFeedWheel({
    onNext: player.next,
    onPrevious: player.previous,
  });

  const closeComments = useCallback(() => setCommentsOpen(false), []);
  const toggleComments = useCallback(() => {
    // Reset a previous drag offset before the sheet reopens.
    sheetRef.current?.style.setProperty('--shorts-sheet-drag', '0px');
    setCommentsOpen((current) => !current);
  }, []);
  const { handleProps } = useShortsSheetDrag({
    sheetRef,
    onDismiss: closeComments,
  });

  // Focus the surface so player shortcuts yield to the open comments panel.
  useEffect(() => {
    if (commentsOpen) {
      sheetRef.current?.focus();
    }
  }, [commentsOpen]);

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

      <section
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex h-[80dvh] w-full flex-col overflow-hidden rounded-t-2xl border-t border-border bg-background text-foreground shadow-xl outline-none transition-[transform,width] duration-300 ease-out',
          commentsOpen
            ? '[transform:translateY(var(--shorts-sheet-drag,0px))]'
            : '[transform:translateY(calc(100%+1rem))]',
          'data-dragging:transition-none',
          'lg:static lg:z-auto lg:h-full lg:shrink-0 lg:rounded-none lg:border-t-0 lg:shadow-none lg:transition-[width]',
          commentsOpen ? 'lg:w-[380px] xl:w-[420px]' : 'lg:w-0',
          'lg:[transform:none]',
        )}
        ref={sheetRef}
        aria-label={tComments('sectionTitle')}
        aria-hidden={!commentsOpen}
        inert={!commentsOpen}
        tabIndex={-1}
        data-comments-panel
        data-player-control
        data-testid="shorts-comments-sheet"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            closeComments();
          }
        }}
      >
        <div className="border-border flex h-full w-full flex-col lg:w-[380px] lg:border-s xl:w-[420px]">
          <div
            className="flex shrink-0 touch-none justify-center pt-2 pb-1 select-none lg:hidden"
            data-testid="shorts-comments-handle"
            {...handleProps}
          >
            <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
          </div>
          <ShortsCommentsPanel
            key={player.activeShort.id}
            comments={activeComments}
            onClose={closeComments}
          />
        </div>
      </section>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden',
          commentsOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
        data-player-control
        data-testid="shorts-comments-backdrop"
        onClick={closeComments}
      />
    </div>
  );
}
