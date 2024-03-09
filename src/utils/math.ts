export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export type Point = { x: number; y: number };
export const midpoint = (p1: Point, p2: Point): Point => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
};

export const radToDeg = (rad: number): number => {
  return (rad * 180) / Math.PI;
};

export const angleRad = (p1: Point, p2: Point): number => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

export const distance = (p1: Point, p2: Point): Point => {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  };
};

export const getWeightedRandom = <T>(
  items: { value: T; prob: number }[],
): T | undefined => {
  const total = items.reduce((carry, curent) => carry + curent.prob, 0);
  const rand = random(0, total);
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items[i].prob;
    if (rand < sum) {
      return items[i].value;
    }
  }
};
