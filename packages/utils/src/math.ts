export type Point2d = { x: number; y: number };

export const isPoint2d = (point: unknown): point is Point2d => {
  return (
    point !== null &&
    typeof point === 'object' &&
    'x' in point &&
    typeof point.x === 'number' &&
    'y' in point &&
    typeof point.y === 'number'
  );
};

export const angleRad = (p1: Point2d, p2: Point2d): number => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const getInterpolatedPoint = (
  p1: Point2d,
  p2: Point2d,
  percentage: 0.5,
): Point2d => {
  return {
    x: (p1.x + p2.x) * percentage,
    y: (p1.y + p2.y) * percentage,
  };
};

export const getPointDistance = (p1: Point2d, p2: Point2d): Point2d => {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  };
};

export const radToDeg = (rad: number): number => {
  return (rad * 180) / Math.PI;
};

export const mapToLogScale = (
  score: number,
  maxInput: number,
  maxOutput: number,
): number => {
  if (score <= 0) {
    return 0;
  }

  const logScore = Math.log(score);
  const logMaxInput = Math.log(maxInput);

  return (logScore / logMaxInput) * maxOutput;
};
