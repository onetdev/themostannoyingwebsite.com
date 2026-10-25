/**
 * Colour of a dichroic tile, computed from a simplified physical model.
 *
 * A tile is a stack of birefringent film between two polarizers. For a given
 * wavelength the transmitted fraction is
 *
 *   I(λ) = cos²α − sin(2φ) · sin(2(φ − α)) · sin²(πΓ / λ)
 *
 * where Γ is the retardation of the film stack, φ the film axis relative to the
 * polarizer and α the analyzer angle. With crossed polarizers (α = 90°) the
 * first term vanishes and I(λ) = sin²(2φ) · sin²(πΓ / λ): every wavelength is
 * attenuated differently, so white light leaves as colour.
 *
 * `spectralTileColor` integrates the transmitted spectrum against the CIE 1931
 * colour matching functions and converts XYZ to sRGB; `simpleTileColor` samples
 * three crude wavelengths and is kept as the cheap model the physics is checked
 * against. The footer uses the spectral path: averaging many wavelengths is what
 * produces the pale, washed-out acrylic look instead of pure primaries.
 *
 * Everything here is pure. The "camera" is just an angle, so the same inputs
 * give the same colour on the server, in the browser, and in tests.
 */

export type Rgb = readonly [number, number, number];

export interface TileOptics {
  /** Retardation of the film stack at rest, in nanometres. */
  gamma: number;
  /** Film axis relative to the polarizer, in radians (0 … π/2). */
  phi: number;
}

export interface CameraState {
  /** Horizontal pointer offset from the viewport centre, -0.5 … 0.5. */
  tx: number;
  /** Vertical pointer offset from the viewport centre, -0.5 … 0.5. */
  ty: number;
  /** Analyzer angle in radians, wobbling around crossed (π/2). */
  alpha: number;
}

/** Radians the analyzer turns at the edge of the viewport. */
export const ANALYZER_WOBBLE = 0.3;

/** Fraction of the retardation a full tilt along a tile's own axis adds. */
export const RETARDATION_RESPONSE = 0.6;

/** The second gradient stop is sampled slightly further along the film. */
export const SECONDARY_GAMMA_SCALE = 1.1;

/**
 * Stray light that reaches the eye without passing the analyzer cleanly —
 * diffuse transmission through the acrylic plus the room. Without it tiles
 * whose film axis happens to align with the polarizer would render pure black.
 */
export const AMBIENT_LIGHT = 0.06;

/** Wavelengths sampled by the crude model, in nanometres. */
export const SIMPLE_WAVELENGTHS = [610, 550, 465] as const;

/** Retardation range handed to each tile, in nanometres. */
export const GAMMA_RANGE = [200, 1600] as const;

export const RESTING_CAMERA: CameraState = {
  tx: 0,
  ty: 0,
  alpha: Math.PI / 2,
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Builds the camera state from the pointer's position. The analyzer only turns
 * with the horizontal axis, so moving left/right shifts the overall hue and
 * contrast while moving up/down stays a pure retardation change.
 */
export const createCameraState = (tx: number, ty: number): CameraState => ({
  tx,
  ty,
  alpha: Math.PI / 2 + tx * ANALYZER_WOBBLE,
});

/**
 * The camera changes the path length through the film, so the retardation grows
 * with how far the view has tilted *along that tile's own axis*. Tiles whose
 * axis is perpendicular to the movement barely react; that is what makes the
 * wall change colour unevenly instead of as one sheet.
 */
export const effectiveGamma = (
  gamma: number,
  phi: number,
  camera: CameraState,
) => {
  const tilt = camera.tx * Math.cos(phi) + camera.ty * Math.sin(phi);

  return gamma * (1 + RETARDATION_RESPONSE * tilt);
};

/** Transmitted fraction at one wavelength under the crossed-polarizer model. */
export const transmittance = (
  gamma: number,
  phi: number,
  alpha: number,
  wavelength: number,
): number => {
  const delta = (2 * Math.PI * gamma) / wavelength;
  const crossed = clamp01(
    Math.cos(alpha) ** 2 -
      Math.sin(2 * phi) *
        Math.sin(2 * (phi - alpha)) *
        Math.sin(delta / 2) ** 2,
  );

  return AMBIENT_LIGHT + (1 - AMBIENT_LIGHT) * crossed;
};

/** Three-wavelength approximation: cheap, but saturated and slightly wrong. */
export const simpleTileColor = (
  gamma: number,
  phi: number,
  alpha: number,
): Rgb => {
  const [red, green, blue] = SIMPLE_WAVELENGTHS.map((wavelength) =>
    Math.round(255 * transmittance(gamma, phi, alpha, wavelength)),
  );

  return [red, green, blue];
};

/*
 * Piecewise-Gaussian fit of the CIE 1931 2° colour matching functions
 * (Wyman, Sloan & Shirley, JCGT 2013). Tabled once at module load: the fit
 * costs eight `exp` calls per sample, which is too much to repeat for every
 * tile on every pointer frame.
 */
const lobe = (
  wavelength: number,
  mean: number,
  left: number,
  right: number,
) => {
  const width = wavelength < mean ? left : right;
  const offset = (wavelength - mean) / width;

  return Math.exp(-0.5 * offset * offset);
};

const matchX = (wavelength: number) =>
  1.056 * lobe(wavelength, 599.8, 37.9, 31.0) +
  0.362 * lobe(wavelength, 442.0, 16.0, 26.7) -
  0.065 * lobe(wavelength, 501.1, 20.4, 26.2);

const matchY = (wavelength: number) =>
  0.821 * lobe(wavelength, 568.8, 46.9, 40.5) +
  0.286 * lobe(wavelength, 530.9, 16.3, 31.1);

const matchZ = (wavelength: number) =>
  1.217 * lobe(wavelength, 437.0, 11.8, 36.0) +
  0.681 * lobe(wavelength, 459.0, 26.0, 13.8);

const SPECTRUM_START = 380;
const SPECTRUM_END = 780;
const SPECTRUM_STEP = 5;

const buildSpectrum = () => {
  const wavelengths: number[] = [];
  const x: number[] = [];
  const y: number[] = [];
  const z: number[] = [];

  for (
    let wavelength = SPECTRUM_START;
    wavelength <= SPECTRUM_END;
    wavelength += SPECTRUM_STEP
  ) {
    wavelengths.push(wavelength);
    x.push(matchX(wavelength));
    y.push(matchY(wavelength));
    z.push(matchZ(wavelength));
  }

  // Dividing by the summed luminance turns a fully transmitted white spectrum
  // into Y = 1, so the tiles keep their relative brightness.
  const ySum = y.reduce((total, value) => total + value, 0);

  return { wavelengths, x, y, z, ySum };
};

const SPECTRUM = buildSpectrum();

const sum = (values: readonly number[]) =>
  values.reduce((total, value) => total + value, 0);

/**
 * XYZ → linear sRGB (IEC 61966-2-1). No clamping: out-of-gamut values are
 * handled after chromatic adaptation, where the brightest channel can be
 * scaled down without shifting the hue.
 */
const toLinearRgb = (x: number, y: number, z: number): Rgb => [
  3.2406 * x - 1.5372 * y - 0.4986 * z,
  -0.9689 * x + 1.8758 * y + 0.0415 * z,
  0.0557 * x - 0.204 * y + 1.057 * z,
];

/**
 * Linear sRGB of fully transmitted white light, used as the white balance.
 * The sampled spectrum is an equal-energy illuminant, while sRGB assumes D65;
 * dividing by this white point removes that mismatch (and any residual error
 * in the colour-matching fit) so a tile that transmits everything reads as
 * neutral rather than warm.
 */
const WHITE_LINEAR = toLinearRgb(
  sum(SPECTRUM.x) / SPECTRUM.ySum,
  1,
  sum(SPECTRUM.z) / SPECTRUM.ySum,
);

const linearToSrgb = (value: number) =>
  value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;

/**
 * Full-spectrum colour. The transmitted spectrum is integrated against the
 * colour matching functions, white balanced, mapped to linear sRGB, scaled
 * into gamut, and only then gamma encoded. Sampling 81 wavelengths is what
 * turns pure hues into the soft, slightly desaturated acrylic palette.
 */
export const spectralTileColor = (
  gamma: number,
  phi: number,
  alpha: number,
): Rgb => {
  let x = 0;
  let y = 0;
  let z = 0;

  for (let index = 0; index < SPECTRUM.wavelengths.length; index += 1) {
    const intensity = transmittance(
      gamma,
      phi,
      alpha,
      SPECTRUM.wavelengths[index],
    );

    x += intensity * SPECTRUM.x[index];
    y += intensity * SPECTRUM.y[index];
    z += intensity * SPECTRUM.z[index];
  }

  const linear = toLinearRgb(
    x / SPECTRUM.ySum,
    y / SPECTRUM.ySum,
    z / SPECTRUM.ySum,
  );
  const balanced: Rgb = [
    linear[0] / WHITE_LINEAR[0],
    linear[1] / WHITE_LINEAR[1],
    linear[2] / WHITE_LINEAR[2],
  ];

  const peak = Math.max(balanced[0], balanced[1], balanced[2], 0);
  const scale = peak > 1 ? 1 / peak : 1;
  const encode = (channel: number) =>
    Math.round(255 * linearToSrgb(clamp01(channel * scale)));

  return [encode(balanced[0]), encode(balanced[1]), encode(balanced[2])];
};

export interface PanelColors {
  /** Colour at the tile's own retardation. */
  primary: Rgb;
  /** Colour a little further along the film, for the in-cell gradient. */
  secondary: Rgb;
}

/** Colours a tile shows for the current camera state. */
export const panelColors = (
  optics: TileOptics,
  camera: CameraState,
): PanelColors => {
  const gamma = effectiveGamma(optics.gamma, optics.phi, camera);

  return {
    primary: spectralTileColor(gamma, optics.phi, camera.alpha),
    secondary: spectralTileColor(
      gamma * SECONDARY_GAMMA_SCALE,
      optics.phi,
      camera.alpha,
    ),
  };
};

/** `Rgb` → a CSS colour usable in a custom property. */
export const formatRgb = ([red, green, blue]: Rgb) =>
  `rgb(${red} ${green} ${blue})`;
