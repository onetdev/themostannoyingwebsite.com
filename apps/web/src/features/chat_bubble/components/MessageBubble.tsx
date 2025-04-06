import { FunctionComponent } from 'react';
import ReactTimeAgo from 'react-timeago';

import { HistoryItem } from '@/root/apps/web/src/features/chat_bubble/types';

type MessageBubbleProps = {
  item: HistoryItem;
  showTime?: boolean;
};

const MessageBubble: FunctionComponent<MessageBubbleProps> = ({
  item,
  showTime = true,
}) => {
  return (
    <div className="group" data-owner={item.owner}>
      <div className="rounded-lg bg-secondary p-2 text-sm text-on-secondary group-data-[owner=bot]:mr-6 group-data-[owner=user]:ml-6 group-data-[owner=bot]:bg-primary group-data-[owner=bot]:text-on-primary md:p-3 md:text-base">
        {item.text}
      </div>
      {showTime && (
        <small className="block pt-1 text-xs text-on-background opacity-50 group-data-[owner=user]:text-right md:text-sm">
          <ReactTimeAgo date={item.time} />
        </small>
      )}
    </div>
  );
};

export default MessageBubble;
