import { createGlobalStyle } from 'styled-components';

// Using styled-components provided theme is great and all but I'm losing
// in-browser variable modifications. It's easy to get the current OS
// theme but when it comes down to user defined in-browser dark mode,
// the story changes quickly.
// So, even though this is not the perfect solution, it works fine.

// For more info:
// https://material.io/design/color/the-color-system.html#color-theme-creation

const breakpoints = {
  xs: '0',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};

const cssRulePrefix = '@media screen and';
const cssRuleMinMax = (min: string, max: string) =>
  `(min-width: ${min}) and (max-width: ${max})`;
export const cssRule = {
  // Strictly targeted dimensions
  xs: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.xs, breakpoints.sm)}`,
  sm: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.sm, breakpoints.md)}`,
  md: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.md, breakpoints.lg)}`,
  lg: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.lg, breakpoints.xl)}`,
  xl: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.xl, breakpoints.xxl)}`,
  xxl: `${cssRulePrefix} (min-width: ${breakpoints.xxl})`,
  // Targeting without uppper limit
  xsUp: `${cssRulePrefix} (min-width: ${breakpoints.xs})`,
  smUp: `${cssRulePrefix} (min-width: ${breakpoints.sm})`,
  mdUp: `${cssRulePrefix} (min-width: ${breakpoints.md})`,
  lgUp: `${cssRulePrefix} (min-width: ${breakpoints.lg})`,
  xlUp: `${cssRulePrefix} (min-width: ${breakpoints.xl})`,
  xxlUp: `${cssRulePrefix} (min-width: ${breakpoints.xxl})`,
  // Targeting without lower limit
  xsDown: `${cssRulePrefix} (max-width: ${breakpoints.sm})`,
  smDown: `${cssRulePrefix} (max-width: ${breakpoints.md})`,
  mdDown: `${cssRulePrefix} (max-width: ${breakpoints.lg})`,
  lgDown: `${cssRulePrefix} (max-width: ${breakpoints.xl})`,
  xlDown: `${cssRulePrefix} (max-width: ${breakpoints.xxl})`,
  xxlDown: `${cssRulePrefix}`,
};

export const DarkTheme = {
  colors: {
    background: '#050416',
    primary: '#00bcd4',
    primaryAlt: '#00acc1',
    secondary: '#ffc107',
    secondaryAlt: '#ffb300',
    tertiary: '#ff5722',
    tertiaryAlt: '#ff5722',
    surface: '#141221',
    error: '#f44336',
    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onTertiary: '#000000',
    onBackground: '#fff',
    onSurface: '#fff',
    onError: '#fff',
    dimmer: '#464646b5',
  },
};

export const LightTheme = {
  colors: {
    background: '#fafafa',
    primary: '#00b0c0',
    primaryAlt: '#028aa5',
    secondary: '#991199',
    secondaryAlt: '#660159',
    tertiary: '#ee4917',
    tertiaryAlt: '#d33d0f',
    surface: '#f3f5ec',
    error: '#f44034',
    onPrimary: '#fff',
    onSecondary: '#050416',
    onTertiary: '#050416',
    onBackground: '#050416',
    onSurface: '#050416',
    onError: '#050416',
    dimmer: '#3a3a3abc',
  },
};

export interface ThemeProps {
  colors: Record<string, string>;
}
const createThemeGlobalStyle = ({ colors }: ThemeProps) => {
  return createGlobalStyle`
    :root {
      --color-background: ${colors.background};
      --color-primary: ${colors.primary};
      --color-primary-alt: ${colors.primaryAlt};
      --color-secondary: ${colors.secondary};
      --color-secondary-alt: ${colors.secondaryAlt};
      --color-tertiary: ${colors.tertiary};
      --color-tertiary-alt: ${colors.tertiaryAlt};
      --color-surface: ${colors.surface};
      --color-error: ${colors.error};
      --color-on-primary: ${colors.onPrimary};
      --color-on-secondary: ${colors.onSecondary};
      --color-on-tertiary: ${colors.onTertiary};
      --color-on-background: ${colors.onBackground};
      --color-on-surface: ${colors.onSurface};
      --color-on-error: ${colors.onError};
      --color-dimmer: ${colors.dimmer};
    }
  `;
};

export const DarkThemeStyle = createThemeGlobalStyle(DarkTheme);
export const LightThemeStyle = createThemeGlobalStyle(LightTheme);

// We get the benefits of the styled-components but also have runtime
// css variable capabilities.
export const cssVars = {
  color: {
    background: 'var(--color-background)',
    primary: 'var(--color-primary)',
    primaryAlt: 'var(--color-primary-alt)',
    secondary: 'var(--color-secondary)',
    secondaryAlt: 'var(--color-secondary-alt)',
    tertiary: 'var(--color-tertiary)',
    tertiaryAlt: 'var(--color-tertiary-alt)',
    surface: 'var(--color-surface)',
    error: 'var(--color-error)',
    onPrimary: 'var(--color-on-primary)',
    onSecondary: 'var(--color-on-secondary)',
    onTertiary: 'var(--color-on-tertiary)',
    onBackground: 'var(--color-on-background)',
    onSurface: 'var(--color-on-surface)',
    onError: 'var(--color-on-error)',
    dimmer: 'var(--color-dimmer)',
  },
  fontFamily: {
    primary: 'var(--font-family)',
    secondary: 'var(--header-font-family)',
  },
  fontSize: {
    small: 'var(--font-size-small)',
    normal: 'var(--font-size-normal)',
    large: 'var(--font-size-large)',
    headline: 'var(--font-size-headline)',
    title: 'var(--font-size-title)',
  },
  spacing: {
    gap: 'var(--gap)',
    gap2x: 'calc(var(--gap) * 2)',
    container: '1200px',
  },
};
