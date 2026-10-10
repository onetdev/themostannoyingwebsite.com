'use client';

import {
  Button,
  DotDotDotText,
  Icon,
  Marker,
  MarkerContent,
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
    <div className="border-secondary bg-card flex flex-col rounded-lg border text-start shadow-xl">
      <div className="flex items-start justify-between gap-2 p-3 ps-5 shadow-xs">
        <div className="min-w-0">
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
          <p className="text-muted-foreground truncate text-xs">
            {t('support.chatBubble.subtitle')}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onClose()}
            aria-label={t('common.action.close')}
            title={t('common.action.close')}
          >
            <Icon icon="close" />
          </Button>
        </div>
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
                  <Marker>
                    <MarkerContent>
                      <DotDotDotText
                        message={t('support.chatBubble.agentIsTyping')}
                      />
                    </MarkerContent>
                  </Marker>
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

      <MessageForm className="p-3 ps-5" onMessage={onUserMessage} />
    </div>
  );
}

const shouldBubbleShowTime = (current: ChatMessage, compareTo: ChatMessage) => {
  if (!compareTo || current.owner !== compareTo.owner) return true;

  return (
    Math.abs(current.time.getTime() - compareTo.time.getTime()) > 5 * 60 * 1000
  );
};
