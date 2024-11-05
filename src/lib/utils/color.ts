import { useMemo } from 'react';

export type RgbColor = [r: number, g: number, b: number];

const LOW_GAMMA_ADJUST_COEFFICIENT = 1 / 12.92; // low-gamma adjust coefficient
const RED_CHANNEL_WEGHT = 0.2126;
const GREEN_CHANNEL_WEGHT = 0.7152;
const BLUE_CHANNEL_WEGHT = 0.0722;

const parseHexRgb = (value: string): RgbColor | undefined => {
  const isRgbHex = /^#[0-9A-F]{6}$/i.test(value);

  if (!isRgbHex) {
    return undefined;
  }

  const hex = value.replace('#', '');

  return [
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16),
  ];
};

/**
 * Calculate the relative luminance of a color and returning a value
 * between 0 (darkest, black) and 1 (lightest, white).
 * The magic numbers at the and are based on the human eye's sensitivity to
 * different colors.
 *
 * Further readings:
 * - http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 * - https://en.wikipedia.org/wiki/Luminance_(relative)
 * - https://en.wikipedia.org/wiki/Luminosity_function
 * - https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
 * - https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
 **/
export const getRelativeLuminance = (hexRgb: string): number | undefined => {
  const color = parseHexRgb(hexRgb);

  if (!color) {
    return undefined;
  }

  const [r, g, b] = color.map((channel) => {
    const channelFloat = channel / 255;
    const adjusted =
      channelFloat <= 0.03928
        ? channelFloat / LOW_GAMMA_ADJUST_COEFFICIENT
        : Math.pow((channelFloat + 0.055) / 1.055, 2.4);

    return adjusted;
  });

  return (
    r * RED_CHANNEL_WEGHT + g * GREEN_CHANNEL_WEGHT + b * BLUE_CHANNEL_WEGHT
  );
};

export const useRelativeLuminance = (
  hexRgb: string,
  stops: [againstDark: string, againstLight: string],
  fallbackHexRgb?: string,
): string | undefined =>
  useMemo(() => {
    let value = getRelativeLuminance(hexRgb);

    if (!value && fallbackHexRgb) {
      value = getRelativeLuminance(fallbackHexRgb);
    }

    return (value ?? -1) < 0.5 ? stops[0] : stops[1];
  }, [fallbackHexRgb, hexRgb, stops]);
