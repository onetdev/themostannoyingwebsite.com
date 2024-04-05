import { createGlobalStyle } from 'styled-components';

import { createThemeGlobalStyle } from '@/styles/GlobalThemeStyle';

import lightThemeColors from './light_theme_colors';

const LightThemeStyle = createGlobalStyle`
:root {
  ${createThemeGlobalStyle(lightThemeColors)};
}`;

export default LightThemeStyle;
