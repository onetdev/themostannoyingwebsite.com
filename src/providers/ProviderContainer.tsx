import { FunctionComponent, PropsWithChildren } from 'react';

import ReduxProvider from './ReduxProvider';
import ThemeProvider from './ThemeProvider';
import ExperimentProvider from './ExperimentProvider';

const ProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ReduxProvider>
      <ExperimentProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ExperimentProvider>
    </ReduxProvider>
  );
};

export default ProviderContainer;
