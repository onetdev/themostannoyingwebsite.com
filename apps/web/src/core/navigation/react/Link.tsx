'use client';

import type { UrlObject } from 'node:url';
import type { ComponentProps } from 'react';
import { Link as TranslatedLink } from '@/core/i18n/navigation';
import { useNavigationProvider } from './NavigationContext';

export type LinkProps =
  | (Omit<ComponentProps<typeof TranslatedLink>, 'href'> & {
      href: string | UrlObject;
      hrefFor?: never;
    })
  | (Omit<ComponentProps<typeof TranslatedLink>, 'href'> & {
      hrefFor: RouteAliasParams;
      href?: never;
    });

export function Link({ children, href, hrefFor, ...rest }: LinkProps) {
  const { resolve } = useNavigationProvider();

  return (
    <TranslatedLink href={href ?? resolve(hrefFor)} {...rest}>
      {children}
    </TranslatedLink>
  );
}
