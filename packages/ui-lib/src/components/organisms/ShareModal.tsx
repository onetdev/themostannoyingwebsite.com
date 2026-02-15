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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog';

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

  const buttonStyle = 'overflow-hidden hover:brightness-125 rounded-md outline';
  const url = controlledUrl || currentUrl;

  return (
    <Dialog open={controlledShow} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{texts.title}</DialogTitle>
        </DialogHeader>
        <div className="max-w-screen-sm">
          <DialogDescription>{texts.description}</DialogDescription>
        </div>
        <DialogFooter>
          <div className="flex w-full gap-3">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
