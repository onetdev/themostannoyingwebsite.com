import { AdaptiveNavigation } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { ActiveNavigationItem } from './types';

import { Link } from '@/i18n/navigation';

type SiteNavigationProps = {
  activeItem?: string;
};

type NavItem = {
  key: ActiveNavigationItem;
  label: string;
  path: string;
  isActive?: boolean;
};

const NavLink = ({ path, children }: PropsWithChildren<NavItem>) => (
  <Link href={path} prefetch={false}>
    {children}
  </Link>
);

export async function SiteNavigation({ activeItem }: SiteNavigationProps) {
  const t = await getTranslations();

  const links: NavItem[] = [
    {
      key: 'home' as const,
      path: '/',
      label: t('navigation.home'),
    },
    {
      key: 'hot-things' as const,
      path: '/hot-things',
      label: t('navigation.hotThings'),
    },
    {
      key: 'contact' as const,
      path: '/contact',
      label: t('navigation.contact'),
    },
    {
      key: 'dilf' as const,
      path: '/dilf',
      label: t('navigation.dilf'),
    },
    {
      key: 'privacy-policy' as const,
      path: '/privacy-policy',
      label: t('navigation.privacyPolicy'),
    },
    {
      key: 'about' as const,
      path: '/about',
      label: t('navigation.about'),
    },
    {
      key: 'donate' as const,
      path: '/donate',
      label: t('navigation.donate'),
    },
  ];

  const texts = {
    toggleMenu: t('app.toggleMenu'),
  };

  return (
    <AdaptiveNavigation
      activeItem={activeItem}
      className="col-span-1 my-3 -ml-3 pl-3 md:ml-0 md:pl-0"
      id="navigation-main"
      IteratorComponent={NavLink}
      items={links}
      role="navigation"
      texts={texts}
    />
  );
}
