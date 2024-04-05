import { createGlobalStyle } from 'styled-components';

import { createThemeGlobalStyle } from '@/styles/GlobalThemeStyle';

import darkThemeColors from './dark_theme_colors';

const DarkThemeStyle = createGlobalStyle`
:root {
  ${createThemeGlobalStyle(darkThemeColors)};
}`;

export default DarkThemeStyle;
