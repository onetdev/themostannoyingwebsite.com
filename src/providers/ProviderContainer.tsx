import { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';

import registerIcons from '@/utils/icons';

import GlobalStateProvider from './GlobalStateProvider';
import ExperienceProvider from './ExperienceProvider';

const ProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  registerIcons();

  return (
    <ThemeProvider>
      <GlobalStateProvider>
        <ExperienceProvider>{children}</ExperienceProvider>
      </GlobalStateProvider>
    </ThemeProvider>
  );
};

export default ProviderContainer;
