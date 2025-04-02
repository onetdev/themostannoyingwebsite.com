import { FormEventHandler, FunctionComponent, useRef } from 'react';

import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import TextInput from '@/components/atoms/TextInput';
import { useTranslations } from 'next-intl';

export type MessageFormProps = {
  className?: string;
  onMessage: (message: string) => void;
};

const MessageForm: FunctionComponent<MessageFormProps> = ({
  className,
  onMessage,
}) => {
  const t = useTranslations();
  const userForm = useRef<HTMLFormElement>(null);
  const userMessage = useRef<HTMLInputElement>(null);

  const handleFormSubmit: FormEventHandler = (e) => {
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
      <TextInput
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
        size="md">
        <Icon icon="send" />
      </Button>
    </form>
  );
};

export default MessageForm;
