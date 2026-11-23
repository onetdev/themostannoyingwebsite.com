import type { ShortListItem } from '@maw/content-sdk';
import { cn } from 'cn';

import { ShortCard } from './ShortCard';

export interface ShortGridProps {
  shorts: ShortListItem[];
  /** Heading level used by each card title. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

/**
 * Dense, Instagram-style portrait grid used by the archive and author pages.
 */
export function ShortGrid({
  shorts,
  headingLevel = 2,
  className,
}: ShortGridProps) {
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        className,
      )}
      data-testid="short-grid"
    >
      {shorts.map((short) => (
        <li key={short.id}>
          <ShortCard
            short={short}
            headingLevel={headingLevel}
            data-testid="short-grid-item"
          />
        </li>
      ))}
    </ul>
  );
}
