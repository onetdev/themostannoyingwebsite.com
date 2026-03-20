'use client';

import { useEffect, useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  XIcon,
  XShareButton,
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
  const [currentUrl, setCurrentUrl] = useState<string>();

  useEffect(() => {
    setCurrentUrl(
      controlledShow ? window.location.href : window.location.origin,
    );
  }, [controlledShow]);

  const buttonClassName =
    'overflow-hidden hover:brightness-125 rounded-md! outline outline-border';
  const url = controlledUrl ?? currentUrl;

  return (
    <Dialog open={controlledShow} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{texts.title}</DialogTitle>
        </DialogHeader>
        <div className="max-w-screen-sm">
          <DialogDescription>{texts.description}</DialogDescription>
        </div>
        {url && (
          <DialogFooter>
            <div className="flex w-full gap-3">
              <FacebookShareButton url={url} className={buttonClassName}>
                <FacebookIcon size={32} />
              </FacebookShareButton>
              <XShareButton url={url} className={buttonClassName}>
                <XIcon size={32} />
              </XShareButton>
              <EmailShareButton url={url} className={buttonClassName}>
                <EmailIcon size={32} />
              </EmailShareButton>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
