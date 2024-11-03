import { ThemeProvider } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';

import ExperienceProvider from '@/lib/providers/ExperienceProvider';
import { RootPortalProvider } from '@/lib/providers/RootPortalProvider';

const RootProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <RootPortalProvider>
      <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
        <ExperienceProvider>{children}</ExperienceProvider>
      </ThemeProvider>
    </RootPortalProvider>
  );
};

export default RootProviderContainer;
