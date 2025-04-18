import { PropsWithChildren } from 'react';

import { AppFooter } from './AppFooter';
import { ActiveNavigationItem, AppHeader } from './AppHeader';

type PageLayoutProps = PropsWithChildren<
  { activeItem?: ActiveNavigationItem } & Pick<
    JSXProxyProps<'main'>,
    'role' | 'className'
  >
>;

export function PageLayout({ children, activeItem, ...rest }: PageLayoutProps) {
  return (
    <>
      <AppHeader activeItem={activeItem} />
      <main {...rest}>{children}</main>
      <AppFooter />
    </>
  );
}
