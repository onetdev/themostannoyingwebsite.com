'use client';

import { Toaster, TooltipProvider } from '@maw/ui-lib';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import { ClientNavigationConfigurator } from './ClientNavigationConfigurator';

import { AppConfigProvider } from '@/contexts/AppConfig';
import { DependencyContainer } from '@/contexts/DependencyContainer';
import { getDependencyContainer } from '@/dependency-container';
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
  const DiContainer = getDependencyContainer();

  return (
    <AppConfigProvider config={appConfig}>
      <ClientRootPortalProvider>
        <TooltipProvider>
          <DependencyContainer value={{ container: DiContainer }}>
            <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
              <ClientNavigationConfigurator>
                <Toaster />
                <ClientPainContainer>{children}</ClientPainContainer>
              </ClientNavigationConfigurator>
            </ThemeProvider>
          </DependencyContainer>
        </TooltipProvider>
      </ClientRootPortalProvider>
    </AppConfigProvider>
  );
}
