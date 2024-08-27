import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEventHandler, FunctionComponent, useRef } from 'react';

const MessageForm: FunctionComponent<{
  className?: string;
  onMessage: (message: string) => void;
}> = ({ className, onMessage }) => {
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
        className="grow rounded-none border border-tertiary bg-surface p-3 text-on-surface"
        name="message"
        title="Your message"
        placeholder="Type here..."
        ref={userMessage}
      />
      <button
        className="rounded-r-lg border-none bg-primary pl-4 pr-5 text-on-primary"
        type="submit">
        <FontAwesomeIcon icon={['fas', 'paper-plane']} />
      </button>
    </form>
  );
};

export default MessageForm;
