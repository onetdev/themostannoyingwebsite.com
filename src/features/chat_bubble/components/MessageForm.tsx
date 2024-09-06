import { useTranslation } from 'next-i18next';
import { FormEventHandler, FunctionComponent, useRef } from 'react';

import Icon from '@/components/atoms/Icon';

export type MessageFormProps = {
  className?: string;
  onMessage: (message: string) => void;
};

const MessageForm: FunctionComponent<MessageFormProps> = ({
  className,
  onMessage,
}) => {
  const { t } = useTranslation('chat_bubble');
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
    <form className={className} onSubmit={handleFormSubmit} ref={userForm}>
      <input
        className="grow rounded-none border border-r-0 border-tertiary bg-surface p-3 text-on-surface"
        name="message"
        title={t('your_message')}
        placeholder={t('your_message_placeholder')}
        ref={userMessage}
      />
      <button
        className="rounded-r-lg border-none bg-primary pl-4 pr-5 text-on-primary"
        type="submit">
        <Icon icon="faPaperPlane" />
      </button>
    </form>
  );
};

export default MessageForm;
