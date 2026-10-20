'use client';

import { useRuntimeStore } from '@/stores';

export type ShareActionInput = {
  /** URL to share. Defaults to the current page URL. */
  url?: string;
  /** Title passed to the native sheet. Defaults to `document.title`. */
  title?: string;
  /** Optional share text. */
  text?: string;
};

export type ShareAction = (input?: ShareActionInput) => Promise<void>;

/**
 * Returns a share action that prefers the platform share sheet
 * (`navigator.share`) and falls back to the global share modal. Dismissing the
 * native sheet (`AbortError`) deliberately does not force the fallback.
 */
export function useShareAction(): ShareAction {
  const showShareModal = useRuntimeStore((state) => state.showShareModal);

  return async ({ url, title, text }: ShareActionInput = {}) => {
    const shareUrl =
      url ?? (typeof window !== 'undefined' ? window.location.href : undefined);

    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function'
    ) {
      try {
        await navigator.share({
          title: title ?? document.title,
          text,
          url: shareUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    showShareModal(shareUrl);
  };
}
