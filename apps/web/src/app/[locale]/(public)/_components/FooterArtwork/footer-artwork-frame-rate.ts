/**
 * Rolling display-frame-rate sampler.
 *
 * The footer wall schedules a requestAnimationFrame tick every display frame
 * but only repaints the shader at 30fps. The debug meter intentionally records
 * every tick, so it reports the display cadence (usually 60 or 120), not the
 * shader's lower repaint rate.
 *
 * Pure and dependency-free so the timing rules can be tested without React or
 * a browser. A gap longer than `gapMs` means the loop was paused (offscreen,
 * hidden tab, reduced motion), so the old samples must not drag the next
 * reading down.
 */

export interface FrameRateSamplerOptions {
  /** Samples older than this are discarded. */
  windowMs?: number;
  /** A pause longer than this resets the window. */
  gapMs?: number;
}

export interface FrameRateSampler {
  /** Records one requestAnimationFrame timestamp. */
  record: (timestamp: number) => void;
  /** Current frames per second across the rolling window, or 0. */
  read: () => number;
  /** Clears all samples. */
  reset: () => void;
}

const DEFAULT_WINDOW_MS = 1000;
const DEFAULT_GAP_MS = 250;

export const createFrameRateSampler = ({
  windowMs = DEFAULT_WINDOW_MS,
  gapMs = DEFAULT_GAP_MS,
}: FrameRateSamplerOptions = {}): FrameRateSampler => {
  let samples: number[] = [];

  const record = (timestamp: number) => {
    const last = samples.at(-1);

    if (last !== undefined && timestamp - last > gapMs) {
      samples = [];
    }

    samples.push(timestamp);

    const cutoff = timestamp - windowMs;

    while (samples.length > 0 && (samples[0] ?? 0) < cutoff) {
      samples.shift();
    }
  };

  const read = () => {
    const first = samples[0];
    const last = samples.at(-1);

    if (first === undefined || last === undefined || samples.length < 2) {
      return 0;
    }

    const span = last - first;

    if (span <= 0) {
      return 0;
    }

    return ((samples.length - 1) * 1000) / span;
  };

  const reset = () => {
    samples = [];
  };

  return { record, read, reset };
};
