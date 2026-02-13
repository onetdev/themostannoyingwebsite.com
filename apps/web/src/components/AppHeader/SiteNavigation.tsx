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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const topLevelLinks = [
    { href: '/', label: t('navigation.home') },
    { href: '/hot-things', label: t('navigation.hotThings') },
    { href: '/dilf', label: t('navigation.dilf') },
    { href: '/donate', label: t('navigation.donate') },
    { href: '/about', label: t('navigation.about') },
    { href: '/contact', label: t('navigation.contact') },
  ];

  return (
    <nav
      className={`flex items-center gap-2 ${className}`}
      id="navigation-main"
      role="navigation">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {topLevelLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  active={active}
                  className={active ? 'text-primary font-bold' : ''}>
                  <Link href={link.href} passHref>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
