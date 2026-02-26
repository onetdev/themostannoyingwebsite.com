'use client';
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@maw/ui-lib';
import { clsx } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { Comment } from '../../schemas';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import { LoginRequiredModal } from './LoginRequiredModal';

export interface CommentSectionProps {
  className?: string;
  items: Comment[];
}

export function CommentSection({ className, items }: CommentSectionProps) {
  const t = useTranslations();
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const onReply = () => {
    setLoginModalVisible(true);
  };
  const onLike = () => {
    setLoginModalVisible(true);
  };

  return (
    <Card
      className={clsx(
        'md:bg-card mx-auto w-full max-w-3xl rounded-none border-0 bg-transparent shadow-none md:rounded-xl md:border md:shadow-sm',
        className,
      )}
    >
      <CardHeader className="px-0 sm:px-6">
        <CardTitle>{t('comments.sectionTitle')}</CardTitle>
        <CardAction>
          <Button asChild>
            <a href="#create-comment">{t('common.reply')}</a>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-6 px-0 sm:px-6">
        <div className="text-muted-foreground text-xs">
          {t('comments.disclaimer')}
        </div>
        {items.map((comment, i) => (
          <div key={comment.id}>
            <CommentItem comment={comment} onLike={onLike} onReply={onReply} />
            {i !== items.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
        <Separator />
        <h5 className="font-semibold">{t('comments.formTitle')}</h5>
        <CommentForm />
      </CardContent>

      <LoginRequiredModal
        show={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
    </Card>
  );
}
