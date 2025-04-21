'use client';

import { ThemeProvider } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';

import { AppLink } from '@/components/AppLink';
import ExperienceProvider from '@/providers/ExperienceProvider';
import { RootPortalProvider } from '@/providers/RootPortalProvider';
import { AppCoreViewModel } from '@/root/modules/core';

const RootProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <RootPortalProvider>
      <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
        <AppCoreViewModel value={{ LinkComponent: AppLink }}>
          <ExperienceProvider>{children}</ExperienceProvider>
        </AppCoreViewModel>
      </ThemeProvider>
    </RootPortalProvider>
  );
};

export default RootProviderContainer;
