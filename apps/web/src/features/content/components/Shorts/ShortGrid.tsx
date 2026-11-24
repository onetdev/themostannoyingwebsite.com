import type { ShortVideoListItem } from '@maw/content-sdk';

import { ShortCard } from './ShortCard';

export interface ShortGridProps {
  shorts: ShortVideoListItem[];
}

/**
 * Dense, Instagram-style portrait grid used by the shorts archive.
 */
export function ShortGrid({ shorts }: ShortGridProps) {
  return (
    <ul
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      data-testid="short-grid"
    >
      {shorts.map((short) => (
        <li key={short.id}>
          <ShortCard short={short} />
        </li>
      ))}
    </ul>
  );
}
