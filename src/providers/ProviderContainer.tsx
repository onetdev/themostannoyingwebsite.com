import { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';

import ExperienceProvider from '@/providers/ExperienceProvider';

const ProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
      <ExperienceProvider>{children}</ExperienceProvider>
    </ThemeProvider>
  );
};

export default ProviderContainer;
