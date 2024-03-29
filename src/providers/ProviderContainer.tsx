import { FunctionComponent, PropsWithChildren } from 'react';

import ReduxProvider from './ReduxProvider';
import ThemeProvider from './ThemeProvider';
import ExperienceProvider from './ExperienceProvider';

const ProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ReduxProvider>
      <ExperienceProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ExperienceProvider>
    </ReduxProvider>
  );
};

export default ProviderContainer;
