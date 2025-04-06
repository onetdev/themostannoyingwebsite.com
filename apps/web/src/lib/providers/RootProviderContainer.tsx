'use client';

import { ThemeProvider } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';

import ExperienceProvider from '@/root/apps/web/src/lib/providers/ExperienceProvider';
import { RootPortalProvider } from '@/root/apps/web/src/lib/providers/RootPortalProvider';

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
