import { ToggableNavigation } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { Link } from '@/i18n/navigation';

type SiteNavigationProps = {
  activeKey?: string;
};

type NavItem = {
  key: string;
  label: string;
  path: string;
  isActive?: boolean;
};

const NavLink = ({ path, children }: PropsWithChildren<NavItem>) => (
  <Link href={path} prefetch={false}>
    {children}
  </Link>
);

export async function SiteNavigation({ activeKey }: SiteNavigationProps) {
  const t = await getTranslations();

  const links: NavItem[] = [
    {
      key: 'home',
      path: '/',
      label: t('navigation.home'),
    },
    {
      key: 'hot-things',
      path: '/hot-things',
      label: t('navigation.hotThings'),
    },
    {
      key: 'contact',
      path: '/contact',
      label: t('navigation.contact'),
    },
    {
      key: 'dilf',
      path: '/dilf',
      label: t('navigation.dilf'),
    },
    {
      key: 'privacy',
      path: '/privacy-policy',
      label: t('navigation.privacyPolicy'),
    },
    {
      key: 'about',
      path: '/about',
      label: t('navigation.about'),
    },
    {
      key: 'donate',
      path: '/donate',
      label: t('navigation.donate'),
    },
  ].map((item) => ({ ...item, isActive: item.key === activeKey }));

  const texts = {
    toggleMenu: t('app.toggleMenu'),
  };

  return (
    <ToggableNavigation
      className="col-span-1 my-3 -ml-3 pl-3 md:ml-0 md:pl-0"
      id="navigation-main"
      IteratorComponent={NavLink}
      items={links}
      role="navigation"
      texts={texts}
    />
  );
}
