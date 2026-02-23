import ReactTimeAgo from 'react-timeago';

import { HistoryItem } from '../../domain/entities/history-item.schema';

type MessageBubbleProps = {
  item: HistoryItem;
  showTime?: boolean;
};

export function MessageBubble({ item, showTime = true }: MessageBubbleProps) {
  return (
    <div className="group" data-owner={item.owner}>
      <div className="bg-secondary text-secondary-foreground group-data-[owner=bot]:bg-primary group-data-[owner=bot]:text-primary-foreground rounded-lg p-2 text-sm group-data-[owner=bot]:mr-6 group-data-[owner=user]:ml-6 md:p-3 md:text-base">
        {item.text}
      </div>
      {showTime && (
        <small className="text-foreground block pt-1 text-xs opacity-50 group-data-[owner=user]:text-right md:text-sm">
          <ReactTimeAgo date={item.time} />
        </small>
      )}
    </div>
  );
}
