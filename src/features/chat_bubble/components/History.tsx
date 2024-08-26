import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactTimeAgo from 'react-timeago';

export type HistoryItem = {
  text: string;
  isUser: boolean;
  time: Date;
};

type Props = {
  history: HistoryItem[];
  onUserMessage: (message: string) => void;
  onClose: () => void;
};

const History: FunctionComponent<Props> = ({
  onUserMessage,
  history,
  onClose,
}) => {
  const [showTyping, setShowTyping] = useState(true);
  const userForm = useRef<HTMLFormElement>(null);
  const userMessage = useRef<HTMLInputElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const message = userMessage.current?.value;
    if (message) {
      onUserMessage(message);
      userForm.current?.reset();
    }
  };

  useEffect(() => {
    setShowTyping(history[history.length - 1]?.isUser ?? false);
  }, [history]);

  // We don't care about the current scroll position, this will force the user
  // to always see the most recent messages.
  useEffect(() => {
    (
      pagerRef.current?.lastChild as HTMLSpanElement | undefined
    )?.scrollIntoView({ behavior: 'smooth' });
  }, [history, showTyping]);

  return (
    <div className="min-w-clamp-400-2/3 rounded-lg border border-secondary bg-surface">
      <div className="flex justify-between p-3 pl-5 shadow-sm">
        <h4 className="text-lg font-bold">
          Chat with a &quot;100% real human&quot;{' '}
          <abbr title="Disclaimer: Actually, this is a bot that almost feels like a real human (not a smart one)">
            *
          </abbr>
        </h4>
        <button onClick={() => onClose()}>
          <FontAwesomeIcon icon={['fas', 'times']} />
        </button>
      </div>
      <div
        className="max-h-clamp-300-2/1 overflow-auto px-5 py-3"
        ref={pagerRef}>
        {history.length > 0 &&
          history
            .sort((a, b) => a.time.getTime() - b.time.getTime())
            .map((item, index) => (
              <div
                key={index}
                data-user={item.isUser.toString()}
                className="relative mb-6 mt-5 rounded-lg bg-secondary p-3 text-on-secondary data-[user=false]:mr-6 data-[user=true]:ml-6 data-[user=false]:bg-primary data-[user=false]:text-on-primary">
                {item.text}
                <br />
                <small className="absolute -bottom-4 text-sm text-on-background opacity-50">
                  <ReactTimeAgo date={item.time} />
                </small>
              </div>
            ))}
        {showTyping && (
          <div className="text-base italic after:contents after:animate-dot-dot-dot">
            Is typing
          </div>
        )}
      </div>
      <form
        className="flex justify-between p-3 pl-5 shadow-sm"
        onSubmit={handleFormSubmit}
        ref={userForm}>
        <input
          className="grow rounded-none border border-tertiary bg-surface p-3 text-on-surface"
          name="message"
          title="Your message"
          placeholder="Type here..."
          ref={userMessage}
        />
        <button
          className="rounded-t-lg border-none bg-primary pr-5 text-on-primary"
          type="submit">
          <FontAwesomeIcon icon={['fas', 'paper-plane']} />
        </button>
      </form>
    </div>
  );
};

export default History;
