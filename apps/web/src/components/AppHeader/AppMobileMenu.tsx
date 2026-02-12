'use client';

import {
  Icon,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { useRuntimeStore } from '@/kernel';

export function AppMobileMenu() {
  const t = useTranslations();
  const pathname = usePathname();
  const { showShareModal } = useRuntimeStore();

  const siteLinks = useMemo(
    () => [
      { href: '/', label: t('navigation.home') },
      { href: '/hot-things', label: t('navigation.hotThings') },
      { href: '/contact', label: t('navigation.contact') },
      { href: '/dilf', label: t('navigation.dilf') },
      { href: '/privacy-policy', label: t('navigation.privacyPolicy') },
      { href: '/about', label: t('navigation.about') },
      { href: '/donate', label: t('navigation.donate') },
    ],
    [t],
  );

  const userLinks = useMemo(
    () => [
      {
        icon: 'share' as const,
        label: t('common.share'),
        onClick: () => showShareModal(),
        path: '#',
      },
      {
        icon: 'settings' as const,
        label: t('navigation.settings'),
        path: '/settings',
      },
      {
        icon: 'login' as const,
        label: t('navigation.login'),
        path: '/user/login',
      },
    ],
    [t, showShareModal],
  );

  return (
    <Sheet>
      <SheetTrigger
        className="hover:bg-accent flex size-9 items-center justify-center rounded-md transition-colors md:hidden"
        aria-label={t('app.toggleMenu')}>
        <Icon icon="menu" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl font-bold tracking-tighter">
            <i className="font-light opacity-80">the</i>{' '}
            <span className="text-primary">MAW</span>
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="flex flex-col gap-1 p-4">
          <div className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
            {t('navigation.home')}
          </div>
          {siteLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:bg-accent hover:text-accent-foreground flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-primary font-semibold'
                    : 'text-muted-foreground'
                }`}>
                {link.label}
              </Link>
            );
          })}
        </div>
        <Separator />
        <div className="flex flex-col gap-1 p-4">
          <div className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
            {t('navigation.profile')}
          </div>
          {userLinks.map((link) => {
            const isActive = pathname === link.path;
            const content = (
              <>
                <Icon icon={link.icon} className="mr-2 size-4" />
                {link.label}
              </>
            );

            if (link.path === '#') {
              return (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors">
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`hover:bg-accent hover:text-accent-foreground flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-primary font-semibold'
                    : 'text-muted-foreground'
                }`}>
                {content}
              </Link>
            );
          })}
        </div>
        <div className="mt-auto p-4">
          <Separator className="mb-4" />
          <p className="text-muted-foreground px-3 text-xs italic">
            {t('app.description')}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
