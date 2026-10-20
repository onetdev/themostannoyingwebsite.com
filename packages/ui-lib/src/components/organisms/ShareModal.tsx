'use client';

import { useEffect, useState } from 'react';
import { buttonVariants } from '../atoms/Button';
import { Icon, type IconAliaseKey } from '../atoms/Icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog';

type ShareTarget = {
  href: string;
  icon: IconAliaseKey;
  label: string;
};

export type ShareModalProps = {
  show: boolean;
  onClose: () => void;
  url?: string;
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
  labels: ShareModalProps['texts']['labels'],
): ShareTarget[] {
  const encodedUrl = encodeURIComponent(url);

  return [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'facebook',
      label: labels.facebook,
    },
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      icon: 'xTwitter',
      label: labels.x,
    },
    {
      href: `mailto:?body=${encodedUrl}`,
      icon: 'email',
      label: labels.email,
    },
  ];
}

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
              {buildShareTargets(url, texts.labels).map((target) => {
                const isExternal = target.href.startsWith('https://');

                return (
                  <a
                    key={target.icon}
                    aria-label={target.label}
                    className={buttonVariants({
                      size: 'icon',
                      variant: 'outline',
                    })}
                    href={target.href}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    target={isExternal ? '_blank' : undefined}
                    title={target.label}
                  >
                    <Icon icon={target.icon} />
                  </a>
                );
              })}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
