import { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

import {
  DarkTheme,
  DarkThemeStyle,
  LightTheme,
  LightThemeStyle,
} from '@/styles/theme';
import * as redux from '@/redux/store';
import registerIcons from '@/utils/icons';
import useColorScheme from '@/hooks/useUserColorScheme';

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  registerIcons();

  return (
    <ReduxProvider store={redux.store}>
      <PersistGate loading={null} persistor={redux.persistor}>
        {isDarkMode && <DarkThemeStyle />}
        {!isDarkMode && <LightThemeStyle />}
        <StyledComponentThemeProvider
          theme={isDarkMode ? DarkTheme : LightTheme}>
          {children}
        </StyledComponentThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default ThemeProvider;
