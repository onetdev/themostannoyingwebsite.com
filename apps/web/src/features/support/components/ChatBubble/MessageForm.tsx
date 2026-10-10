'use client';

import { Button, Icon, Textarea } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { type SubmitEventHandler, useRef } from 'react';

export type MessageFormProps = {
  className?: string;
  onMessage: (message: string) => void;
};

export function MessageForm({ className, onMessage }: MessageFormProps) {
  const t = useTranslations();
  const userForm = useRef<HTMLFormElement>(null);
  const userMessage = useRef<HTMLTextAreaElement>(null);

  const handleFormSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
    const message = userMessage.current?.value;
    if (message) {
      onMessage(message);
      userForm.current?.reset();
    }
  };

  return (
    <form
      method="post"
      className={className}
      onSubmit={handleFormSubmit}
      ref={userForm}
    >
      <div className="bg-muted/50 border-border focus-within:border-ring flex items-end gap-2 rounded-2xl border p-3 transition-colors">
        <Textarea
          name="message"
          rows={1}
          title={t('support.chatBubble.yourMessage')}
          placeholder={t('support.chatBubble.yourMessagePlaceholder')}
          ref={userMessage}
          className="max-h-32 min-h-0 flex-1 resize-none border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
        <Button
          type="submit"
          size="icon"
          className="shrink-0 rounded-full"
          aria-label={t('common.action.send')}
        >
          <Icon icon="arrowUp" />
        </Button>
      </div>
    </form>
  );
}
