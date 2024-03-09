import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useBeforeUnload } from 'react-use';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from '@photobot/reduxjs-toolkit-persist/lib/integration/react';

import {
  DarkTheme,
  DarkThemeStyle,
  LightTheme,
  LightThemeStyle,
} from '@/styles/theme';
import { selectDarkMode } from '@/redux/stores/preference';
import * as redux from '@/redux/store';
import registerIcons from '@/utils/icons';
import useFirstInteraction from '@/hooks/useFirstInteraction';
import useInFocusMeter from '@/hooks/useInFocusMeter';
import { selectExitPrompt } from '@/redux/stores/experience';

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [exitPrompt, setExitPrompt] = useState(true);

  useFirstInteraction(redux.store);
  useInFocusMeter(redux.store);
  registerIcons();

  redux.store.subscribe(() => {
    const _state = redux.store.getState();
    const _isDarkMode = selectDarkMode(_state);
    const _exitPrompt = selectExitPrompt(_state);

    if (isDarkMode !== _isDarkMode) {
      setDarkMode(_isDarkMode);
    }

    if (exitPrompt !== _exitPrompt) {
      setExitPrompt(_exitPrompt);
    }
  });

  useBeforeUnload(
    exitPrompt,
    `I'd reconsider leaving before some bad things happend to you. Are you sure?`,
  );

  return (
    <ReduxProvider store={redux.store}>
      <PersistGate loading={null} persistor={redux.persistor}>
        {isDarkMode && <DarkThemeStyle />}
        {!isDarkMode && <LightThemeStyle />}
        <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
          {children}
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default Provider;
