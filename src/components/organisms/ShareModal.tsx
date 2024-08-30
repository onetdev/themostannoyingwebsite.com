'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import {
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  XIcon,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';

import Modal from '@/components/molecules/Modal';

type Props = {
  show: boolean;
  handleClose: () => void;
};

const ShareModal: FunctionComponent<Props> = ({ show, handleClose }) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    setUrl(window.location.href);
  }, [show]);

  return (
    <Modal
      title="Share"
      actions={
        <>
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <XIcon size={32} />
          </TwitterShareButton>
          <EmailShareButton url={url}>
            <EmailIcon size={32} />
          </EmailShareButton>
        </>
      }
      visible={show}
      onClose={handleClose}>
      Sharing is caring, please show this awefully anoying website to your
      friends.
    </Modal>
  );
};

export default ShareModal;
