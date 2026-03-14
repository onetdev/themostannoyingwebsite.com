'use client';

import type { UrlObject } from 'node:url';
import type { ComponentProps } from 'react';
import type { Link as TranslatedLink } from '@/core/i18n/navigation';
import {
  type NavigationParams,
  useNavigationProvider,
} from './NavigationContext';

export type LinkProps =
  | (Omit<ComponentProps<typeof TranslatedLink>, 'href'> & {
      href: string | UrlObject;
      hrefFor?: never;
    })
  | (Omit<ComponentProps<typeof TranslatedLink>, 'href'> & {
      hrefFor: NavigationParams;
      href?: never;
    });

export function Link({ children, href, hrefFor, ...rest }: LinkProps) {
  const { LinkComponent, pathFor } = useNavigationProvider();

  return (
    <LinkComponent href={href ?? pathFor(hrefFor)} {...rest}>
      {children}
    </LinkComponent>
  );
}
