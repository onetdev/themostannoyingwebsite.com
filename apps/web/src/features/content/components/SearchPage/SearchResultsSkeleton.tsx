'use client';

import { Skeleton } from '@maw/ui-lib';

export interface SearchResultsSkeletonProps {
  /** Number of placeholder rows to render. */
  count?: number;
}

/**
 * Placeholder rows mirroring {@link SearchResultItem} while a search is in
 * flight. Only shown when the artificial search delay is enabled so quick
 * searches do not flash a skeleton.
 */
export function SearchResultsSkeleton({
  count = 3,
}: SearchResultsSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className="my-4 space-y-6"
      data-testid="search-results-skeleton"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full max-w-screen-md" />
          <Skeleton className="h-4 w-5/6 max-w-screen-md" />
        </div>
      ))}
    </div>
  );
}
