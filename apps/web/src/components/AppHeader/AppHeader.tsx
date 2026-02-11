import { Icon } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';
import { ComponentProps } from 'react';

import { AppDarkModeToggle } from './AppDarkModeToggle';
import { PainLevelSelector } from './PainLevelSelector';
import { SearchForm } from './SearchForm';
import { SiteDesktopNavigation } from './SiteDesktopNavigation';
import { ActiveNavigationItem } from './types';
import { UserNavigation } from './UserNavigation';

import { Link } from '@/i18n/navigation';

type AppHeaderProps = {
  activeItem?: ActiveNavigationItem;
  className?: ComponentProps<'header'>['className'];
};

export async function AppHeader({ activeItem, className }: AppHeaderProps) {
  const t = await getTranslations();

  return (
    <header
      id="header"
      className={`grid grid-cols-2 items-center gap-x-2 px-5 py-5 xl:px-8 ${className ?? ''}`}
      role="banner">
      <h1 className="font-semibold tracking-tighter">
        <Link href="/" prefetch={false} title={t('app.title')}>
          <span className="text-on-surface lg:hidden">
            <i className="font-light">the</i>{' '}
            <span className="text-primary">MAW</span>
          </span>
          <span className="text-on-surface hidden lg:inline">
            <i className="text-3xl font-light opacity-80">the</i>{' '}
            <span>
              <span className="text-primary">Most</span> Annoying Website
            </span>
          </span>
        </Link>
      </h1>
      <div className="flex items-center justify-end gap-4">
        <SearchForm className="hidden md:flex" size="md" />
        <Link href="/search" className="md:hidden">
          <Icon icon="search" />
        </Link>
        <AppDarkModeToggle />
      </div>
      <SiteDesktopNavigation activeItem={activeItem} className="" />
      <UserNavigation activeItem={activeItem} className="col-span-1" />
      <PainLevelSelector className="bg-surface-alt col-span-2 -mx-5 mt-2 xl:-mx-8" />
    </header>
  );
}
