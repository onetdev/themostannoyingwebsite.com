import Link from 'next/link';
import { FunctionComponent, useState } from 'react';

import { GenericMenu } from '@/components/atoms/GenericMenu';
import ShareModal from '@/components/organisms/ShareModal';

type UserNavigationProps = {
  className?: string;
};

const UserNavigation: FunctionComponent<UserNavigationProps> = ({
  className,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <nav className={className} id="navigation-user">
      <ShareModal
        show={showShareModal}
        handleClose={() => setShowShareModal(false)}
      />
      <GenericMenu>
        <Link href="/settings">Settings</Link>
        <span onClick={() => setShowShareModal(true)}>Share</span>
      </GenericMenu>
    </nav>
  );
};

export default UserNavigation;
