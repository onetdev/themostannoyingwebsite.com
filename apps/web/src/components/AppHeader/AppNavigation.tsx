'use client';

import {
  Icon,
  IconAliaseKey,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { ActiveNavigationItem } from './types';

import { Link, usePathname } from '@/i18n/navigation';
import { useRuntimeStore } from '@/kernel';

export type AppNavigationProps = {
  className?: string;
  activeItem?: ActiveNavigationItem;
};

type NavItem = {
  key: string;
  label: string;
  path: string;
  icon?: IconAliaseKey;
  onClick?: () => void;
};

export function AppNavigation({ className, activeItem }: AppNavigationProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const { showShareModal } = useRuntimeStore();

  const isActive = (item: NavItem) => {
    if (activeItem === item.key) return true;
    if (item.path === '#') return false;
    if (item.path === '/') return pathname === '/';
    return pathname === item.path || pathname.startsWith(`${item.path}/`);
  };

  const siteLinks: NavItem[] = useMemo(
    () =>
      [
        { key: 'home', href: '/', label: t('navigation.home') },
        {
          key: 'hot-things',
          href: '/hot-things',
          label: t('navigation.hotThings'),
        },
        { key: 'dilf', href: '/dilf', label: t('navigation.dilf') },
        { key: 'donate', href: '/donate', label: t('navigation.donate') },
        { key: 'about', href: '/about', label: t('navigation.about') },
        { key: 'contact', href: '/contact', label: t('navigation.contact') },
      ].map((link) => ({
        key: link.key,
        label: link.label,
        path: link.href,
      })),
    [t],
  );

  const userLinks: NavItem[] = useMemo(
    () => [
      {
        icon: 'share' as const,
        key: 'global-share',
        label: t('common.share'),
        onClick: () => showShareModal(),
        path: '#',
      },
      {
        icon: 'settings' as const,
        key: 'settings',
        label: t('navigation.settings'),
        path: '/settings',
      },
      {
        icon: 'login' as const,
        key: 'login',
        label: t('navigation.login'),
        path: '/user/login',
      },
    ],
    [t, showShareModal],
  );

  const renderItem = (item: NavItem) => {
    const active = isActive(item);

    if (item.path === '#') {
      return (
        <NavigationMenuItem key={item.key}>
          <NavigationMenuLink
            asChild
            className="cursor-pointer flex-row items-center gap-2"
            active={active}
            onClick={item.onClick}>
            <button>
              {item.icon && <Icon icon={item.icon} />}
              <span
                className={cn(
                  !item.icon && 'lg:inline',
                  item.icon && 'hidden lg:inline',
                )}>
                {item.label}
              </span>
            </button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.key}>
        <NavigationMenuLink
          asChild
          active={active}
          className={cn(
            'flex-row items-center gap-2',
            !item.icon && active && 'text-primary font-bold',
          )}>
          <Link href={item.path} passHref>
            {item.icon && <Icon icon={item.icon} />}
            <span
              className={cn(
                !item.icon && 'lg:inline',
                item.icon && 'hidden lg:inline',
              )}>
              {item.label}
            </span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <NavigationMenu
      className={cn(
        'flex w-full max-w-full items-center justify-between',
        className,
      )}
      id="navigation-desktop"
      viewport={false}>
      <NavigationMenuList className="justify-start gap-1">
        {siteLinks.map(renderItem)}
      </NavigationMenuList>
      <NavigationMenuList className="justify-end gap-1">
        {userLinks.map(renderItem)}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
