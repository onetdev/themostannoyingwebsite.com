import type { ShortListItem } from '@maw/content-sdk';
import { Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import { Link } from '@/core/i18n/navigation';

import { ShortCard } from './ShortCard';

export interface ShortCarouselProps {
  shorts: ShortListItem[];
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
  const itemWidth = compact ? ITEM_WIDTH.compact : ITEM_WIDTH.default;

  return (
    <ul className="no-scrollbar flex w-full snap-x snap-mandatory gap-2 overflow-x-auto pb-2">
      {shorts.map((short) => (
        <li key={short.id} className={cn('shrink-0 snap-start', itemWidth)}>
          <ShortCard short={short} compact={compact} />
        </li>
      ))}
      <li className={cn('shrink-0 snap-start', itemWidth)}>
        <Link
          href="/shorts"
          prefetch={false}
          className="group flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border bg-muted/40 p-4 text-center transition-colors hover:border-primary/60 hover:bg-muted"
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
  );
}
