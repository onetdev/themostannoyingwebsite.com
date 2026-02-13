import { Icon } from '@maw/ui-lib';
import { ComponentProps } from 'react';

import { AppDarkModeToggle } from './AppDarkModeToggle';
import { AppMobileMenu } from './AppMobileMenu';
import { PainLevelSelector } from './PainLevelSelector';
import { SearchForm } from './SearchForm';
import { SiteNavigation } from './SiteNavigation';
import { TextLogo } from './TextLogo';
import { ActiveNavigationItem } from './types';
import { UserNavigation } from './UserNavigation';

import { Link } from '@/i18n/navigation';

type AppHeaderProps = {
  activeItem?: ActiveNavigationItem;
  className?: ComponentProps<'header'>['className'];
};

export async function AppHeader({ activeItem, className }: AppHeaderProps) {
  return (
    <header
      id="header"
      className={`grid grid-cols-2 items-center gap-x-2 px-5 py-3 md:py-5 xl:px-8 ${className ?? ''}`}
      role="banner">
      <div className="flex items-center gap-2">
        <AppMobileMenu />
        <TextLogo />
      </div>
      <div className="flex items-center justify-end gap-4">
        <SearchForm className="hidden md:flex" size="md" />
        <Link href="/search" className="md:hidden">
          <Icon icon="search" />
        </Link>
        <AppDarkModeToggle />
      </div>
      <SiteNavigation className="col-span-1 my-2 -ml-3 pl-3 md:ml-0 md:pl-0" />
      <UserNavigation
        activeItem={activeItem}
        className="col-span-1 my-2 hidden md:block"
      />
      <PainLevelSelector className="bg-surface-alt col-span-2 -mx-5 mt-2 md:mt-0 xl:-mx-8" />
    </header>
  );
}
