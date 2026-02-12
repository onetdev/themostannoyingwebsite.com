import { Button, Icon, Input } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { SubmitEventHandler, useRef } from 'react';

export type MessageFormProps = {
  className?: string;
  onMessage: (message: string) => void;
};

export function MessageForm({ className, onMessage }: MessageFormProps) {
  const t = useTranslations();
  const userForm = useRef<HTMLFormElement>(null);
  const userMessage = useRef<HTMLInputElement>(null);

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
      ref={userForm}>
      <Input
        name="message"
        title={t('chatBubble.yourMessage')}
        placeholder={t('chatBubble.yourMessagePlaceholder')}
        ref={userMessage}
        className="-mr-1 w-full rounded-r-none"
      />
      <Button
        className="flex items-center rounded-l-none"
        aria-label={t('common.send')}
        type="submit"
        size="lg">
        <Icon icon="send" />
      </Button>
    </form>
  );
}
