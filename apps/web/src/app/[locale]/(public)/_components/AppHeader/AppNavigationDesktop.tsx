'use client';

import {
  Icon,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';

import {
  isNavGroup,
  isNavigationItemActive,
  type NavEntry,
  type NavGroup,
  type NavItem,
  PERSONAL_NAVIGATION_LINKS,
  SITE_NAVIGATION_LINKS,
} from '@/app/navigation';
import { Link } from '@/core/react';
import { useLangDir } from '@/hooks';
import type { RouteAlias } from '@/schemas';
import { useRuntimeStore } from '@/stores';

export type AppNavigationDesktopProps = {
  className?: string;
  activeItem?: RouteAlias;
};

export function AppNavigationDesktop({
  className,
  activeItem,
}: AppNavigationDesktopProps) {
  const t = useTranslations();
  const { showShareModal } = useRuntimeStore();
  const direction = useLangDir();

  const onClick = (item: NavItem) => {
    if (item.id === 'global-share') {
      showShareModal();
      return false;
    }
  };

  const renderDropdownItem = (item: NavItem) => {
    const active = isNavigationItemActive(item, activeItem);

    return (
      <li key={item.id}>
        <NavigationMenuLink
          render={
            <Link
              hrefFor={item.hrefFor}
              onClick={() => onClick(item)}
              passHref
            />
          }
          active={active}
          aria-label={t(item.labelKey)}
          title={t(item.labelKey)}
          className={cn(
            'flex-row items-center gap-2 whitespace-nowrap',
            active && 'font-bold',
          )}
        >
          {item.icon && <Icon icon={item.icon} className="text-primary" />}
          <span>{t(item.labelKey)}</span>
        </NavigationMenuLink>
      </li>
    );
  };

  const renderSiteItem = (item: NavItem) => {
    const active = isNavigationItemActive(item, activeItem);

    return (
      <NavigationMenuItem key={item.id}>
        <NavigationMenuLink
          render={
            <Link
              hrefFor={item.hrefFor}
              onClick={() => onClick(item)}
              passHref
            />
          }
          active={active}
          aria-label={t(item.labelKey)}
          title={t(item.labelKey)}
          className="flex-row items-center gap-2 whitespace-nowrap data-active:font-bold"
        >
          {item.icon && <Icon icon={item.icon} className="text-primary" />}
          {item.hideLabel !== true && <span>{t(item.labelKey)}</span>}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderGroup = (group: NavGroup) => (
    <NavigationMenuItem key={group.id}>
      <NavigationMenuTrigger>
        {group.icon && <Icon icon={group.icon} />}
        {t(group.labelKey)}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="flex w-56 flex-col gap-0.5 p-0">
          {group.items.map(renderDropdownItem)}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  const renderEntry = (entry: NavEntry) =>
    isNavGroup(entry) ? renderGroup(entry) : renderSiteItem(entry);

  return (
    <NavigationMenu
      className={cn(
        'flex w-full max-w-full items-center justify-between',
        className,
      )}
      id="navigation-desktop"
      dir={direction}
    >
      <NavigationMenuList className="justify-start gap-1">
        {SITE_NAVIGATION_LINKS.map(renderEntry)}
      </NavigationMenuList>
      <NavigationMenuList className="flex-none justify-end gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            aria-label={t('common.navigation.personal')}
            title={t('common.navigation.personal')}
            className="px-2"
          >
            <Icon icon="login" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex w-48 flex-col gap-0.5 p-0">
              {PERSONAL_NAVIGATION_LINKS.map(renderDropdownItem)}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
