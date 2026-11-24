/**
 * Formats a short-form clip duration as `m:ss`.
 *
 * Durations are rounded up so an 8.042s clip reads as `0:09` rather than
 * under-reporting the final second.
 */
export function formatShortDuration(durationMs: number): string {
  const totalSeconds = Math.max(0, Math.ceil(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
