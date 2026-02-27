import {
  Icon,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { type SubmitEventHandler, useRef } from 'react';

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
      ref={userForm}
    >
      <InputGroup>
        <InputGroupInput
          name="message"
          title={t('chatBubble.yourMessage')}
          placeholder={t('chatBubble.yourMessagePlaceholder')}
          ref={userMessage}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={t('common.send')}
            type="submit"
            size="sm"
          >
            <Icon icon="send" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
