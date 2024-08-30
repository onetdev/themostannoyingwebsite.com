import { FunctionComponent, useEffect, useRef, useState } from 'react';

import DotDotDotText from '@/components/atoms/DotDotDotText';
import { HistoryItem } from '@/features/chat_bubble/types';
import Icon from '@/components/atoms/Icon';

import MessageForm from './MessageForm';
import MessageBubble from './MessageBubble';

type Props = {
  history: HistoryItem[];
  onUserMessage: (message: string) => void;
  onClose: () => void;
};

const HistoryOverlay: FunctionComponent<Props> = ({
  onUserMessage,
  history,
  onClose,
}) => {
  const [showTyping, setShowTyping] = useState(true);
  const pagerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowTyping(history[history.length - 1]?.isUser ?? false);
  }, [history]);

  // We don't care about the current scroll position, this will force the user
  // to always see the most recent messages.
  useEffect(() => {
    (pagerRef.current?.lastChild as HTMLDivElement | undefined)?.scrollIntoView(
      { behavior: 'smooth' },
    );
  }, [history, showTyping]);

  return (
    <div className="rounded-lg border border-secondary bg-surface">
      <div className="flex flex-row justify-between p-3 pl-5 shadow-sm">
        <h4 className="text-lg font-bold">
          Chat with a &quot;100% real huuman&quot;{' '}
          <abbr title="Disclaimer: Actually, this is a bot that almost feels like a real human (not a smart one) but it's still just a bot">
            *
          </abbr>
        </h4>
        <button onClick={() => onClose()}>
          <Icon icon="faTimes" size="lg" />
        </button>
      </div>
      <div
        className="flex max-h-clamp-300-screen-2/1 flex-col gap-3 overflow-auto px-5 py-3"
        ref={pagerRef}>
        {history.length > 0 &&
          history
            .sort((a, b) => a.time.getTime() - b.time.getTime())
            .map((item, index) => <MessageBubble key={index} item={item} />)}
        {showTyping && <DotDotDotText className="block text-base italic" />}
      </div>
      <MessageForm
        className="flex justify-between p-3 pl-5 shadow-sm"
        onMessage={onUserMessage}
      />
    </div>
  );
};

export default HistoryOverlay;
