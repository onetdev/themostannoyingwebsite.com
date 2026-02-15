'use client';

import { TooltipProvider } from '@maw/ui-lib';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import { ClientNavigationConfigurator } from './ClientNavigationConfigurator';
import { DependencyProvider } from './DependencyProvider';

import { AppConfig, AppConfigProvider } from '@/kernel';
import { ClientPainContainer } from '@/providers/ClientPainContainer';
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
        <TooltipProvider>
          <DependencyProvider>
            <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
              <ClientNavigationConfigurator>
                <ClientPainContainer>{children}</ClientPainContainer>
              </ClientNavigationConfigurator>
            </ThemeProvider>
          </DependencyProvider>
        </TooltipProvider>
      </ClientRootPortalProvider>
    </AppConfigProvider>
  );
}
