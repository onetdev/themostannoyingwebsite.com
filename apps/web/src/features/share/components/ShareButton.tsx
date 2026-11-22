'use client';

import { Button, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import type { TelemetrySection } from '@/core/telemetry';

import { useShareAction } from '../hooks';

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
  /** Telemetry surface the share action belongs to. */
  section?: TelemetrySection;
};

/**
 * Triggers the platform share sheet when available, otherwise falls back to the
 * global share modal.
 */
export function ShareButton({
  url,
  title,
  className,
  section = 'common:share',
}: ShareButtonProps) {
  const t = useTranslations();
  const share = useShareAction();
  const label = t('common.action.share');

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => share({ url, title, surface: section })}
      aria-label={label}
      title={label}
      data-track="common:share"
      data-track-section={section}
    >
      <Icon icon="share" aria-hidden />
    </Button>
  );
}
