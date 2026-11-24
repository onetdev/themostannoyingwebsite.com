'use client';

import { Button, Icon, Textarea } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { type SubmitEventHandler, useRef } from 'react';

export interface ShortsCommentComposerProps {
  className?: string;
  onSubmit: (message: string) => void;
}

/**
 * Compact single-field composer mirroring the support chat input.
 *
 * Posting is intentionally gated behind the existing login-required modal, in
 * line with the disclaimer that comments on this site are not real.
 */
export function ShortsCommentComposer({
  className,
  onSubmit,
}: ShortsCommentComposerProps) {
  const t = useTranslations();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit: SubmitEventHandler = (event) => {
    event.preventDefault();
    const message = inputRef.current?.value.trim();

    if (!message) {
      return;
    }

    onSubmit(message);
  };

  return (
    <form
      method="post"
      className={cn(className)}
      data-track-form="shorts:comment:create"
      data-track-section="content:shorts:comments"
      onSubmit={handleSubmit}
    >
      <div className="bg-muted/50 border-border focus-within:border-ring flex items-center gap-2 rounded-2xl border p-2 transition-colors">
        <Textarea
          ref={inputRef}
          name="message"
          rows={1}
          aria-label={t('comments.composer.label')}
          placeholder={t('comments.composer.placeholder')}
          className="max-h-32 min-h-0 flex-1 resize-none border-0 bg-transparent p-1 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
        <Button
          type="submit"
          size="icon"
          className="shrink-0 rounded-full"
          aria-label={t('common.action.send')}
          data-track="shorts:comments:send"
        >
          <Icon icon="arrowUp" />
        </Button>
      </div>
    </form>
  );
}
