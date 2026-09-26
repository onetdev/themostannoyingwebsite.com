import type { Metadata } from 'next';

/**
 * Reusable robots directives so indexability stays consistent across routes.
 */
export const INDEX_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
};

export const NOINDEX_ROBOTS: Metadata['robots'] = {
  // Keep utility/auth pages out of the index, but still let crawlers follow
  // their outbound links (typical recommendation for noindex surfaces).
  index: false,
  follow: true,
};
