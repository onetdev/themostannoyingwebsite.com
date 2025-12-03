'use client';

import { ThemeProvider } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';

import { DependencyProvider } from './DependencyProvider';
import { NavigationProvider } from './NavigationProvider';
import { ZodTranslationConfig } from './ZodTranslationProvider';

import { ExperienceProvider } from '@/providers/ExperienceProvider';
import { RootPortalProvider } from '@/providers/RootPortalProvider';

export const RootProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
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
  );
};
