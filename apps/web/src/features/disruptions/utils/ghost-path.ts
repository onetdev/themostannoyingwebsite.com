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

type SplineSegmentOptions = {
  p0: NormalizedPoint;
  p1: NormalizedPoint;
  p2: NormalizedPoint;
  p3: NormalizedPoint;
  t: number;
};

const catmullRom = ({
  p0,
  p1,
  p2,
  p3,
  t,
}: SplineSegmentOptions): NormalizedPoint => {
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
};

/**
 * Turns the random waypoint walk into a smooth Catmull-Rom spline. The result
 * is densely sampled so `left`/`top` keyframe animation reads as one fluid
 * curve instead of a chain of straight lines.
 */
export const smoothGhostPath = (
  points: readonly NormalizedPoint[],
  samplesPerSegment = 10,
): NormalizedPoint[] => {
  const first = points[0];
  const last = points[points.length - 1];

  if (!first || !last) {
    return [];
  }

  if (points.length < 3) {
    return points.map((point) => ({ ...point }));
  }

  const smoothPath: NormalizedPoint[] = [];

  for (let index = 0; index < points.length - 1; index++) {
    const p1 = points[index];
    const p2 = points[index + 1];

    if (!p1 || !p2) {
      continue;
    }

    const p0 = points[index - 1] ?? p1;
    const p3 = points[index + 2] ?? p2;

    for (let sample = 0; sample < samplesPerSegment; sample++) {
      const point = catmullRom({
        p0,
        p1,
        p2,
        p3,
        t: sample / samplesPerSegment,
      });
      smoothPath.push({
        x: clamp(point.x, 0, 1),
        y: clamp(point.y, 0, 1),
      });
    }
  }

  smoothPath.push({ ...last });
  return smoothPath;
};
