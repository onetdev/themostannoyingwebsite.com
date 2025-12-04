'use client';

import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import { DependencyProvider } from './DependencyProvider';
import { NavigationProvider } from './NavigationProvider';
import { ZodTranslationConfig } from './ZodTranslationProvider';

import { AppConfig, AppConfigProvider } from '@/kernel';
import { ExperienceProvider } from '@/providers/ExperienceProvider';
import { RootPortalProvider } from '@/providers/RootPortalProvider';

export type RootProviderContainerProps = PropsWithChildren<{
  appConfig: AppConfig;
}>;

export function RootProviderContainer({
  appConfig,
  children,
}: RootProviderContainerProps) {
  return (
    <AppConfigProvider config={appConfig}>
      <ZodTranslationConfig>
        <RootPortalProvider>
          <DependencyProvider>
            <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
              <NavigationProvider>
                <ExperienceProvider>{children}</ExperienceProvider>
              </NavigationProvider>
            </ThemeProvider>
          </DependencyProvider>
        </RootPortalProvider>
      </ZodTranslationConfig>
    </AppConfigProvider>
  );
}
