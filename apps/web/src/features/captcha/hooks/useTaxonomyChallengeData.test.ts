import type { SpriteConfig } from '../schemas';
import { buildTilePool } from './useTaxonomyChallengeData';

describe('buildTilePool', () => {
  const mockSprites: SpriteConfig[] = [
    {
      rows: 2,
      columns: 3,
      width: 300,
      height: 200,
      uri: 'test-1.png',
    },
    {
      rows: 3,
      columns: 4,
      width: 400,
      height: 300,
      uri: 'test-2.png',
    },
  ];

  it('should generate empty pool when given empty sprite array', () => {
    const pool = buildTilePool([]);
    expect(pool).toEqual([]);
  });

  it('should generate exact number of tiles equal to sum of rows * columns', () => {
    // 2*3 + 3*4 = 6 + 12 = 18 tiles
    const pool = buildTilePool(mockSprites);
    expect(pool).toHaveLength(18);
  });

  it('should calculate correct (row, col) coordinates within each sprite', () => {
    const pool = buildTilePool(mockSprites);

    // First sprite (2x3): indices 0..5
    expect(pool[0]).toEqual({
      asset: mockSprites[0],
      row: 0,
      col: 0,
    });
    expect(pool[1]).toEqual({
      asset: mockSprites[0],
      row: 0,
      col: 1,
    });
    expect(pool[2]).toEqual({
      asset: mockSprites[0],
      row: 0,
      col: 2,
    });
    expect(pool[3]).toEqual({
      asset: mockSprites[0],
      row: 1,
      col: 0,
    });
    expect(pool[5]).toEqual({
      asset: mockSprites[0],
      row: 1,
      col: 2,
    });

    // Second sprite (3x4): indices 6..17
    expect(pool[6]).toEqual({
      asset: mockSprites[1],
      row: 0,
      col: 0,
    });
    expect(pool[17]).toEqual({
      asset: mockSprites[1],
      row: 2,
      col: 3,
    });
  });
});
