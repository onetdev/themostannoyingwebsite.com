import { Link } from '@/i18n/navigation';
import { FunctionComponent, useMemo } from 'react';
import { useTranslations } from 'next-intl';

import Icon from '@/components/atoms/Icon';

export type MainNavigationProps = {
  className?: string;
};

const MainNavigation: FunctionComponent<MainNavigationProps> = ({
  className,
}) => {
  const t = useTranslations();

  const links = useMemo(
    () => [
      { path: '/', text: t('navigation.home') },
      { path: '/hot-things', text: t('navigation.hotThings') },
      { path: '/contact', text: t('navigation.contact') },
      { path: '/dilf', text: t('navigation.dilf') },
      { path: '/privacy-policy', text: t('navigation.privacyPolicy') },
      { path: '/about', text: t('navigation.about') },
      { path: '/donate', text: t('navigation.donate') },
    ],
    [t],
  );

  return (
    <nav className={`group relative ${className}`} id="navigation-main" role="navigation">
      <span className="block md:hidden">
        <Icon icon="menu" size="lg" />
      </span>
      <ul
        className={`absolute inset-x-0 z-20 hidden flex-col gap-x-5 bg-surface py-2 font-primary text-lg drop-shadow-md group-hover:flex md:relative md:right-0 md:flex md:flex-row md:flex-wrap md:py-0 md:drop-shadow-none`}>
        {links.map(({ path, text }) => (
          <li key={`${path}${text}`} className="px-3 md:px-0">
            <Link href={path} prefetch={false}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
