'use client';

import { Marker, MarkerContent, MarkerIcon, Spinner } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { usePool } from '@/features/content/hooks';
import { useRotatingMessage } from '@/hooks/useRotatingMessage';

export interface LoadingMessagesProps {
  className?: string;
}

/**
 * Live "thinking…" status line that rotates through the API-served
 * `loading-messages` pool. Rendered as an ARIA status region so assistive
 * technology announces that work is in progress.
 */
export function LoadingMessages({ className }: LoadingMessagesProps) {
  const t = useTranslations('content.loading');
  const messages = usePool('loading-messages');
  const message = useRotatingMessage(messages) ?? t('fallback');

  return (
    <Marker
      role="status"
      aria-live="polite"
      className={cn('text-base', className)}
      data-testid="loading-messages"
    >
      <MarkerIcon className="flex items-center justify-center">
        <Spinner />
      </MarkerIcon>
      <MarkerContent className="shimmer">{message}</MarkerContent>
    </Marker>
  );
}
