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
        <Link href="/settings">{t('navigation.settings')}</Link>
        <span onClick={() => setShowShareModal(true)}>
          {t('actions.share')}
        </span>
      </GenericMenu>
    </nav>
  );
};

export default UserNavigation;
