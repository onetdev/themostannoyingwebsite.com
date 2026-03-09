'use client';

import { Toaster, TooltipProvider } from '@maw/ui-lib';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { type PropsWithChildren, useState } from 'react';
import { AppConfigProvider } from '@/core/config/react-app-config';
import { getDependencyContainer } from '@/core/di';
import { DiContextProvider } from '@/core/di/react-di';
import { AchievementManager } from '@/features/achievements/providers';
import type { AppConfig } from '@/schemas/app-config';
import { ClientNavigationConfigurator } from '../../navigation/ClientNavigationConfigurator';
import { ClientPainContainer } from './ClientPainProvider';
import { SentryLocaleConfigurator } from './SentryLocaleConfigurator';

export type ClientRootProviderContainerProps = PropsWithChildren<{
  appConfig: AppConfig;
}>;

export function ClientRootProviderContainer({
  appConfig,
  children,
}: ClientRootProviderContainerProps) {
  const DiContainer = getDependencyContainer();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AppConfigProvider config={appConfig}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <DiContextProvider value={{ container: DiContainer }}>
            <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
              <SentryLocaleConfigurator />
              <ClientNavigationConfigurator>
                <Toaster />
                <AchievementManager />
                <ClientPainContainer>{children}</ClientPainContainer>
              </ClientNavigationConfigurator>
            </ThemeProvider>
          </DiContextProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </AppConfigProvider>
  );
}
