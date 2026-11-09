/**
 * Integer grid for the footer wall.
 *
 * The wall is full-bleed and must never show a cropped tile. We therefore pick
 * a whole number of columns and rows first, then derive the cell size from the
 * stage dimensions. The band height stays fixed, so the cells stretch by a few
 * percent vertically instead of leaving a partial row at the bottom.
 *
 * The target width is roughly half of the previous card size: the reference
 * wall is dense, and a finer grid reads as a sheet of glass rather than a row
 * of large cards.
 */

export const FOOTER_ARTWORK_CELL_MIN = 26;
export const FOOTER_ARTWORK_CELL_MAX = 44;
export const FOOTER_ARTWORK_CELL_RATIO = 0.03;
export const FOOTER_ARTWORK_CELL_ASPECT = 1.25;

export interface FooterArtworkGrid {
  /** Whole number of columns across the stage. */
  columns: number;
  /** Whole number of rows down the stage. */
  rows: number;
  /** Exact cell width in CSS pixels: `stageWidth / columns`. */
  cellWidth: number;
  /** Exact cell height in CSS pixels: `stageHeight / rows`. */
  cellHeight: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const getFooterArtworkGrid = (
  viewportWidth: number,
  viewportHeight: number,
): FooterArtworkGrid => {
  const width = Math.max(1, viewportWidth);
  const height = Math.max(1, viewportHeight);
  const targetWidth = clamp(
    width * FOOTER_ARTWORK_CELL_RATIO,
    FOOTER_ARTWORK_CELL_MIN,
    FOOTER_ARTWORK_CELL_MAX,
  );

  const columns = Math.max(1, Math.round(width / targetWidth));
  const cellWidth = width / columns;
  const rows = Math.max(
    1,
    Math.round(height / (cellWidth * FOOTER_ARTWORK_CELL_ASPECT)),
  );

  return {
    columns,
    rows,
    cellWidth,
    cellHeight: height / rows,
  };
};
