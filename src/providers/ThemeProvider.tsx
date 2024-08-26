import { FunctionComponent, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

import * as redux from '@/redux/store';
import registerIcons from '@/utils/icons';

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  registerIcons();

  return (
    <ReduxProvider store={redux.store}>
      <PersistGate loading={null} persistor={redux.persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
};

export default ThemeProvider;
