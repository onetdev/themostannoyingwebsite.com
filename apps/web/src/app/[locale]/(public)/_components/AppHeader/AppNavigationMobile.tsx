'use client';

import {
  Icon,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import {
  ActiveNavigationItem,
  isNavigationItemActive,
  NavItem,
  PERSONAL_NAVIGATION_LINKS,
  SITE_NAVIGATION_LINKS,
} from '@/app/navigation';
import { Link } from '@/i18n/navigation';
import { useRuntimeStore } from '@/stores';

export type AppNavigationMobileProps = {
  activeItem?: ActiveNavigationItem;
};

export function AppNavigationMobile({ activeItem }: AppNavigationMobileProps) {
  const t = useTranslations();
  const { showShareModal } = useRuntimeStore();

  const navigationTree: { titleKey: string; items: NavItem[] }[] =
    useMemo(() => {
      return [
        {
          titleKey: 'navigation.home',
          items: SITE_NAVIGATION_LINKS,
        },
        {
          titleKey: 'navigation.personal',
          items: PERSONAL_NAVIGATION_LINKS,
        },
      ];
    }, []);

  const onClick = (item: NavItem) => {
    if (item.key === 'global-share') {
      showShareModal();
      return false;
    }

    return true;
  };

  return (
    <Sheet>
      <SheetTrigger
        className="hover:bg-accent flex size-9 items-center justify-center rounded-md transition-colors md:hidden"
        aria-label={t('app.toggleMenu')}>
        <Icon icon="menu" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] gap-0 overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="pl-3 text-lg font-bold tracking-tighter">
            <i className="font-light">the</i>{' '}
            <span className="text-primary">MAW</span>
          </SheetTitle>
        </SheetHeader>
        {navigationTree.map(({ titleKey, items }) => (
          <>
            <Separator />
            <div className="flex flex-col gap-1 p-4">
              <div className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
                {t(titleKey)}
              </div>
              {items.map((item) => {
                const active = isNavigationItemActive(item, activeItem);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => onClick(item)}
                    data-active={active}
                    aria-current={active ? 'page' : undefined}
                    className="hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-primary text-muted-foreground flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors data-[active=true]:font-semibold">
                    {item.icon && (
                      <Icon icon={item.icon} className="text-primary mr-2" />
                    )}
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </div>
          </>
        ))}
        <Separator className="mb-4" />
        <SheetFooter>
          <p className="text-muted-foreground px-3 text-xs italic">
            {t('app.description')}
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
