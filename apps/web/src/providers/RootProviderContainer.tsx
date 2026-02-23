'use client';

import { Toaster, TooltipProvider } from '@maw/ui-lib';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import { AppDependencyContainer } from './AppDependencyRegistry';
import { ClientNavigationConfigurator } from './ClientNavigationConfigurator';

import { AppConfigProvider } from '@/core';
import { ClientPainContainer } from '@/providers/ClientPainProvider';
import { ClientRootPortalProvider } from '@/providers/ClientRootPortalProvider';
import { AppConfig } from '@/schemas/app-config';

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
          <AppDependencyContainer>
            <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
              <ClientNavigationConfigurator>
                <Toaster />
                <ClientPainContainer>{children}</ClientPainContainer>
              </ClientNavigationConfigurator>
            </ThemeProvider>
          </AppDependencyContainer>
        </TooltipProvider>
      </ClientRootPortalProvider>
    </AppConfigProvider>
  );
}
