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

export type UserNavigationProps = {
  className?: string;
  activeItem?: ActiveNavigationItem;
};

type NavItem = {
  key: ActiveNavigationItem | 'global-share';
  label: string;
  path: string;
  icon: IconAliaseKey;
  onClick?: () => void;
};

export function UserNavigation({ className }: UserNavigationProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const { showShareModal } = useRuntimeStore();

  const items: NavItem[] = useMemo(
    () => [
      {
        icon: 'share' as const,
        key: 'global-share' as const,
        label: t('common.share'),
        onClick: () => showShareModal(),
        path: '#',
      },
      {
        icon: 'settings' as const,
        key: 'settings' as const,
        label: t('navigation.settings'),
        path: '/settings',
      },
      {
        icon: 'login' as const,
        key: 'login' as const,
        label: t('navigation.login'),
        path: '/user/login',
      },
    ],
    [t, showShareModal],
  );

  return (
    <NavigationMenu
      className={cn('hidden max-w-full justify-end md:flex', className)}
      id="navigation-user">
      <NavigationMenuList className="justify-end">
        {items.map((item) => {
          const isActive = pathname === item.path;

          if (item.path === '#') {
            return (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuLink
                  asChild
                  className="cursor-pointer flex-row items-center gap-2"
                  onClick={item.onClick}>
                  <button>
                    <Icon icon={item.icon} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={item.key}>
              <NavigationMenuLink
                asChild
                active={isActive}
                className="flex-row items-center gap-2">
                <Link href={item.path} passHref>
                  <Icon icon={item.icon} />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
