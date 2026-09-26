'use client';

import { TooltipProvider } from '@maw/ui-lib';
import {
  type DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from '@tanstack/react-query';
import { type PropsWithChildren, useState } from 'react';
import { getClientDependencyContainer } from '@/core/di/client';
import {
  AppConfigProvider,
  DiContextProvider,
  getQueryClient,
  SilentErrorBoundary,
} from '@/core/react';
import { AchievementManager } from '@/features/achievements/providers';
import type { AppConfig } from '@/schemas/app-config';
import { ClientNavigationConfigurator } from './ClientNavigationConfigurator';
import { ClientPainContainer } from './ClientPainProvider';
import { SentryLocaleConfigurator } from './SentryLocaleConfigurator';
import { ThemedToaster } from './ThemedToaster';

export type ClientRootProviderContainerProps = PropsWithChildren<{
  appConfig: AppConfig;
  /** Server-prefetched React Query state hydrated into the client cache. */
  dehydratedState?: DehydratedState;
}>;

const EMPTY_DEHYDRATED_STATE: DehydratedState = { mutations: [], queries: [] };

export function ClientRootProviderContainer({
  appConfig,
  dehydratedState,
  children,
}: ClientRootProviderContainerProps) {
  const DiContainer = getClientDependencyContainer();
  const [queryClient] = useState(() => getQueryClient());

  return (
    <AppConfigProvider config={appConfig}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState ?? EMPTY_DEHYDRATED_STATE}>
          <TooltipProvider>
            <DiContextProvider value={{ container: DiContainer }}>
              <SentryLocaleConfigurator />
              <ClientNavigationConfigurator>
                <ThemedToaster />
                <SilentErrorBoundary name="achievements:manager">
                  <AchievementManager />
                </SilentErrorBoundary>
                <ClientPainContainer>{children}</ClientPainContainer>
              </ClientNavigationConfigurator>
            </DiContextProvider>
          </TooltipProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </AppConfigProvider>
  );
}
