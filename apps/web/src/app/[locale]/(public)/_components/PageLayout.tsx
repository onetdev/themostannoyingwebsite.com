import type { ComponentProps, PropsWithChildren } from 'react';
import { ReportRouteVisit } from '@/features/monitoring/components';
import type { RouteAlias } from '@/schemas';
import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';

type PageLayoutProps = PropsWithChildren<
  { route?: RouteAlias; autoPadding?: boolean } & Pick<
    ComponentProps<'main'>,
    'role' | 'className'
  >
>;

export function PageLayout({
  children,
  route,
  autoPadding = true,
  className,
  ...rest
}: PageLayoutProps) {
  const localClassName = autoPadding ? `mx-5 xl:mx-8` : '';

  return (
    <>
      {route && <ReportRouteVisit route={route} />}
      <AppHeader activeItem={route} className="mb-4" />
      <main className={`${className ?? ''} ${localClassName}`} {...rest}>
        {children}
      </main>
      <AppFooter className="mt-12" />
    </>
  );
}
