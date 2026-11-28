export type NormalizedPoint = {
  x: number;
  y: number;
};

export type GhostPathOptions = {
  start: NormalizedPoint;
  steps: number;
  minStep?: number;
  maxStep?: number;
  margin?: number;
  rng?: () => number;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/**
 * Builds a random walk in normalized viewport space. Keeping the points as
 * fractions means the ghost layer can use percentage offsets and stay correct
 * across resizes without ever overflowing the viewport.
 */
export const buildGhostPath = ({
  start,
  steps,
  minStep = 0.08,
  maxStep = 0.3,
  margin = 0.04,
  rng = Math.random,
}: GhostPathOptions): NormalizedPoint[] => {
  const lowerBound = clamp(margin, 0, 0.5);
  const upperBound = 1 - lowerBound;
  const path: NormalizedPoint[] = [
    {
      x: clamp(start.x, lowerBound, upperBound),
      y: clamp(start.y, lowerBound, upperBound),
    },
  ];

  for (let index = 0; index < steps; index++) {
    const previous = path[path.length - 1];
    if (!previous) {
      break;
    }

    const angle = rng() * Math.PI * 2;
    const distance = minStep + rng() * (maxStep - minStep);

    const candidate: NormalizedPoint = {
      x: clamp(previous.x + Math.cos(angle) * distance, lowerBound, upperBound),
      y: clamp(previous.y + Math.sin(angle) * distance, lowerBound, upperBound),
    };

    // Clamping at a viewport edge can collapse a leg to zero length. Walk the
    // opposite way in that case so the ghost always visibly moves.
    if (Math.hypot(candidate.x - previous.x, candidate.y - previous.y) < 0.01) {
      candidate.x = clamp(
        previous.x - Math.cos(angle) * distance,
        lowerBound,
        upperBound,
      );
      candidate.y = clamp(
        previous.y - Math.sin(angle) * distance,
        lowerBound,
        upperBound,
      );
    }

    path.push(candidate);
  }

  return path;
};
