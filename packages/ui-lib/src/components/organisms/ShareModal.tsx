'use client';

import { useEffect, useState } from 'react';
import type { IconAliaseKey } from '../atoms/Icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog';
import { ShareOption } from './ShareOption';

type ShareTarget = {
  href: string;
  icon: IconAliaseKey;
  label: string;
};

export type ShareModalProps = {
  show: boolean;
  onClose: () => void;
  url?: string;
  /** Telemetry surface for the modal contents. */
  section?: string;
  texts: {
    title: string;
    description: string;
    labels: {
      email: string;
      facebook: string;
      x: string;
    };
  };
};

function buildShareTargets(
  url: string,
  texts: ShareModalProps['texts'],
): ShareTarget[] {
  const encodedUrl = encodeURIComponent(url);
  const emailSubject = encodeURIComponent(texts.title);
  const emailBody = encodeURIComponent(`${texts.description}\r\n\r\n${url}`);

  return [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'facebook',
      label: texts.labels.facebook,
    },
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      icon: 'xTwitter',
      label: texts.labels.x,
    },
    {
      href: `mailto:?subject=${emailSubject}&body=${emailBody}`,
      icon: 'email',
      label: texts.labels.email,
    },
  ];
}

export function ShareModal({
  show: controlledShow,
  url: controlledUrl,
  onClose,
  section,
  texts,
}: ShareModalProps) {
  const [currentUrl, setCurrentUrl] = useState<string>();

  useEffect(() => {
    setCurrentUrl(
      controlledShow ? window.location.href : window.location.origin,
    );
  }, [controlledShow]);

  const url = controlledUrl ?? currentUrl;

  return (
    <Dialog open={controlledShow} onOpenChange={(open) => !open && onClose()}>
      <DialogContent data-track-section={section}>
        <DialogHeader>
          <DialogTitle>{texts.title}</DialogTitle>
        </DialogHeader>
        <div className="max-w-screen-sm">
          <DialogDescription>{texts.description}</DialogDescription>
        </div>
        {url && (
          <DialogFooter>
            <div className="flex w-full gap-3">
              {buildShareTargets(url, texts).map((target) => (
                <ShareOption key={target.icon} {...target} />
              ))}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
