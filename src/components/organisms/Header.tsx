import Link from 'next/link';
import { FunctionComponent } from 'react';

import DarkModeToggle from '@/components/atoms/DarkModeToggle';
import Icon from '@/components/atoms/Icon';
import MarqueeText from '@/components/molecules/MarqueeText';
import MainNavigation from '@/components/organisms/MainNavigation';
import SearchForm from '@/components/organisms/SearchForm';
import UserNavigation from '@/components/organisms/UserNavigation';

const Header: FunctionComponent = () => {
  return (
    <header className="grid grid-cols-2 gap-1 py-2">
      <h1>
        <Link href="/" prefetch={false}>
          The <i>MAW</i>
        </Link>
      </h1>
      <div className="flex items-center justify-end gap-3">
        <SearchForm className="hidden md:flex" />
        <Link href="/search" className="md:hidden">
          <Icon icon="search" />
        </Link>
        <DarkModeToggle className="self-center justify-self-end" />
      </div>
      <MainNavigation className="col-span-1 my-3 -ml-3 pl-3 md:ml-0 md:pl-0" />
      <UserNavigation className="col-span-1 my-3" />
      <MarqueeText className="col-span-2 -mx-3 mb-2 bg-surface-alt py-2 md:-mx-5" />
    </header>
  );
};

export default Header;
