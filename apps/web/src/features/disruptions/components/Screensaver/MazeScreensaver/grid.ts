/**
 * Visits every cell of a row-major grid in order, passing the cell value and its
 * `(x, z)` coordinates. Extracted so grid traversal is testable without mounting
 * the WebGL screensaver.
 */
export function forEachCell(
  grid: number[][],
  visit: (cell: number, x: number, z: number) => void,
): void {
  grid.forEach((row, z) => {
    row.forEach((cell, x) => {
      visit(cell, x, z);
    });
  });
}
