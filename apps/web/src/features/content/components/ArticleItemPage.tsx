'use client';

import styles from '@maw/ui-lib/content.module.css';
import HTMLReactParser from 'html-react-parser';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { PartitionalLockedContent } from './PartitionalLockedContent';
import { ArticleDatum } from '../schemas';

import { CommentSection } from '@/features/comments/components/CommentSection';
import { Comment } from '@/features/comments/schemas/comment';
import { usePainPreferencesStore } from '@/stores';

export interface ArticleItemPageProps {
  article: ArticleDatum;
  comments: Comment[];
}

export function ArticleItemPage({ article, comments }: ArticleItemPageProps) {
  const t = useTranslations();
  const partitionEnabled = usePainPreferencesStore(
    (state) => state.flags.contentPaywall,
  );

  return (
    <>
      <h1 className="mb-2 max-w-[900px]">{article.title}</h1>
      <span className="mb-5 block italic">
        {t('article.published', { date: article.publishedAt.toDateString() })}
      </span>
      {article.coverImages?.original && (
        <div className="-mx-5 xl:-mx-8">
          <Image
            className="h-auto w-full object-cover"
            src={article.coverImages?.original}
            alt={t('article.coverImage')}
            width="1920"
            height="1200"
          />
        </div>
      )}
      <PartitionalLockedContent
        initialMaxHeight={300}
        active={partitionEnabled}>
        <div className={styles['content']} data-testid="article-item-content">
          {HTMLReactParser(article.content)}
        </div>
      </PartitionalLockedContent>
      <CommentSection className="mt-10 border-t" items={comments} />
    </>
  );
}
