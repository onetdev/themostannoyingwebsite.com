import { GAMMA_RANGE } from './footer-artwork-color';
import {
  COLUMN_COUNTS,
  createArtworkColumns,
  createArtworkPanels,
  createFooterArtworkPile,
  PANEL_COUNT,
} from './footer-artwork-panels';

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

  it('keeps the film optics inside their physical ranges', () => {
    for (const panel of createArtworkPanels()) {
      expect(panel.gamma).toBeGreaterThanOrEqual(GAMMA_RANGE[0]);
      expect(panel.gamma).toBeLessThanOrEqual(GAMMA_RANGE[1]);
      expect(panel.phi).toBeGreaterThanOrEqual(0);
      expect(panel.phi).toBeLessThanOrEqual(Math.PI / 2);
      expect(panel.opacity).toBeGreaterThanOrEqual(0.82);
      expect(panel.opacity).toBeLessThanOrEqual(0.95);
    }
  });

  it('spreads the retardation across thin and thick stacks', () => {
    const gammas = createArtworkPanels(144).map((panel) => panel.gamma);

    expect(Math.min(...gammas)).toBeLessThan(500);
    expect(Math.max(...gammas)).toBeGreaterThan(1300);
  });

  it('spreads the film axis across the whole quarter turn', () => {
    const axes = createArtworkPanels(144).map((panel) => panel.phi);

    expect(Math.min(...axes)).toBeLessThan(Math.PI / 8);
    expect(Math.max(...axes)).toBeGreaterThan((3 * Math.PI) / 8);
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
