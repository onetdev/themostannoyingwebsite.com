import {
  Bubble,
  BubbleContent,
  Message,
  MessageContent,
  MessageFooter,
} from '@maw/ui-lib';
import ReactTimeAgo from 'react-timeago';
import { useTimeagoFormatter } from '@/hooks';
import type { ChatMessage } from '../../schemas';

type MessageBubbleProps = {
  item: ChatMessage;
  showTime?: boolean;
};

export function MessageBubble({ item, showTime = true }: MessageBubbleProps) {
  const intlFormatter = useTimeagoFormatter();
  const isUser = item.owner === 'user';

  return (
    <Message align={isUser ? 'end' : 'start'}>
      <MessageContent>
        <Bubble
          variant={isUser ? 'secondary' : 'default'}
          align={isUser ? 'end' : 'start'}
        >
          <BubbleContent>{item.text}</BubbleContent>
        </Bubble>
        {showTime && (
          <MessageFooter>
            <ReactTimeAgo date={item.time} formatter={intlFormatter} />
          </MessageFooter>
        )}
      </MessageContent>
    </Message>
  );
}
