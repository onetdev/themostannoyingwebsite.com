'use client';

import { ThemeProvider } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';

import { AppLink } from '@/components/AppLink';
import { useRouter } from '@/i18n/navigation';
import ExperienceProvider from '@/providers/ExperienceProvider';
import { RootPortalProvider } from '@/providers/RootPortalProvider';
import { AppCoreViewModel } from '@/root/modules/core';

const RootProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const navigation = useRouter();

  return (
    <RootPortalProvider>
      <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
        <AppCoreViewModel
          value={{
            LinkComponent: AppLink,
            navigateBack: navigation.back,
            navigateForward: navigation.forward,
            navigatePush: navigation.push,
            navigateReplace: navigation.replace,
          }}>
          <ExperienceProvider>{children}</ExperienceProvider>
        </AppCoreViewModel>
      </ThemeProvider>
    </RootPortalProvider>
  );
};

export default RootProviderContainer;
