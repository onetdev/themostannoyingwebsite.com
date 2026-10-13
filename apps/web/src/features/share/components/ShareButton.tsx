'use client';

import { Button, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { useRuntimeStore } from '@/stores';

export type ShareButtonProps = {
  /**
   * URL to share. Defaults to the current page URL when omitted.
   */
  url?: string;
  /**
   * Title passed to the native share sheet. Defaults to `document.title`.
   */
  title?: string;
  className?: string;
};

/**
 * Triggers the platform share sheet when available, otherwise falls back to the
 * global share modal.
 */
export function ShareButton({ url, title, className }: ShareButtonProps) {
  const t = useTranslations();
  const showShareModal = useRuntimeStore((state) => state.showShareModal);
  const label = t('common.action.share');

  const onShare = async () => {
    const shareUrl = url ?? window.location.href;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: title ?? document.title,
          url: shareUrl,
        });
        return;
      } catch (error) {
        // The user dismissed the native sheet; do not force the fallback modal.
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    showShareModal(url);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={className}
      onClick={onShare}
      aria-label={label}
      title={label}
    >
      <Icon icon="share" aria-hidden />
    </Button>
  );
}
