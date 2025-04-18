'use client';

import { useEffect, useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

import { Modal } from '@maw/ui-lib';

export type ShareModalProps = {
  show: boolean;
  onClose: () => void;
  url?: string;
  texts: {
    title: string;
    description: string;
  };
};

export function ShareModal({
  show: controlledShow,
  url: controlledUrl,
  onClose,
  texts,
}: ShareModalProps) {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [controlledShow]);

  const buttonStyle = 'overflow-hidden hover:brightness-125 rounded-md';
  const url = controlledUrl || currentUrl;

  return (
    <Modal
      title={texts.title}
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
      visible={controlledShow}
      onClose={onClose}>
      <div className="max-w-screen-sm">{texts.description}</div>
    </Modal>
  );
}
