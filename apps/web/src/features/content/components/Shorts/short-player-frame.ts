import type { ShortVideo, ShortVideoListItem } from '@maw/content-sdk';
import type { CSSProperties } from 'react';

/**
 * Shared viewport frame for the vertical feed.
 *
 * Mobile: the clip fills the viewport. Desktop: the 9:16 frame is capped to the
 * viewport height and centered, with the action rail overlaid on it.
 *
 * Keep this frame transparent: the player overlay reuses it to align its
 * controls over the active clip. Only the slide surface paints black.
 */
export const SHORT_PLAYER_FRAME_CLASS =
  'relative h-full w-full overflow-hidden sm:h-[calc(100dvh-1.5rem)] sm:w-auto sm:max-w-[min(100%,calc((100dvh-1.5rem)*9/16))] sm:rounded-xl';

/** The opaque media surface owned by a slide. */
export const SHORT_PLAYER_SURFACE_CLASS = `${SHORT_PLAYER_FRAME_CLASS} bg-black`;

type ShortFrameSource = Pick<
  ShortVideo | ShortVideoListItem,
  'width' | 'height'
>;

/**
 * Aspect-ratio style for a clip frame.
 *
 * The slide surface and the player overlay must size their frames identically,
 * otherwise the controls drift away from the clip on non-vertical renditions.
 */
export function buildShortFrameStyle(short: ShortFrameSource): CSSProperties {
  return {
    aspectRatio: `${short.width} / ${short.height}`,
  };
}
