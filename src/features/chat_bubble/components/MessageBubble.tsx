import { FunctionComponent } from 'react';
import ReactTimeAgo from 'react-timeago';

import { HistoryItem } from '@/features/chat_bubble/types';

type Props = {
  item: HistoryItem;
  showTime?: boolean;
};

const MessageBubble: FunctionComponent<Props> = ({ item, showTime = true }) => {
  return (
    <div className="group" data-user={item.isUser.toString()}>
      <div className="rounded-lg bg-secondary p-3 text-on-secondary group-data-[user=false]:mr-6 group-data-[user=true]:ml-6 group-data-[user=false]:bg-primary group-data-[user=false]:text-on-primary">
        {item.text}
      </div>
      {showTime && (
        <small className="block pt-1 text-sm text-on-background opacity-50 group-data-[user=true]:text-right">
          <ReactTimeAgo date={item.time} />
        </small>
      )}
    </div>
  );
};

export default MessageBubble;
