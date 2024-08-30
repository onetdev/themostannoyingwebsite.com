import { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';

import ExperienceProvider from '@/providers/ExperienceProvider';

const ProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <ExperienceProvider>{children}</ExperienceProvider>
    </ThemeProvider>
  );
};

export default ProviderContainer;
