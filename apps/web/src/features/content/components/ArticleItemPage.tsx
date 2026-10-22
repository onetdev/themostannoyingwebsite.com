'use client';

import { type Article, toCoverImages } from '@maw/content-sdk';
import { PageHeadline, Separator } from '@maw/ui-lib';
import styles from '@maw/ui-lib/content.module.css';
import HTMLReactParser from 'html-react-parser';
import Image from 'next/image';
import { useFormatter, useTranslations } from 'next-intl';
import { Link } from '@/core/i18n/navigation';
import { CommentSection } from '@/features/comments/components';
import type { Comment } from '@/features/comments/schemas/comment';
import { ShareButton } from '@/features/share/components';
import { usePainPreferencesStore } from '@/stores';
import { ArticleCategoryKeywords } from './ArticleCategoryKeywords';
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
      {coverImages?.original && (
        <div
          className="-mx-5 mb-6 xl:-mx-8"
          data-track-impression="article:cover"
          data-track-key={article.slug}
          data-track-section="content:article"
        >
          <Image
            className="h-auto w-full object-cover"
            src={coverImages.original}
            alt={article.title}
            width="1920"
            height="1200"
            loading="eager"
          />
        </div>
      )}
      <div
        className="mx-auto w-full max-w-measure"
        data-track-section="content:article"
      >
        <PageHeadline className="mb-2" actions={<ShareButton />}>
          {article.title}
        </PageHeadline>
        <span className="mb-3 block italic">
          {t.rich('content.author.byline', {
            name: article.author.name,
            linkTag: (chunks) => (
              <Link
                href={`/authors/${article.author.slug}`}
                passHref
                prefetch={false}
                className="text-primary hover:underline"
              >
                {chunks}
              </Link>
            ),
          })}
          {' · '}
          {t('content.article.published', { date: formatterPublishedAt })}
        </span>
        <ArticleCategoryKeywords article={article} className="mb-5" />
      </div>
      <PartitionalLockedContent
        initialMaxHeight={300}
        active={partitionEnabled}
      >
        <div
          className={styles.content}
          data-testid="article-item-content"
          data-track-impression="article:body"
          data-track-key={article.slug}
          data-track-section="content:article"
        >
          {HTMLReactParser(renderedContent)}
        </div>
      </PartitionalLockedContent>
      <div className="mx-auto mt-10 w-full max-w-3xl">
        <Separator className="md:hidden" />
      </div>
      <CommentSection items={comments} />
    </>
  );
}
