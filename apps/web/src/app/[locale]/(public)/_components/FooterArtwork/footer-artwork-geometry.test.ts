import {
  FOOTER_ARTWORK_CELL_ASPECT,
  FOOTER_ARTWORK_CELL_MAX,
  FOOTER_ARTWORK_CELL_MIN,
  getFooterArtworkGrid,
} from './footer-artwork-geometry';

const stage = { width: 1280, height: 405 };

describe('getFooterArtworkGrid', () => {
  it('uses a whole number of columns and rows', () => {
    for (const [width, height] of [
      [320, 380],
      [768, 405],
      [1280, 405],
      [1440, 405],
      [2560, 405],
    ] as const) {
      const grid = getFooterArtworkGrid(width, height);

      expect(Number.isInteger(grid.columns)).toBe(true);
      expect(Number.isInteger(grid.rows)).toBe(true);
      expect(grid.columns).toBeGreaterThan(0);
      expect(grid.rows).toBeGreaterThan(0);
    }
  });

  it('fits the stage exactly, so no tile is cropped', () => {
    const grid = getFooterArtworkGrid(stage.width, stage.height);

    expect(grid.columns * grid.cellWidth).toBeCloseTo(stage.width, 5);
    expect(grid.rows * grid.cellHeight).toBeCloseTo(stage.height, 5);
  });

  it('keeps the target tile width near the half-size range', () => {
    expect(getFooterArtworkGrid(320, 380).cellWidth).toBeGreaterThanOrEqual(
      FOOTER_ARTWORK_CELL_MIN * 0.95,
    );
    expect(getFooterArtworkGrid(2560, 405).cellWidth).toBeLessThanOrEqual(
      FOOTER_ARTWORK_CELL_MAX * 1.05,
    );
  });

  it('stays close to the reference landscape tile ratio', () => {
    for (const [width, height] of [
      [320, 380],
      [768, 405],
      [1280, 405],
      [1440, 405],
      [2560, 405],
    ] as const) {
      const grid = getFooterArtworkGrid(width, height);
      const aspect =
        (grid.cellWidth * FOOTER_ARTWORK_CELL_ASPECT) / grid.cellHeight;

      expect(aspect).toBeGreaterThan(0.9);
      expect(aspect).toBeLessThan(1.1);
    }
  });

  it('never collapses for degenerate dimensions', () => {
    const grid = getFooterArtworkGrid(0, 0);

    expect(grid.columns).toBe(1);
    expect(grid.rows).toBe(1);
    expect(grid.cellWidth).toBe(1);
    expect(grid.cellHeight).toBe(1);
  });
});
