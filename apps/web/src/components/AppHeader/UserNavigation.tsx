'use client';

import { IconAliaseKey, IconCollapsibleMenu, ShareModal } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { PropsWithChildren, useMemo, useState } from 'react';

import { ActiveNavigationItem } from './types';

import { Link } from '@/i18n/navigation';

export type UserNavigationProps = {
  className?: string;
  activeItem?: ActiveNavigationItem;
};

type NavItem = {
  key: ActiveNavigationItem | 'global-share';
  label: string;
  path: string;
  icon: IconAliaseKey;
  onClick?: () => void;
};

const NavLink = ({
  path,
  onClick,
  children,
  ...rest
}: PropsWithChildren<NavItem>) => {
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
    <Link href={path} prefetch={false} {...rest}>
      {children}
    </Link>
  );
};

export function UserNavigation({ className, activeItem }: UserNavigationProps) {
  const t = useTranslations();
  const [showShareModal, setShowShareModal] = useState(false);

  const items: NavItem[] = useMemo(
    () => [
      {
        icon: 'share' as const,
        key: 'global-share' as const,
        label: t('common.share'),
        onClick: () => setShowShareModal(true),
        path: '#',
      },
      {
        icon: 'settings' as const,
        key: 'settings' as const,
        label: t('navigation.settings'),
        path: '/settings',
      },
      {
        icon: 'login' as const,
        key: 'login' as const,
        label: t('navigation.login'),
        path: '/user/login',
      },
    ],
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
        activeItem={activeItem}
        id="navigation-user"
        items={items}
        IteratorComponent={NavLink}
      />
    </>
  );
}

export default UserNavigation;
