import type { Metadata } from 'next';

/**
 * Reusable robots directives so indexability stays consistent across routes.
 */
export const INDEX_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
};

export const NOINDEX_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
};
