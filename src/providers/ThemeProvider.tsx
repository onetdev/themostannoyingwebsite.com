import { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

import * as redux from '@/redux/store';
import registerIcons from '@/utils/icons';
import useUserColorScheme from '@/hooks/useUserColorScheme';
import darkThemeColors from '@/styles/themes/dark_theme_colors';
import lightThemeColors from '@/styles/themes/light_theme_colors';
import DarkThemeVarStyle from '@/styles/themes/DarkThemeVarStyle';
import LightThemeVarStyle from '@/styles/themes/LightThemeVarStyle';

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const colorScheme = useUserColorScheme();
  const isDarkMode = colorScheme === 'dark';

  registerIcons();

  return (
    <ReduxProvider store={redux.store}>
      <PersistGate loading={null} persistor={redux.persistor}>
        {isDarkMode && <DarkThemeVarStyle />}
        {!isDarkMode && <LightThemeVarStyle />}
        <StyledComponentThemeProvider
          theme={isDarkMode ? darkThemeColors : lightThemeColors}>
          {children}
        </StyledComponentThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default ThemeProvider;
