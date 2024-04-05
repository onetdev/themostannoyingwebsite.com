import { createGlobalStyle } from 'styled-components';

import { ThemeColors } from '@/types';

import darkThemeColors from './themes/dark_theme_colors';
import lightThemeColors from './themes/light_theme_colors';

export const createThemeGlobalStyle = (colors: ThemeColors) => `
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
`;

const GlobalThemeStyle = createGlobalStyle`
[data-theme="dark"] {
  ${createThemeGlobalStyle(darkThemeColors)};
}
[data-theme="light"] {
  ${createThemeGlobalStyle(lightThemeColors)};
}
`;

export default GlobalThemeStyle;
