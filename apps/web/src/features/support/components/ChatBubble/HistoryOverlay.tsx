import {
  DotDotDotText,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';

import { MessageBubble } from './MessageBubble';
import { MessageForm } from './MessageForm';
import { ChatMessage } from '../../schemas';

export type HistoryOverlayProps = {
  history: ChatMessage[];
  onClose: () => void;
  onUserMessage: (message: string) => void;
  open?: boolean;
};

export function HistoryOverlay({
  history,
  onClose,
  onUserMessage,
  open = false,
}: HistoryOverlayProps) {
  const [showTyping, setShowTyping] = useState(true);
  const pagerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  useEffect(() => {
    setShowTyping(history[history.length - 1]?.owner === 'user');
  }, [history]);

  // We don't care about the current scroll position, this will force the user
  // to always see the most recent messages.
  useEffect(() => {
    (pagerRef.current?.lastChild as HTMLDivElement | undefined)?.scrollIntoView(
      { behavior: 'smooth' },
    );
  }, [history, showTyping, open]);

  const historyViewData = useMemo(() => {
    return history.map((item, index) => ({
      item,
      showTime: shouldBubbleShowTime(item, history[index + 1]),
    }));
  }, [history]);

  return (
    <div className="border-secondary bg-card rounded-lg border">
      <div className="flex flex-row justify-between p-3 pl-5 shadow-xs">
        <h4 className="flex items-center gap-1 text-base font-bold">
          {t('chatBubble.hudTitle')}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help font-normal">*</span>
            </TooltipTrigger>
            <TooltipContent side="top">
              {t('chatBubble.hudTitleDisclaimer')}
            </TooltipContent>
          </Tooltip>
        </h4>
        <button onClick={() => onClose()}>
          <Icon icon="close" />
        </button>
      </div>
      <div
        className="max-h-clamp-300-screen-half flex flex-col gap-2 overflow-auto px-5 py-3"
        ref={pagerRef}>
        {history.length > 0 &&
          historyViewData.map(({ item, showTime }, index) => (
            <MessageBubble key={index} item={item} showTime={showTime} />
          ))}
        {showTyping && (
          <DotDotDotText
            message={t('chatBubble.agentIsTyping')}
            className="block text-sm italic md:text-base"
          />
        )}
      </div>
      <MessageForm
        className="flex justify-between p-3 pl-5 shadow-xs"
        onMessage={onUserMessage}
      />
    </div>
  );
}

const shouldBubbleShowTime = (current: ChatMessage, compareTo: ChatMessage) => {
  if (!compareTo || current.owner !== compareTo.owner) return true;

  return (
    Math.abs(current.time.getTime() - compareTo.time.getTime()) > 5 * 60 * 1000
  );
};
