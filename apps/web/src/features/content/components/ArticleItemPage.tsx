'use client';

import { toCoverImages } from '@maw/content-sdk';
import styles from '@maw/ui-lib/content.module.css';
import HTMLReactParser from 'html-react-parser';
import Image from 'next/image';
import { useFormatter, useTranslations } from 'next-intl';
import { CommentSection } from '@/features/comments/components';
import type { Comment } from '@/features/comments/schemas/comment';
import { usePainPreferencesStore } from '@/stores';
import type { Article } from '../schemas';
import { PartitionalLockedContent } from './PartitionalLockedContent';

export interface ArticleItemPageProps {
  article: Article;
  comments: Comment[];
  renderedContent: string;
}

export function ArticleItemPage({
  article,
  comments,
  renderedContent,
}: ArticleItemPageProps) {
  const t = useTranslations();
  const formatter = useFormatter();
  const formatterPublishedAt = formatter.dateTime(
    new Date(article.published_at),
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    },
  );
  const partitionEnabled = usePainPreferencesStore(
    (state) => state.flags.contentPaywall,
  );
  const coverImages = toCoverImages(article.featured_image);

  return (
    <>
      <h1 className="mb-2 max-w-[900px]">{article.title}</h1>
      <span className="mb-5 block italic">
        {t('content.article.published', { date: formatterPublishedAt })}
      </span>
      {coverImages?.original && (
        <div className="-mx-5 xl:-mx-8">
          <Image
            className="h-auto w-full object-cover"
            src={coverImages.original}
            alt={t('content.article.coverImage')}
            width="1920"
            height="1200"
          />
        </div>
      )}
      <PartitionalLockedContent
        initialMaxHeight={300}
        active={partitionEnabled}
      >
        <div className={styles.content} data-testid="article-item-content">
          {HTMLReactParser(renderedContent)}
        </div>
      </PartitionalLockedContent>
      <CommentSection className="mt-10 border-t" items={comments} />
    </>
  );
}
