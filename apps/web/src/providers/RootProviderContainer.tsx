'use client';

import { ThemeProvider } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';
import { z } from 'zod';

import { DependencyProvider } from './DependencyProvider';
import { NavigationProvider } from './NavigationProvider';

import ExperienceProvider from '@/providers/ExperienceProvider';
import { RootPortalProvider } from '@/providers/RootPortalProvider';

const RootProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  z.config({
    customError: (issue) => {
      console.log(issue);
      return undefined;
    },
  });

  return (
    <RootPortalProvider>
      <DependencyProvider>
        <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
          <NavigationProvider>
            <ExperienceProvider>{children}</ExperienceProvider>
          </NavigationProvider>
        </ThemeProvider>
      </DependencyProvider>
    </RootPortalProvider>
  );
};

export default RootProviderContainer;
