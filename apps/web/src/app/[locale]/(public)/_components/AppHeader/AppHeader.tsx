import { Button, Icon } from '@maw/ui-lib';
import type { ComponentProps } from 'react';
import type { ActiveNavigationItem } from '@/app/navigation';
import { SearchForm } from '@/features/content/components';
import { Link } from '@/i18n/navigation';
import { AppDarkModeToggle } from './AppDarkModeToggle';
import { AppNavigationDesktop } from './AppNavigationDesktop';
import { AppNavigationMobile } from './AppNavigationMobile';
import { PainLevelSelector } from './PainLevelSelector';
import { TextLogo } from './TextLogo';

type AppHeaderProps = {
  activeItem?: ActiveNavigationItem;
  className?: ComponentProps<'header'>['className'];
};

export async function AppHeader({ activeItem, className }: AppHeaderProps) {
  return (
    <header
      id="header"
      className={`grid grid-cols-2 items-center gap-x-2 px-5 py-3 xl:px-8 ${className ?? ''}`}
    >
      <div className="flex items-center gap-2">
        <AppNavigationMobile activeItem={activeItem} />
        <TextLogo />
      </div>
      <div className="flex items-center justify-end gap-4">
        <SearchForm className="hidden md:flex" size="md" />
        <Button asChild className="md:hidden" variant="ghost">
          <Link href="/search">
            <Icon icon="search" />
          </Link>
        </Button>
        <AppDarkModeToggle />
      </div>
      <div className="col-span-2 my-2 hidden items-center md:flex">
        <AppNavigationDesktop activeItem={activeItem} />
      </div>
      <PainLevelSelector className="bg-muted col-span-2 -mx-5 mt-2 md:mt-0 xl:-mx-8" />
    </header>
  );
}
