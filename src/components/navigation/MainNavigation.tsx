import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Menu, MenuItem } from './GenericMenu';

export type MainNavigationProps = {
  className?: string;
};

const MainNavigation = ({ className }: MainNavigationProps) => {
  const { t } = useTranslation('common');

  const links = [
    { path: '/', text: t('navigation.home') },
    { path: '/hot-things', text: t('navigation.hotThings') },
    { path: '/contact', text: t('navigation.contact') },
    { path: '/privacy-policy', text: t('navigation.privacyPolicy') },
  ];

  return (
    <nav className={className} id="navigation-main">
      <Menu>
        {links.map(({ path, text }, index) => (
          <MenuItem key={index}>
            <Link href={path}>{text}</Link>
          </MenuItem>
        ))}
      </Menu>
    </nav>
  );
};

export default MainNavigation;
