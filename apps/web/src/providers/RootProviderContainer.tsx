'use client';

import { ThemeProvider } from 'next-themes';
import { compile } from 'path-to-regexp';
import { FunctionComponent, PropsWithChildren } from 'react';

import { AppLink } from '@/components/AppLink';
import { useRouter } from '@/i18n/navigation';
import { AppCoreViewModel, NavigationParams } from '@/modules/core';
import { RouteAliasType } from '@/modules/core/domain';
import ExperienceProvider from '@/providers/ExperienceProvider';
import { RootPortalProvider } from '@/providers/RootPortalProvider';

const routeAliasToPathMap: Record<RouteAliasType, string> = {
  about: '/about',
  'article.single': '/articles/:slug',
  contact: '/contact',
  dilf: '/dilf',
  donate: '/donate',
  'flaim-a-phone': '/flaim-a-phone',
  home: '/',
  'hot-things': '/hot-things',
  'privacy-policy': '/privacy-policy',
  search: '/search',
  settings: '/settings',
  'user.login': '/login',
  'user.password-reminder': '/password-reminder',
  'user.profile': '/profile',
  'user.signup': '/signup',
  virgin: '/virgin',
};

const RootProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const navigation = useRouter();

  const resolvePathForRouteAlias = (param: NavigationParams) => {
    if (typeof param === 'string') {
      return routeAliasToPathMap[param];
    }

    const routeTemplate = routeAliasToPathMap[param.alias];
    return compile(routeTemplate)(param.params);
  };

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
            pathFor: resolvePathForRouteAlias,
          }}>
          <ExperienceProvider>{children}</ExperienceProvider>
        </AppCoreViewModel>
      </ThemeProvider>
    </RootPortalProvider>
  );
};

export default RootProviderContainer;
