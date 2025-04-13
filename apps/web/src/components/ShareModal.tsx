'use client';

import { Modal } from '@maw/ui';
import { useTranslations } from 'next-intl';
import { FunctionComponent, useEffect, useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

type ShareModalProps = {
  show: boolean;
  handleClose: () => void;
};

const ShareModal: FunctionComponent<ShareModalProps> = ({
  show,
  handleClose,
}) => {
  const t = useTranslations();
  const [url, setUrl] = useState<string>('');

  const buttonStyle = 'overflow-hidden hover:brightness-125 rounded-md';

  useEffect(() => {
    setUrl(window.location.href);
  }, [show]);

  return (
    <Modal
      title={t('share.modal.title')}
      actions={
        <div className="flex gap-3">
          <FacebookShareButton url={url} className={buttonStyle}>
            <FacebookIcon size={32} />
          </FacebookShareButton>
          <TwitterShareButton url={url} className={buttonStyle}>
            <XIcon size={32} />
          </TwitterShareButton>
          <EmailShareButton url={url} className={buttonStyle}>
            <EmailIcon size={32} />
          </EmailShareButton>
        </div>
      }
      visible={show}
      onClose={handleClose}>
      <div className="max-w-screen-sm">{t('share.modal.description')}</div>
    </Modal>
  );
};

export default ShareModal;
