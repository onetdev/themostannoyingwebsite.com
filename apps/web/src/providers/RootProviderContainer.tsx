'use client';

import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import { ClientNavigationConfigurator } from './ClientNavigationConfigurator';
import { DependencyProvider } from './DependencyProvider';

import { AppConfig, AppConfigProvider } from '@/kernel';
import { ClientExperienceContainer } from '@/providers/ClientExperienceContainer';
import { ClientRootPortalProvider } from '@/providers/ClientRootPortalProvider';

export type RootProviderContainerProps = PropsWithChildren<{
  appConfig: AppConfig;
}>;

export function RootProviderContainer({
  appConfig,
  children,
}: RootProviderContainerProps) {
  return (
    <AppConfigProvider config={appConfig}>
      <ClientRootPortalProvider>
        <DependencyProvider>
          <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
            <ClientNavigationConfigurator>
              <ClientExperienceContainer>{children}</ClientExperienceContainer>
            </ClientNavigationConfigurator>
          </ThemeProvider>
        </DependencyProvider>
      </ClientRootPortalProvider>
    </AppConfigProvider>
  );
}
