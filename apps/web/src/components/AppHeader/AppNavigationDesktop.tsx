'use client';

import {
  Icon,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';

import {
  ActiveNavigationItem,
  isNavigationItemActive,
  NavItem,
  PERSONAL_NAVIGATION_LINKS,
  SITE_NAVIGATION_LINKS,
} from '@/app/navigation';
import { Link } from '@/i18n/navigation';
import { useRuntimeStore } from '@/kernel';

export type AppNavigationDesktopProps = {
  className?: string;
  activeItem?: ActiveNavigationItem;
};

export function AppNavigationDesktop({
  className,
  activeItem,
}: AppNavigationDesktopProps) {
  const t = useTranslations();
  const { showShareModal } = useRuntimeStore();

  const onClick = (item: NavItem) => {
    if (item.key === 'global-share') {
      showShareModal();
      return false;
    }
  };

  const renderItem = (item: NavItem) => {
    const active = isNavigationItemActive(item, activeItem);

    return (
      <NavigationMenuItem key={item.key}>
        <NavigationMenuLink
          asChild
          data-active={active}
          aria-current={active ? 'page' : undefined}
          className="flex-row items-center gap-2 data-[active=true]:font-bold">
          <Link href={item.path} onClick={() => onClick(item)} passHref>
            {item.icon && <Icon icon={item.icon} className="text-primary" />}
            <span
              className={cn(
                !item.icon && 'lg:inline',
                item.icon && 'hidden lg:inline',
              )}>
              {t(item.labelKey)}
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
        {SITE_NAVIGATION_LINKS.map(renderItem)}
      </NavigationMenuList>
      <NavigationMenuList className="justify-end gap-1">
        {PERSONAL_NAVIGATION_LINKS.map(renderItem)}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
