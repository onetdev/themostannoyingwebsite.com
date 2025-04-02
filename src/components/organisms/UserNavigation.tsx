'use client';

import Link from 'next/link';
import { FunctionComponent, useMemo, useState } from 'react';

import Icon from '@/components/atoms/Icon';
import ShareModal from '@/components/organisms/ShareModal';
import { useTranslations } from 'next-intl';

export type UserNavigationProps = {
  className?: string;
};

const UserNavigation: FunctionComponent<UserNavigationProps> = ({
  className,
}) => {
  const t = useTranslations();
  const [showShareModal, setShowShareModal] = useState(false);

  const links = useMemo(
    () => [
      {
        path: '/settings',
        text: t('navigation.settings'),
        icon: 'settings' as const,
      },
      {
        path: '/user/login',
        text: t('navigation.login'),
        icon: 'login' as const,
      },
    ],
    [t],
  );

  return (
    <nav className={`group relative ${className}`} id="navigation-user">
      <ShareModal
        show={showShareModal}
        handleClose={() => setShowShareModal(false)}
      />
      <ul className="flex justify-end gap-4">
        <li>
          <a
            onClick={() => setShowShareModal(true)}
            className="flex cursor-pointer items-center gap-2">
            <Icon
              icon="share"
              title={t('common.share')}
              titleId="share"
              size="lg"
            />
            <span className="hidden md:inline-block">{t('common.share')}</span>
          </a>
        </li>
        {links.map(({ path, text, icon }) => (
          <li key={path}>
            <Link
              href={path}
              passHref
              prefetch={false}
              className="flex items-center gap-2">
              <Icon icon={icon} title={text} titleId={text} size="lg" />
              <span className="hidden md:inline-block">{text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserNavigation;
