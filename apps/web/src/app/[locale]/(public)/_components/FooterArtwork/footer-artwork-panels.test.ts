import {
  COLUMN_COUNTS,
  createArtworkColumns,
  createArtworkPanels,
  createFooterArtworkPile,
  PANEL_COUNT,
} from './footer-artwork-panels';

/** Wider sample used for the palette and tone statistics. */
const SAMPLE_SIZE = 144;

const readNumber = (style: Record<string, unknown>, key: string) =>
  Number(style[key]);

const readStyles = (count = PANEL_COUNT) =>
  createArtworkPanels(count).map(
    (panel) => panel.style as Record<string, unknown>,
  );

describe('createArtworkColumns', () => {
  it('is deterministic for a given seed', () => {
    expect(createArtworkColumns()).toEqual(createArtworkColumns());
  });

  it('produces a different pile for a different seed', () => {
    expect(createArtworkColumns(COLUMN_COUNTS, 1)).not.toEqual(
      createArtworkColumns(COLUMN_COUNTS, 2),
    );
  });

  it('follows the bell-curve column shape', () => {
    const columns = createArtworkColumns();

    expect(columns.map((column) => column.panels.length)).toEqual([
      ...COLUMN_COUNTS,
    ]);
    expect(columns.flatMap((column) => column.panels)).toHaveLength(
      PANEL_COUNT,
    );
  });

  it('gives every square a unique id', () => {
    const ids = createArtworkColumns()
      .flatMap((column) => column.panels)
      .map((panel) => panel.id);

    expect(new Set(ids).size).toBe(PANEL_COUNT);
  });

  it('keeps every panel inside the dye envelope', () => {
    for (const style of readStyles()) {
      const primaryHue = readNumber(style, '--panel-h1');
      const secondaryHue = readNumber(style, '--panel-h2');
      const lightness = readNumber(style, '--panel-l');
      const chroma = readNumber(style, '--panel-c');
      const alpha = readNumber(style, '--panel-alpha');
      const rim = readNumber(style, '--panel-rim');

      expect(primaryHue).toBeGreaterThanOrEqual(0);
      expect(primaryHue).toBeLessThan(360);
      expect(secondaryHue).toBeGreaterThanOrEqual(0);
      expect(secondaryHue).toBeLessThan(360);
      expect(lightness).toBeGreaterThanOrEqual(0.3);
      expect(lightness).toBeLessThanOrEqual(0.93);
      expect(chroma).toBeGreaterThan(0);
      expect(chroma).toBeLessThanOrEqual(0.25);
      expect(alpha).toBeGreaterThanOrEqual(0.7);
      expect(alpha).toBeLessThanOrEqual(0.95);
      expect(rim).toBeGreaterThan(0);
      expect(rim).toBeLessThanOrEqual(0.3);
    }
  });

  it('keeps the interior dye offsets inside the cell', () => {
    for (const style of readStyles()) {
      for (const key of [
        '--panel-x1',
        '--panel-y1',
        '--panel-x2',
        '--panel-y2',
      ]) {
        const value = Number.parseFloat(String(style[key]));

        expect(value).toBeGreaterThanOrEqual(10);
        expect(value).toBeLessThanOrEqual(90);
      }

      const angle = Number.parseFloat(String(style['--panel-angle']));
      expect(angle).toBeGreaterThanOrEqual(120);
      expect(angle).toBeLessThanOrEqual(220);
    }
  });

  it('gives every square its own dye travel', () => {
    const styles = readStyles();
    const travels = new Set(
      styles.map(
        (style) =>
          `${style['--dye-x']}|${style['--dye-y']}|${style['--dye-r']}`,
      ),
    );

    expect(travels.size).toBe(PANEL_COUNT);

    for (const style of styles) {
      const x = Math.abs(Number.parseFloat(String(style['--dye-x'])));
      const y = Math.abs(Number.parseFloat(String(style['--dye-y'])));
      const rotation = Math.abs(Number.parseFloat(String(style['--dye-r'])));

      expect(x).toBeGreaterThanOrEqual(5);
      expect(x).toBeLessThanOrEqual(11);
      expect(y).toBeGreaterThanOrEqual(3);
      expect(y).toBeLessThanOrEqual(8);
      expect(rotation).toBeLessThanOrEqual(3.5);
    }
  });

  it('samples the plate inside the edge buffer in quarter turns', () => {
    for (const style of readStyles()) {
      for (const key of ['--panel-bg-x', '--panel-bg-y']) {
        const value = Number.parseFloat(String(style[key]));

        expect(value).toBeGreaterThanOrEqual(10);
        expect(value).toBeLessThanOrEqual(90);
      }

      const turn = Number.parseFloat(String(style['--panel-turn']));
      expect([0, 90, 180, 270]).toContain(turn);
    }
  });

  it('spreads the palette across cool and warm dyes', () => {
    const hues = readStyles(SAMPLE_SIZE).map((style) =>
      readNumber(style, '--panel-h1'),
    );

    expect(Math.min(...hues)).toBeLessThan(150);
    expect(Math.max(...hues)).toBeGreaterThan(320);
  });

  it('includes burnt-out and near-black panels across a full sample', () => {
    const lightness = readStyles(SAMPLE_SIZE).map((style) =>
      readNumber(style, '--panel-l'),
    );

    expect(lightness.some((value) => value > 0.8)).toBe(true);
    expect(lightness.some((value) => value < 0.45)).toBe(true);
  });
});

describe('createFooterArtworkPile', () => {
  it('builds the bell-curve pile', () => {
    const pile = createFooterArtworkPile();

    expect(pile.columns.map((column) => column.panels.length)).toEqual([
      ...COLUMN_COUNTS,
    ]);
  });

  it('caches the pile data', () => {
    expect(createFooterArtworkPile()).toBe(createFooterArtworkPile());
  });
});
