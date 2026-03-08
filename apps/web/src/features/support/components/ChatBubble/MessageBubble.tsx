import ReactTimeAgo from 'react-timeago';
import { useTimeagoFormatter } from '@/hooks';
import type { ChatMessage } from '../../schemas';

type MessageBubbleProps = {
  item: ChatMessage;
  showTime?: boolean;
};

export function MessageBubble({ item, showTime = true }: MessageBubbleProps) {
  const intlFormatter = useTimeagoFormatter();

  return (
    <div className="group" data-owner={item.owner}>
      <div className="bg-secondary text-secondary-foreground group-data-[owner=bot]:bg-primary group-data-[owner=bot]:text-primary-foreground rounded-lg p-2 text-sm group-data-[owner=bot]:me-6 group-data-[owner=user]:ms-6 md:p-3 md:text-base">
        {item.text}
      </div>
      {showTime && (
        <small className="text-foreground block pt-1 text-xs opacity-50 group-data-[owner=user]:text-end md:text-sm">
          <ReactTimeAgo date={item.time} formatter={intlFormatter} />
        </small>
      )}
    </div>
  );
}
