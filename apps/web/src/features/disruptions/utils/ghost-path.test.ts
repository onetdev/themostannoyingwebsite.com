import { buildGhostPath, type NormalizedPoint } from './ghost-path';

const distance = (a: NormalizedPoint, b: NormalizedPoint): number =>
  Math.hypot(a.x - b.x, a.y - b.y);

describe('buildGhostPath', () => {
  it('starts at the requested point and adds the requested steps', () => {
    const path = buildGhostPath({
      start: { x: 0.5, y: 0.5 },
      steps: 6,
      rng: () => 0.25,
    });

    expect(path).toHaveLength(7);
    expect(path[0]).toEqual({ x: 0.5, y: 0.5 });
  });

  it('keeps every point inside the padded viewport', () => {
    let seed = 0;
    const rng = () => {
      seed = (seed * 16807 + 11) % 2147483647;
      return seed / 2147483647;
    };

    const path = buildGhostPath({
      start: { x: 0.02, y: 0.98 },
      steps: 20,
      margin: 0.04,
      rng,
    });

    for (const point of path) {
      expect(point.x).toBeGreaterThanOrEqual(0.04);
      expect(point.x).toBeLessThanOrEqual(0.96);
      expect(point.y).toBeGreaterThanOrEqual(0.04);
      expect(point.y).toBeLessThanOrEqual(0.96);
    }
  });

  it('never produces a zero-length leg, even at the viewport edges', () => {
    const path = buildGhostPath({
      start: { x: 0.04, y: 0.04 },
      steps: 12,
      margin: 0.04,
      minStep: 0.08,
      maxStep: 0.08,
      rng: () => 0,
    });

    for (let index = 1; index < path.length; index++) {
      expect(
        distance(
          path[index - 1] as NormalizedPoint,
          path[index] as NormalizedPoint,
        ),
      ).toBeGreaterThan(0.01);
    }
  });
});
