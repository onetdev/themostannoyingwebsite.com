import { Avatar, AvatarFallback, Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import TimeAgo from 'react-timeago';

import { Comment } from '../domain/entities/comment';

interface CommentItemProps {
  comment: Comment;
  onReply: (comment: Comment) => void;
  onLike: (comment: Comment) => void;
}

export function CommentItem({ comment, onReply, onLike }: CommentItemProps) {
  const t = useTranslations();

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {comment.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comment.name}</span>
            <span className="text-muted-foreground text-xs">
              <TimeAgo date={comment.time} />
            </span>
          </div>

          <p className="mt-1 text-sm">{comment.content}</p>

          <div className="mt-2 flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onLike(comment)}>
              👍 {comment.likes}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onReply(comment)}>
              {t('comments.reply')}
            </Button>
          </div>
        </div>
      </div>

      {comment.replies && (
        <div className="border-border ml-11 space-y-3 border-l pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
