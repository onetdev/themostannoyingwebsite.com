import type { ComponentProps, PropsWithChildren } from 'react';
import { ReportRouteVisit } from '@/features/monitoring/components';
import type { RouteAlias } from '@/schemas';
import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';

type PageLayoutProps = PropsWithChildren<
  {
    /**
     * Route value used for broadcasting navigation evenets and identifying item
     */
    route?: RouteAlias;
    /**
     * Override value for menu item highlight. By default navigation uses
     * the value of route.
     *
     * This can come really handy when you want to highlight hierarchical parent
     * or sibling of the current route in the navigatiuon.
     */
    navigationHighlightRoute?: RouteAlias;
    autoPadding?: boolean;
  } & Pick<ComponentProps<'main'>, 'role' | 'className'>
>;

export function PageLayout({
  children,
  route,
  navigationHighlightRoute,
  autoPadding = true,
  className,
  ...rest
}: PageLayoutProps) {
  const localClassName = autoPadding ? `mx-5 xl:mx-8` : '';

  return (
    <>
      {route && <ReportRouteVisit route={route} />}
      <AppHeader
        activeItem={navigationHighlightRoute ?? route}
        className="mb-4"
      />
      <main className={`${className ?? ''} ${localClassName}`} {...rest}>
        {children}
      </main>
      <AppFooter className="mt-12" />
    </>
  );
}
