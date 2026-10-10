import {
  Avatar,
  AvatarFallback,
  Bubble,
  BubbleContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import ReactTimeAgo from 'react-timeago';
import { useTimeagoFormatter } from '@/hooks';
import type { ChatMessage } from '../../schemas';

type MessageBubbleProps = {
  item: ChatMessage;
  showTime?: boolean;
};

export function MessageBubble({ item, showTime = true }: MessageBubbleProps) {
  const intlFormatter = useTimeagoFormatter();
  const t = useTranslations('support.chatBubble');
  const isUser = item.owner === 'user';

  return (
    <Message align={isUser ? 'end' : 'start'}>
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>{isUser ? '🙂' : '🤖'}</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble
          variant={isUser ? 'default' : 'muted'}
          align={isUser ? 'end' : 'start'}
        >
          <BubbleContent>{item.text}</BubbleContent>
        </Bubble>
        {showTime && (
          <MessageFooter>
            {isUser ? (
              t('delivered')
            ) : (
              <ReactTimeAgo date={item.time} formatter={intlFormatter} />
            )}
          </MessageFooter>
        )}
      </MessageContent>
    </Message>
  );
}
