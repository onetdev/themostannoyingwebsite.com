import { buildGridSeries } from './useTilePuzzleData';

describe('buildGridSeries', () => {
  it('produces cols × rows coordinates starting at (1, 1)', () => {
    const { coords, resolutions } = buildGridSeries(2, 3);

    expect(coords).toHaveLength(6);
    expect(resolutions).toHaveLength(6);
    expect(coords[0]).toEqual({ x: 1, y: 1 });
    expect(coords).toContainEqual({ x: 2, y: 3 });
    expect(resolutions).toEqual(coords);
  });

  it('returns empty series for a zero-sized grid', () => {
    expect(buildGridSeries(0, 5)).toEqual({ coords: [], resolutions: [] });
  });
});
