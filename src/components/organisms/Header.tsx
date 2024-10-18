import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import DarkModeToggle from '@/components/atoms/DarkModeToggle';
import MarqueeText from '@/components/molecules/MarqueeText';
import MainNavigation from '@/components/organisms/MainNavigation';
import UserNavigation from '@/components/organisms/UserNavigation';

const Header: FunctionComponent = () => {
  const { t } = useTranslation('common');

  return (
    <header className="grid grid-cols-2 gap-1 py-2">
      <h1>
        <Link href="/" prefetch={false}>
          The <i>MAW</i>
        </Link>
      </h1>
      <div className="flex items-center justify-end gap-3">
        <Link href="/search" prefetch={false}>
          {t('navigation.search')}
        </Link>
        <DarkModeToggle className="self-center justify-self-end" />
      </div>
      <MainNavigation className="my-1" />
      <UserNavigation className="self-center justify-self-end" />
      <MarqueeText className="col-span-2 -mx-5 mb-2 bg-surface" />
    </header>
  );
};

export default Header;
