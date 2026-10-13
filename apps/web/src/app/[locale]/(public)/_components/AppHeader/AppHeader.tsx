import { Button, Icon } from '@maw/ui-lib';
import { clsx } from '@maw/ui-lib/utils';
import { getTranslations } from 'next-intl/server';
import type { ComponentProps } from 'react';
import { Link } from '@/core/i18n/navigation';
import { SearchForm } from '@/features/content/components';
import type { RouteAlias } from '@/schemas';
import { AppLanguageSwitcher } from '../AppLanguageSwitcher';
import { AppDarkModeToggle } from './AppDarkModeToggle';
import { AppNavigationDesktop } from './AppNavigationDesktop';
import { AppNavigationMobile } from './AppNavigationMobile';
import { FloatingHeader } from './FloatingHeader';
import { PainLevelSelector } from './PainLevelSelector';
import { TextLogo } from './TextLogo';

type AppHeaderProps = {
  activeItem?: RouteAlias;
  className?: ComponentProps<'header'>['className'];
};

export async function AppHeader({ activeItem, className }: AppHeaderProps) {
  const t = await getTranslations();

  return (
    <>
      <FloatingHeader className="flex flex-wrap items-center gap-x-2 gap-y-1 px-2 py-2 xl:px-4 print:hidden">
        <div className="flex items-center gap-2">
          <AppNavigationMobile activeItem={activeItem} />
          <TextLogo />
        </div>
        <div className="order-last hidden w-full min-w-0 md:flex xl:order-none xl:w-auto xl:flex-1">
          <AppNavigationDesktop activeItem={activeItem} />
        </div>
        <div className="ml-auto flex items-center gap-3 md:gap-4">
          <SearchForm className="hidden md:flex" size="md" expandable />
          <Button
            render={
              <Link
                href="/search"
                aria-label={t('common.action.search')}
                title={t('common.action.search')}
              />
            }
            nativeButton={false}
            className="md:hidden rounded-full p-0"
            variant="outline"
          >
            <Icon icon="search" />
          </Button>
          <div className="hidden md:block">
            <AppLanguageSwitcher displayOnlyFlag />
          </div>
          <AppDarkModeToggle />
        </div>
      </FloatingHeader>
      <PainLevelSelector className={clsx('print:hidden', className)} />
    </>
  );
}
