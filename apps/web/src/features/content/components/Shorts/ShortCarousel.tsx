'use client';

import type { ShortVideoListItem } from '@maw/content-sdk';
import { Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/core/i18n/navigation';

import { ShortCard } from './ShortCard';

export interface ShortCarouselProps {
  shorts: ShortVideoListItem[];
  /** Label for the trailing "view all" tile. */
  ctaLabel: string;
  /** Telemetry event name for the trailing tile. */
  ctaTrack: string;
  compact?: boolean;
}

const ITEM_WIDTH = {
  default: 'w-40 sm:w-48 lg:w-[200px]',
  compact: 'w-32 sm:w-36 lg:w-40',
};

const ARROW_CLASS =
  'absolute top-1/2 z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background sm:flex';

/**
 * Single-row, horizontally scrollable shelf of shorts with a trailing tile
 * that links to the archive. Used by curated surfaces such as home and author
 * profiles; the archive itself keeps the dense grid.
 */
export function ShortCarousel({
  shorts,
  ctaLabel,
  ctaTrack,
  compact = false,
}: ShortCarouselProps) {
  const t = useTranslations('content.shorts');
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const itemWidth = compact ? ITEM_WIDTH.compact : ITEM_WIDTH.default;

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const updateScrollState = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const position = Math.abs(track.scrollLeft);

      setCanScrollBack(position > 1);
      setCanScrollForward(position < maxScroll - 1);
    };

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });

    const observer =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(updateScrollState);
    observer?.observe(track);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      observer?.disconnect();
    };
  }, []);

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const isRtl = getComputedStyle(track).direction === 'rtl';
    const amount = track.clientWidth * 0.8 * (isRtl ? -1 : 1);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 'auto'
      : 'smooth';

    track.scrollBy({ left: direction * amount, behavior });
  };

  if (shorts.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="no-scrollbar flex w-full snap-x snap-mandatory gap-2 overflow-x-auto pb-2"
      >
        {shorts.map((short) => (
          <li key={short.id} className={cn('shrink-0 snap-start', itemWidth)}>
            <ShortCard short={short} compact={compact} />
          </li>
        ))}
        <li className={cn('shrink-0 snap-start', itemWidth)}>
          <Link
            href="/shorts"
            prefetch={false}
            className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border bg-muted/40 p-4 text-center transition-colors hover:border-primary/60 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            data-testid="shorts-archive-link"
            data-track={ctaTrack}
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-background text-foreground shadow-sm">
              <Icon icon="clapperboard" className="size-5" aria-hidden />
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-balance">
              {ctaLabel}
              {!compact && (
                <Icon
                  icon="chevronRight"
                  className="size-4 text-muted-foreground rtl:rotate-180"
                  aria-hidden
                />
              )}
            </span>
          </Link>
        </li>
      </ul>

      {canScrollBack && (
        <button
          type="button"
          onClick={() => scroll(-1)}
          className={cn(ARROW_CLASS, 'start-2')}
          aria-label={t('scrollPrevious')}
        >
          <Icon
            icon="chevronLeft"
            className="size-4 rtl:rotate-180"
            aria-hidden
          />
        </button>
      )}
      {canScrollForward && (
        <button
          type="button"
          onClick={() => scroll(1)}
          className={cn(ARROW_CLASS, 'end-2')}
          aria-label={t('scrollNext')}
        >
          <Icon
            icon="chevronRight"
            className="size-4 rtl:rotate-180"
            aria-hidden
          />
        </button>
      )}
    </div>
  );
}
