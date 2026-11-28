'use client';

import { Button, Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { Comment } from '../../schemas';
import { countComments } from '../../utils';
import { CommentItem } from '../CommentSection/CommentItem';
import { LoginRequiredModal } from '../CommentSection/LoginRequiredModal';
import { ShortsCommentComposer } from './ShortsCommentComposer';

export interface ShortsCommentsPanelProps {
  comments: Comment[];
  onClose: () => void;
  className?: string;
}

/**
 * Comment surface shared by the desktop side panel and the mobile sheet.
 *
 * The thread is intentionally limited to one reply level; deeper nesting would
 * not fit the compact player surface.
 */
export function ShortsCommentsPanel({
  comments,
  onClose,
  className,
}: ShortsCommentsPanelProps) {
  const t = useTranslations();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const commentCount = countComments(comments);
  const hasComments = comments.length > 0;
  const openLoginModal = () => setLoginModalVisible(true);

  return (
    <div
      className={cn(
        'bg-background text-foreground flex h-full min-h-0 flex-col',
        className,
      )}
      data-comments-panel
      data-testid="shorts-comments-panel"
      data-track-section="content:shorts:comments"
    >
      <header className="border-border flex items-start justify-between gap-3 border-b px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <h2 className="text-base font-semibold">
              {t('comments.sectionTitle')}
            </h2>
            <span
              className="text-muted-foreground text-xs"
              data-testid="shorts-comments-count"
            >
              {t('comments.count', { count: commentCount })}
            </span>
          </div>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
            {t('comments.disclaimer')}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0"
          onClick={onClose}
          aria-label={t('comments.close')}
          title={t('comments.close')}
          data-track="shorts:comments:close"
        >
          <Icon icon="close" />
        </Button>
      </header>

      <div
        className="min-h-0 flex-1 touch-auto overflow-y-auto overscroll-contain px-4 py-3"
        data-testid="shorts-comments-body"
      >
        {hasComments && (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onLike={openLoginModal}
                onReply={openLoginModal}
                defaultShowReplies
              />
            ))}
          </div>
        )}
        {!hasComments && (
          <p className="text-muted-foreground flex h-full items-center justify-center px-6 text-center text-sm">
            {t('comments.empty')}
          </p>
        )}
      </div>

      <div className="border-border touch-auto border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <ShortsCommentComposer onSubmit={openLoginModal} />
      </div>

      <LoginRequiredModal
        show={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
    </div>
  );
}
