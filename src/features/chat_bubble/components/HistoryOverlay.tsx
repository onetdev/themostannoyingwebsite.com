import { useTranslation } from 'next-i18next';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

import MessageBubble from './MessageBubble';
import MessageForm from './MessageForm';

import DotDotDotText from '@/components/atoms/DotDotDotText';
import Icon from '@/components/atoms/Icon';
import { HistoryItem } from '@/features/chat_bubble/types';

type HistoryOverlayProps = {
  history: HistoryItem[];
  onUserMessage: (message: string) => void;
  onClose: () => void;
};

const HistoryOverlay: FunctionComponent<HistoryOverlayProps> = ({
  onUserMessage,
  history,
  onClose,
}) => {
  const [showTyping, setShowTyping] = useState(true);
  const pagerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('chat_bubble');

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
          {t('hudTitle')} <abbr title={t('hudTitleDisclaimer')}>*</abbr>
        </h4>
        <button onClick={() => onClose()}>
          <Icon icon="close" size="lg" />
        </button>
      </div>
      <div
        className="flex max-h-clamp-300-screen-2/1 flex-col gap-3 overflow-auto px-5 py-3"
        ref={pagerRef}>
        {history.length > 0 &&
          history
            .sort((a, b) => a.time.getTime() - b.time.getTime())
            .map((item, index) => <MessageBubble key={index} item={item} />)}
        {showTyping && (
          <DotDotDotText
            message={t('agentIsTyping')}
            className="block text-base italic"
          />
        )}
      </div>
      <MessageForm
        className="flex justify-between p-3 pl-5 shadow-sm"
        onMessage={onUserMessage}
      />
    </div>
  );
};

export default HistoryOverlay;
