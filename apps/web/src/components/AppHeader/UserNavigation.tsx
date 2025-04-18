'use client';

import { IconAliaseKey, IconCollapsibleMenu, ShareModal } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FunctionComponent, PropsWithChildren, useMemo, useState } from 'react';

import { Link } from '@/i18n/navigation';

export type UserNavigationProps = {
  className?: string;
};

type NavItem = {
  key: string;
  label: string;
  path: string;
  icon: IconAliaseKey;
  onClick?: () => void;
};

const NavLink = ({ path, onClick, children }: PropsWithChildren<NavItem>) => {
  if (path === '#') {
    return (
      <button
        onClick={onClick}
        className="text-primary animate-hue-full-rotate cursor-pointer">
        {children}
      </button>
    );
  }

  return (
    <Link href={path} passHref prefetch={false}>
      {children}
    </Link>
  );
};

const UserNavigation: FunctionComponent<UserNavigationProps> = ({
  className,
}) => {
  const t = useTranslations();
  const [showShareModal, setShowShareModal] = useState(false);

  const items: NavItem[] = useMemo(
    () =>
      [
        {
          path: '#',
          label: t('common.share'),
          icon: 'share' as const,
          onClick: () => setShowShareModal(true),
        },
        {
          path: '/settings',
          label: t('navigation.settings'),
          icon: 'settings' as const,
        },
        {
          path: '/user/login',
          label: t('navigation.login'),
          icon: 'login' as const,
        },
      ].map((item) => ({ ...item, key: item.path })),
    [t],
  );

  const shareTexts = {
    title: t('share.modal.title'),
    description: t('share.modal.description'),
  };

  return (
    <>
      <ShareModal
        onClose={() => setShowShareModal(false)}
        show={showShareModal}
        texts={shareTexts}
      />
      <IconCollapsibleMenu
        className={className}
        id="navigation-user"
        items={items}
        IteratorComponent={NavLink}
      />
    </>
  );
};

export default UserNavigation;
