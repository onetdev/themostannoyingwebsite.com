import Link from 'next/link';
import { FunctionComponent, useState } from 'react';

import ShareModal from '@/components/organisms/ShareModal';
import { Menu, MenuItem } from '@/components/atoms/GenericMenu';

type Props = {
  className?: string;
};

const UserNavigation: FunctionComponent<Props> = ({ className }) => {
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
