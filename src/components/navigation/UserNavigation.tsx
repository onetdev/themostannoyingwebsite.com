import Link from 'next/link';
import { useState } from 'react';

import ShareModal from '@/components/modal/ShareModal';

import { Menu, MenuItem } from './GenericMenu';

type Props = {
  className?: string;
};

const UserNavigation = ({ className }: Props) => {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <nav className={className} id="navigation-user">
      <ShareModal
        show={showShareModal}
        handleClose={() => setShowShareModal(false)}
      />
      <Menu>
        <MenuItem>
          <Link href="/settings">Settings</Link>
        </MenuItem>
        <MenuItem>
          <span onClick={() => setShowShareModal(true)}>Share</span>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default UserNavigation;
