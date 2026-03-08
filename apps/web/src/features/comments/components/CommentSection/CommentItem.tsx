'use client';

import { Avatar, AvatarFallback, Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ReactTimeAgo from 'react-timeago';
import { useTimeagoFormatter } from '@/hooks';
import type { Comment } from '../../schemas';

export interface CommentItemProps {
  comment: Comment;
  onReply: (comment: Comment) => void;
  onLike: (comment: Comment) => void;
}

export function CommentItem({ comment, onReply, onLike }: CommentItemProps) {
  const t = useTranslations();
  const intlFormatter = useTimeagoFormatter();
  const [showReplies, setShowReplies] = useState(false);

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarFallback className="text-sm">
              {comment.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{comment.name}</span>
          <span className="text-muted-foreground text-sm">
            <ReactTimeAgo date={comment.time} formatter={intlFormatter} />
          </span>
        </div>

        <div className="pt-2 px-1">
          <p className="text-sm">{comment.content}</p>

          <div className="mt-1 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => onLike(comment)}
            >
              👍 {comment.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => onReply(comment)}
            >
              {t('comments.reply')}
            </Button>
            {hasReplies && (
              <Button
                variant="ghost"
                size="sm"
                className="text-primary h-8 px-2 text-xs font-medium"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies
                  ? t('comments.hideReplies')
                  : t('comments.showReplies', {
                      count: comment.replies?.length ?? 0,
                    })}
              </Button>
            )}
          </div>
        </div>
      </div>

      {hasReplies && showReplies && (
        <div className="border-border ml-4 space-y-3 border-l pl-4 sm:ml-4">
          {comment.replies?.map((reply) => (
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
