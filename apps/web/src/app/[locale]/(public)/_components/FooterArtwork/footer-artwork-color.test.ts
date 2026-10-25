import {
  AMBIENT_LIGHT,
  ANALYZER_WOBBLE,
  createCameraState,
  effectiveGamma,
  formatRgb,
  panelColors,
  RESTING_CAMERA,
  RETARDATION_RESPONSE,
  SECONDARY_GAMMA_SCALE,
  simpleTileColor,
  spectralTileColor,
  transmittance,
} from './footer-artwork-color';

const CROSSED = Math.PI / 2;

const channels = (color: readonly number[]) => [...color];

describe('transmittance', () => {
  it('passes all light through parallel polarizers without a film', () => {
    expect(transmittance(0, 0.7, 0, 550)).toBe(1);
  });

  it('leaves only ambient light through crossed polarizers without a film', () => {
    expect(transmittance(0, 0.7, CROSSED, 550)).toBe(AMBIENT_LIGHT);
  });

  it('modulates each wavelength differently once the film is stacked', () => {
    const red = transmittance(600, 0.6, CROSSED, 610);
    const blue = transmittance(600, 0.6, CROSSED, 465);

    expect(red).not.toBeCloseTo(blue, 2);
  });

  it('stays inside the physical bounds', () => {
    for (const gamma of [0, 200, 700, 1600]) {
      for (const wavelength of [380, 465, 550, 610, 780]) {
        const value = transmittance(gamma, 0.4, CROSSED + 0.15, wavelength);

        expect(value).toBeGreaterThanOrEqual(AMBIENT_LIGHT);
        expect(value).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe('simpleTileColor', () => {
  it('is white when nothing is retarded and the polarizers are parallel', () => {
    expect(simpleTileColor(0, 0.9, 0)).toEqual([255, 255, 255]);
  });

  it('renders ambient grey through crossed polarizers', () => {
    const [red, green, blue] = simpleTileColor(0, 0.9, CROSSED);

    expect(red).toBe(Math.round(255 * AMBIENT_LIGHT));
    expect(red).toBe(green);
    expect(green).toBe(blue);
  });

  it('returns integer channels inside the 8-bit range', () => {
    for (const gamma of [180, 420, 900, 1600]) {
      for (const color of [simpleTileColor(gamma, 0.3, CROSSED)]) {
        for (const channel of channels(color)) {
          expect(Number.isInteger(channel)).toBe(true);
          expect(channel).toBeGreaterThanOrEqual(0);
          expect(channel).toBeLessThanOrEqual(255);
        }
      }
    }
  });
});

describe('spectralTileColor', () => {
  it('resolves fully transmitted white to neutral white', () => {
    expect(spectralTileColor(0, 0.9, 0)).toEqual([255, 255, 255]);
  });

  it('resolves the ambient through crossed polarizers to neutral grey', () => {
    const [red, green, blue] = spectralTileColor(0, 0.9, CROSSED);

    expect(red).toBe(green);
    expect(green).toBe(blue);
    expect(red).toBeGreaterThan(0);
    expect(red).toBeLessThan(255);
  });

  it('turns retardation into saturated colour', () => {
    const [red, green, blue] = spectralTileColor(900, 1.0, CROSSED);
    const spread = Math.max(red, green, blue) - Math.min(red, green, blue);

    expect(spread).toBeGreaterThan(30);
  });

  it('gives different retardations different colours', () => {
    expect(spectralTileColor(300, 0.7, CROSSED)).not.toEqual(
      spectralTileColor(900, 0.7, CROSSED),
    );
  });

  it('is deterministic', () => {
    expect(spectralTileColor(733, 0.42, CROSSED)).toEqual(
      spectralTileColor(733, 0.42, CROSSED),
    );
  });

  it('returns integer channels inside the 8-bit range', () => {
    for (const gamma of [180, 420, 900, 1600]) {
      for (const channel of spectralTileColor(gamma, 0.3, CROSSED)) {
        expect(Number.isInteger(channel)).toBe(true);
        expect(channel).toBeGreaterThanOrEqual(0);
        expect(channel).toBeLessThanOrEqual(255);
      }
    }
  });
});

describe('createCameraState', () => {
  it('wobbles the analyzer with the horizontal axis only', () => {
    const left = createCameraState(0.5, 0);
    const below = createCameraState(0, 0.5);

    expect(left.alpha).toBeCloseTo(CROSSED + 0.5 * ANALYZER_WOBBLE, 10);
    expect(below.alpha).toBeCloseTo(CROSSED, 10);
    expect(below.tx).toBe(0);
    expect(below.ty).toBe(0.5);
  });

  it('maps the viewport centre to the resting camera', () => {
    const camera = createCameraState(0, 0);

    expect(camera.alpha).toBeCloseTo(RESTING_CAMERA.alpha, 10);
    expect(camera.tx).toBe(RESTING_CAMERA.tx);
    expect(camera.ty).toBe(RESTING_CAMERA.ty);
  });
});

describe('effectiveGamma', () => {
  it('responds only to tilt along the tile axis', () => {
    const along = createCameraState(0.5, 0);

    expect(effectiveGamma(1000, 0, along)).toBeCloseTo(
      1000 * (1 + 0.5 * RETARDATION_RESPONSE),
      6,
    );
    expect(effectiveGamma(1000, CROSSED, along)).toBeCloseTo(1000, 6);
  });

  it('lets the vertical axis drive tiles turned a quarter turn', () => {
    const below = createCameraState(0, 0.5);

    expect(effectiveGamma(1000, CROSSED, below)).toBeCloseTo(
      1000 * (1 + 0.5 * RETARDATION_RESPONSE),
      6,
    );
  });
});

describe('panelColors', () => {
  const panel = { gamma: 920, phi: 0.62 };

  it('samples the secondary stop further along the film', () => {
    const { primary, secondary } = panelColors(panel, RESTING_CAMERA);

    expect(primary).toEqual(
      spectralTileColor(panel.gamma, panel.phi, RESTING_CAMERA.alpha),
    );
    expect(secondary).toEqual(
      spectralTileColor(
        panel.gamma * SECONDARY_GAMMA_SCALE,
        panel.phi,
        RESTING_CAMERA.alpha,
      ),
    );
  });

  it('recolours when the camera moves', () => {
    const rest = panelColors(panel, RESTING_CAMERA);
    const moved = panelColors(panel, createCameraState(-0.4, 0.3));

    expect(moved.primary).not.toEqual(rest.primary);
  });
});

describe('formatRgb', () => {
  it('emits a CSS colour with space-separated channels', () => {
    expect(formatRgb([12, 34, 56])).toBe('rgb(12 34 56)');
  });
});
