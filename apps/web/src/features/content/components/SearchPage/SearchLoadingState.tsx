'use client';

import { LoadingMessages } from '../LoadingMessages';
import { SearchResultsSkeleton } from './SearchResultsSkeleton';

export interface SearchLoadingStateProps {
  /**
   * Render placeholder rows in addition to the rotating status line. Enabled
   * when the artificial search delay is on.
   */
  showSkeleton?: boolean;
}

/**
 * In-flight search state: an always-visible rotating status line, plus a
 * skeleton result list when the artificial delay makes the wait meaningful.
 */
export function SearchLoadingState({
  showSkeleton = false,
}: SearchLoadingStateProps) {
  return (
    <div className="my-6">
      <LoadingMessages />
      {showSkeleton && <SearchResultsSkeleton />}
    </div>
  );
}
