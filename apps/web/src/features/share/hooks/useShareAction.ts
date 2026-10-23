'use client';

import { track } from '@/core/telemetry';
import { useRuntimeStore } from '@/stores';

export type ShareActionInput = {
  /** URL to share. Defaults to the current page URL. */
  url?: string;
  /** Title passed to the native sheet. Defaults to `document.title`. */
  title?: string;
  /** Optional share text. */
  text?: string;
  /** Telemetry surface that triggered the share, e.g. `content:article`. */
  surface?: string;
};

export type ShareAction = (input?: ShareActionInput) => Promise<void>;

/**
 * Returns a share action that prefers the platform share sheet
 * (`navigator.share`) and falls back to the global share modal. Dismissing the
 * native sheet (`AbortError`) deliberately does not force the fallback.
 */
export function useShareAction(): ShareAction {
  const showShareModal = useRuntimeStore((state) => state.showShareModal);

  return async ({ url, title, text, surface }: ShareActionInput = {}) => {
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
        track('ui.share', { channel: 'native', surface });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    track('ui.share', { channel: 'modal', surface });
    showShareModal(shareUrl);
  };
}
