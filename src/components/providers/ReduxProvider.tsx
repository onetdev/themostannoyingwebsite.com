import { FunctionComponent, PropsWithChildren } from 'react';
import { Provider as SuperReduxProvider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

import * as redux from '@/redux/store';

const ReduxProvider: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <SuperReduxProvider store={redux.store}>
    <PersistGate loading={null} persistor={redux.persistor}>
      {children}
    </PersistGate>
  </SuperReduxProvider>
);

export default ReduxProvider;
