'use client';

import { Toaster, TooltipProvider } from '@maw/ui-lib';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { AppConfigProvider } from '@/core/config/react-app-config';
import { getDependencyContainer } from '@/core/di';
import { DiContextProvider } from '@/core/di/react-di';
import { AchievementManager } from '@/features/achievements/providers';
import type { AppConfig } from '@/schemas/app-config';
import { ClientNavigationConfigurator } from '../../navigation/ClientNavigationConfigurator';
import { ClientPainContainer } from './ClientPainProvider';

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
        <DiContextProvider value={{ container: DiContainer }}>
          <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
            <ClientNavigationConfigurator>
              <Toaster />
              <AchievementManager />
              <ClientPainContainer>{children}</ClientPainContainer>
            </ClientNavigationConfigurator>
          </ThemeProvider>
        </DiContextProvider>
      </TooltipProvider>
    </AppConfigProvider>
  );
}
