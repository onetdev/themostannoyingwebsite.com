import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FunctionComponent, useState } from 'react';

import { GenericMenu } from '@/components/molecules/GenericMenu';
import ShareModal from '@/components/organisms/ShareModal';

type UserNavigationProps = {
  className?: string;
};

const UserNavigation: FunctionComponent<UserNavigationProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <nav className={className} id="navigation-user">
      <ShareModal
        show={showShareModal}
        handleClose={() => setShowShareModal(false)}
      />
      <GenericMenu>
        <a onClick={() => setShowShareModal(true)} className="cursor-pointer">
          {t('actions.share')}
        </a>
        <Link href="/settings" prefetch={false}>
          {t('navigation.settings')}
        </Link>
        <Link href="/user/login" prefetch={false}>
          {t('navigation.login')}
        </Link>
      </GenericMenu>
    </nav>
  );
};

export default UserNavigation;
