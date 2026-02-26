import type { TypeNarrowArg } from './types';

export type Point2d = { x: number; y: number };

export const isPoint2d = (point: TypeNarrowArg): point is Point2d => {
  return (
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

export type WeightedRandomPoolItem<T> = { value: T; weight: number };
export const getWeightedRandom = <T>(
  itemsRaw: WeightedRandomPoolItem<T>[],
): T | undefined => {
  const items = itemsRaw.filter((item) => item.weight > 0);
  const total = items.reduce((carry, curent) => carry + curent.weight, 0);
  const rand = random(0, total);
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items[i]?.weight ?? 0;
    if (rand <= sum) {
      return items[i]?.value;
    }
  }
};

export const radToDeg = (rad: number): number => {
  return (rad * 180) / Math.PI;
};

export const random = (
  min: number,
  max: number,
  integerResult = false,
): number => {
  const result = Math.random() * (max - min) + min;
  return integerResult ? Math.floor(result) : result;
};

export const randomInt = (min: number, max: number): number => {
  return Math.floor(random(min, max, true));
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
