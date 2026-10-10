'use client';

import {
  Bubble,
  BubbleContent,
  Button,
  DotDotDotText,
  Icon,
  Message,
  MessageContent,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import type { ChatMessage } from '../../schemas';
import { MessageBubble } from './MessageBubble';
import { MessageForm } from './MessageForm';

export type HistoryOverlayProps = {
  history: ChatMessage[];
  onClose: () => void;
  onUserMessage: (message: string) => void;
};

export function HistoryOverlay({
  history,
  onClose,
  onUserMessage,
}: HistoryOverlayProps) {
  const [showTyping, setShowTyping] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    setShowTyping(history[history.length - 1]?.owner === 'user');
  }, [history]);

  const historyViewData = useMemo(() => {
    return history.map((item, index) => ({
      item,
      showTime: shouldBubbleShowTime(item, history[index + 1]),
    }));
  }, [history]);

  return (
    <div className="border-secondary bg-card flex flex-col rounded-lg border text-start">
      <div className="flex flex-row justify-between p-3 ps-5 shadow-xs">
        <h4 className="flex items-center gap-1 text-base font-bold">
          {t('support.chatBubble.hudTitle')}
          <Tooltip>
            <TooltipTrigger
              render={<span className="cursor-help font-normal" />}
            >
              *
            </TooltipTrigger>
            <TooltipContent side="top">
              {t('support.chatBubble.hudTitleDisclaimer')}
            </TooltipContent>
          </Tooltip>
        </h4>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onClose()}
          aria-label={t('common.action.close')}
        >
          <Icon icon="close" />
        </Button>
      </div>

      <MessageScrollerProvider defaultScrollPosition="end" autoScroll>
        <MessageScroller className="min-h-0 flex-1">
          <MessageScrollerViewport className="max-h-clamp-300-screen-half flex flex-col px-5 py-3">
            <MessageScrollerContent className="gap-2">
              {historyViewData.map(({ item, showTime }, index) => (
                <MessageScrollerItem key={index}>
                  <MessageBubble item={item} showTime={showTime} />
                </MessageScrollerItem>
              ))}
              {showTyping && (
                <MessageScrollerItem key="typing">
                  <Message align="start">
                    <MessageContent>
                      <Bubble variant="ghost">
                        <BubbleContent className="text-muted-foreground italic">
                          <DotDotDotText
                            message={t('support.chatBubble.agentIsTyping')}
                          />
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton>
            <Icon icon="chevronDown" />
            <span className="sr-only">
              {t('support.chatBubble.jumpToLatest')}
            </span>
          </MessageScrollerButton>
        </MessageScroller>
      </MessageScrollerProvider>

      <MessageForm
        className="flex justify-between p-3 ps-5 shadow-xs"
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
