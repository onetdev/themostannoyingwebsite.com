'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

export type SiteNavigationProps = {
  className?: string;
};

export function SiteNavigation({ className }: SiteNavigationProps) {
  const t = useTranslations();
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('navigation.home') },
    { href: '/hot-things', label: t('navigation.hotThings') },
    { href: '/contact', label: t('navigation.contact') },
    { href: '/dilf', label: t('navigation.dilf') },
    { href: '/privacy-policy', label: t('navigation.privacyPolicy') },
    { href: '/about', label: t('navigation.about') },
    { href: '/donate', label: t('navigation.donate') },
  ];

  return (
    <nav
      className={`hidden items-center gap-2 md:flex ${className}`}
      id="navigation-main"
      role="navigation">
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild active={pathname === link.href}>
                <Link href={link.href} passHref>
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
