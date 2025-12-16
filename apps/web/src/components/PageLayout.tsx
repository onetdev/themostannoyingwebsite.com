import { PropsWithChildren } from 'react';

import { AppFooter } from './AppFooter';
import { ActiveNavigationItem, AppHeader } from './AppHeader';

type PageLayoutProps = PropsWithChildren<
  { activeItem?: ActiveNavigationItem; autoPadding?: boolean } & Pick<
    JSXProxyProps<'main'>,
    'role' | 'className'
  >
>;

export function PageLayout({
  children,
  activeItem,
  autoPadding = true,
  className,
  ...rest
}: PageLayoutProps) {
  const localClassName = autoPadding ? `mx-5 xl:mx-8` : '';

  return (
    <>
      <AppHeader activeItem={activeItem} className="mb-4" />
      <main className={`${className ?? ''} ${localClassName}`} {...rest}>
        {children}
      </main>
      <AppFooter className="mt-12" />
    </>
  );
}
