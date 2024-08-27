import { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';

import registerIcons from '@/utils/icons';

import ExperienceProvider from './ExperienceProvider';

const ProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  registerIcons();

  return (
    <ThemeProvider>
      <ExperienceProvider>{children}</ExperienceProvider>
    </ThemeProvider>
  );
};

export default ProviderContainer;
