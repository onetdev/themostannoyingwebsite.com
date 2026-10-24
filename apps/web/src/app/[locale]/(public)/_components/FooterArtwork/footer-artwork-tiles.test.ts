import {
  createFooterArtworkLayers,
  createPanelSheet,
  hslToHex,
  PANEL_SHEET_HEIGHT,
  PANEL_SHEET_WIDTH,
  type TileFamily,
} from './footer-artwork-tiles';

const FAMILY: TileFamily = {
  hue: [300, 340],
  saturation: [80, 90],
  lightness: [50, 60],
  density: 1,
  highlightChance: 0,
  accentChance: 0,
  accentHue: [0, 0],
};

const decode = (dataUri: string) =>
  decodeURIComponent(dataUri.replace('data:image/svg+xml,', ''));

const countRects = (svg: string) => svg.match(/<rect /g)?.length ?? 0;

describe('hslToHex', () => {
  it('converts primary hues', () => {
    expect(hslToHex(0, 100, 50)).toBe('#ff0000');
    expect(hslToHex(120, 100, 50)).toBe('#00ff00');
    expect(hslToHex(240, 100, 50)).toBe('#0000ff');
  });

  it('converts achromatic colours', () => {
    expect(hslToHex(0, 0, 100)).toBe('#ffffff');
    expect(hslToHex(0, 0, 0)).toBe('#000000');
  });
});

describe('createPanelSheet', () => {
  it('paints a full grid when density is 1', () => {
    const sheet = createPanelSheet(FAMILY, 1);
    const rects = countRects(sheet.svg);

    expect(sheet.width).toBe(PANEL_SHEET_WIDTH);
    expect(sheet.height).toBe(PANEL_SHEET_HEIGHT);
    // A few neighbouring squares merge into wider panels, so the rect count
    // lands just under one per cell.
    expect(rects).toBeGreaterThanOrEqual(96);
    expect(rects).toBeLessThanOrEqual(108);
  });

  it('is deterministic for the same seed', () => {
    expect(createPanelSheet(FAMILY, 42)).toEqual(createPanelSheet(FAMILY, 42));
  });

  it('changes the mosaic for a different seed', () => {
    expect(createPanelSheet(FAMILY, 42).svg).not.toBe(
      createPanelSheet(FAMILY, 43).svg,
    );
  });

  it('keeps every tile inside the sheet', () => {
    const svg = createPanelSheet(FAMILY, 7).svg;
    const tiles = [
      ...svg.matchAll(
        /x='([\d.]+)' y='([\d.]+)' width='([\d.]+)' height='([\d.]+)'/g,
      ),
    ];

    expect(tiles.length).toBeGreaterThan(90);

    for (const [, x, y, width, height] of tiles) {
      expect(Number(x)).toBeGreaterThanOrEqual(0);
      expect(Number(y)).toBeGreaterThanOrEqual(0);
      expect(Number(x) + Number(width)).toBeLessThanOrEqual(PANEL_SHEET_WIDTH);
      expect(Number(y) + Number(height)).toBeLessThanOrEqual(
        PANEL_SHEET_HEIGHT,
      );
    }
  });

  it('exposes an encoded data URI usable as a background image', () => {
    const { dataUri } = createPanelSheet(FAMILY, 1);

    expect(dataUri.startsWith('data:image/svg+xml,')).toBe(true);
    // Raw `#` would terminate the URI at the hash fragment.
    expect(dataUri).not.toContain('#');
  });
});

describe('createFooterArtworkLayers', () => {
  it('builds the three depth planes in back-to-front order', () => {
    expect(createFooterArtworkLayers().map((layer) => layer.id)).toEqual([
      'back',
      'mid',
      'front',
    ]);
  });

  it('moves the front plane faster and further than the back plane', () => {
    const [back, , front] = createFooterArtworkLayers();

    expect(front.duration).toBeLessThan(back.duration);
    expect(front.amplitude).toBeGreaterThan(back.amplitude);
    expect(front.depth).toBeGreaterThan(back.depth);
  });

  it('caches the generated sheets', () => {
    expect(createFooterArtworkLayers()).toBe(createFooterArtworkLayers());
  });

  it('keeps the planes sparse so the front never wallpapers the band', () => {
    const [back, mid, front] = createFooterArtworkLayers();

    const rects = (layer: (typeof back)['dataUri']) =>
      countRects(decode(layer));

    expect(rects(back.dataUri)).toBeGreaterThan(90);
    expect(rects(back.dataUri)).toBeLessThanOrEqual(108);
    expect(rects(mid.dataUri)).toBeLessThan(rects(back.dataUri));
    expect(rects(front.dataUri)).toBeLessThan(rects(mid.dataUri));
  });
});
