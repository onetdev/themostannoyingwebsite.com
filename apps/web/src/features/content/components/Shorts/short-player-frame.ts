/**
 * Shared viewport frame for the vertical feed.
 *
 * Mobile: the clip fills the viewport. Desktop: the 9:16 frame is capped to the
 * viewport height and centered, with the action rail overlaid on it.
 */
export const SHORT_PLAYER_FRAME_CLASS =
  'relative h-full w-full overflow-hidden bg-black sm:h-[calc(100dvh-1.5rem)] sm:w-auto sm:max-w-[min(100%,calc((100dvh-1.5rem)*9/16))] sm:rounded-xl';
