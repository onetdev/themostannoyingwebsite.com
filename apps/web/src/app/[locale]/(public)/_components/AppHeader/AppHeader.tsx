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
      <FloatingHeader className="grid grid-cols-2 items-center gap-x-2 px-2 py-3 xl:px-4 print:hidden">
        <div className="flex items-center gap-2">
          <AppNavigationMobile activeItem={activeItem} />
          <TextLogo />
        </div>
        <div className="flex items-center justify-end gap-3 md:gap-4">
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
            <AppLanguageSwitcher />
          </div>
          <AppDarkModeToggle />
        </div>
        <div className="col-span-2 mt-2 hidden items-center md:flex">
          <AppNavigationDesktop activeItem={activeItem} />
        </div>
      </FloatingHeader>
      <PainLevelSelector className={clsx('print:hidden', className)} />
    </>
  );
}
