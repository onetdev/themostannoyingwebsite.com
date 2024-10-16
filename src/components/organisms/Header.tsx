import Link from 'next/link';
import { FunctionComponent } from 'react';

import Marquee from '@/components/molecules/Marquee';
import MainNavigation from '@/components/organisms/MainNavigation';
import UserNavigation from '@/components/organisms/UserNavigation';
import DarkModeToggle from '@/root/src/components/atoms/DarkModeToggle';

const Header: FunctionComponent = () => {
  return (
    <header className="grid grid-cols-2 gap-1 px-0 py-2">
      <h1>
        <Link href="/" prefetch={false}>
          The <i>MAW</i>
        </Link>
      </h1>
      <DarkModeToggle className="self-center justify-self-end" />
      <MainNavigation />
      <UserNavigation className="self-center justify-self-end" />
      <Marquee className="col-span-2 w-full bg-surface" />
    </header>
  );
};

export default Header;
