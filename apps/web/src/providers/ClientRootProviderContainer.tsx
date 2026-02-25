'use client';

import { Toaster, TooltipProvider } from '@maw/ui-lib';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import { ClientNavigationConfigurator } from './ClientNavigationConfigurator';

import { AppConfigProvider } from '@/contexts/AppConfig';
import { RootPortalProvider } from '@/contexts/ClientRootPortalProvider';
import { DependencyContainer } from '@/contexts/DependencyContainer';
import { getDependencyContainer } from '@/dependency-container';
import { ClientPainContainer } from '@/providers/ClientPainProvider';
import { AppConfig } from '@/schemas/app-config';

export type ClientRootProviderContainerProps = PropsWithChildren<{
  appConfig: AppConfig;
}>;

export function ClientRootProviderContainer({
  appConfig,
  children,
}: ClientRootProviderContainerProps) {
  const DiContainer = getDependencyContainer();

  return (
    <AppConfigProvider config={appConfig}>
      <RootPortalProvider>
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
      </RootPortalProvider>
    </AppConfigProvider>
  );
}
