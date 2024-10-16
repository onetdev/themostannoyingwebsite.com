import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import { GenericMenu } from '@/components/molecules/GenericMenu';

export type MainNavigationProps = {
  className?: string;
};

const MainNavigation: FunctionComponent<MainNavigationProps> = ({
  className,
}) => {
  const { t } = useTranslation('common');

  const links = [
    { path: '/', text: t('navigation.home') },
    { path: '/hot-things', text: t('navigation.hotThings') },
    { path: '/contact', text: t('navigation.contact') },
    { path: '/privacy-policy', text: t('navigation.privacyPolicy') },
  ];

  return (
    <nav className={className} id="navigation-main">
      <GenericMenu>
        {links.map(({ path, text }) => (
          <Link key={`${path}${text}`} href={path} prefetch={false}>
            {text}
          </Link>
        ))}
      </GenericMenu>
    </nav>
  );
};

export default MainNavigation;
