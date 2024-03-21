import { FunctionComponent, PropsWithChildren } from 'react';
import { Provider as SuperReduxProvider } from 'react-redux';

import * as redux from '@/redux/store';

/**
 * Super basic intermedia element for setting up redux store.
 *
 * IMPORANT: `PersistGate` from `reduxjs-toolkit-persist/integration/react`
 * has been removed intentionally to avoid prolonged white screens on initial
 * loads. We trust our default state.
 */
const ReduxProvider: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <SuperReduxProvider store={redux.store}>{children}</SuperReduxProvider>
);

export default ReduxProvider;
