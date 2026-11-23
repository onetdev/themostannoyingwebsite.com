'use client';

import type { ShortVideoCue } from '@maw/content-sdk';

import { useVideoTime } from './use-video-time';

export interface ShortPlayerCaptionsProps {
  cues: ShortVideoCue[];
  video: HTMLVideoElement | null;
  visible: boolean;
}

function findActiveCue(
  cues: ShortVideoCue[],
  currentTimeMs: number,
): ShortVideoCue | undefined {
  return cues.find(
    (cue) => currentTimeMs >= cue.start_ms && currentTimeMs < cue.end_ms,
  );
}

/**
 * Top-positioned subtitle overlay.
 *
 * The API already returns localized, shot-aligned cues, so the player renders
 * them directly instead of relying on the browser's bottom-anchored native
 * VTT captions (which would also require a CORS-enabled track).
 */
export function ShortPlayerCaptions({
  cues,
  video,
  visible,
}: ShortPlayerCaptionsProps) {
  const currentTimeMs = useVideoTime(video);
  const activeCue = visible ? findActiveCue(cues, currentTimeMs) : undefined;

  if (!activeCue) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-32 z-20 flex justify-center px-6"
      data-testid="short-captions"
    >
      <p className="max-w-[80%] rounded-md bg-black/45 px-3 py-1.5 text-center text-base font-medium whitespace-pre-line text-white shadow-md backdrop-blur-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
        {activeCue.text}
      </p>
    </div>
  );
}
