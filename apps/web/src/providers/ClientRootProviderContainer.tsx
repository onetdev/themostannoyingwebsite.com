'use client';

import { Toaster, TooltipProvider } from '@maw/ui-lib';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { AppConfigProvider } from '@/contexts/AppConfig';
import { DependencyContainer } from '@/contexts/DependencyContainer';
import { getDependencyContainer } from '@/dependency-container';
import { ClientPainContainer } from '@/providers/ClientPainProvider';
import type { AppConfig } from '@/schemas/app-config';
import { ClientNavigationConfigurator } from './ClientNavigationConfigurator';

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
    </AppConfigProvider>
  );
}
