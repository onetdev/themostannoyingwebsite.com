import { forEachCell } from './grid';

describe('forEachCell', () => {
  it('visits every cell with its x/z coordinates in row-major order', () => {
    const grid = [
      [1, 2],
      [3, 4],
    ];
    const visited: Array<[number, number, number]> = [];

    forEachCell(grid, (cell, x, z) => visited.push([cell, x, z]));

    expect(visited).toEqual([
      [1, 0, 0],
      [2, 1, 0],
      [3, 0, 1],
      [4, 1, 1],
    ]);
  });

  it('does not visit anything for an empty grid', () => {
    const visit = jest.fn();

    forEachCell([], visit);

    expect(visit).not.toHaveBeenCalled();
  });
});
