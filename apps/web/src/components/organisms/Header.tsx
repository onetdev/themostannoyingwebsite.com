import { Link } from '@/i18n/navigation';
import { FunctionComponent } from 'react';

import { Icon, DarkModeToggle, MarqueeText } from '@maw/ui';
import MainNavigation from '@/components/organisms/MainNavigation';
import SearchForm from '@/components/organisms/SearchForm';
import UserNavigation from '@/components/organisms/UserNavigation';
import { useTranslations } from 'next-intl';

const Header: FunctionComponent = () => {
  const t = useTranslations();

  return (
    <header id="header" className="grid grid-cols-2 gap-1 py-2" role="banner">
      <h1 className="pb-3 font-semibold tracking-tighter">
        <Link href="/" prefetch={false} title={t('app.title')}>
          <span className="text-on-surface lg:hidden">
            <i className="font-light">the</i> MAW
          </span>
          <span className="hidden text-on-surface lg:inline">
            <i className="text-3xl font-light opacity-80">the</i>{' '}
            <span>Most Annoying Website</span>
          </span>
        </Link>
      </h1>
      <div className="flex items-center justify-end gap-3">
        <SearchForm className="hidden md:flex" size="md" />
        <Link href="/search" className="md:hidden">
          <Icon icon="search" />
        </Link>
        <DarkModeToggle className="self-center justify-self-end" size="lg" />
      </div>
      <MainNavigation className="col-span-1 my-3 -ml-3 pl-3 md:ml-0 md:pl-0" />
      <UserNavigation className="col-span-1 my-3" />
      <MarqueeText className="col-span-2 -mx-3 mb-2 bg-surface-alt py-2 md:-mx-5" />
    </header>
  );
};

export default Header;
