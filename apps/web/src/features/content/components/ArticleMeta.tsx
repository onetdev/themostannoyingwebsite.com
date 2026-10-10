import type { Article, ArticleListItem } from '@maw/content-sdk';
import { cn } from '@maw/ui-lib/utils';
import { useFormatter, useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';

export type ArticleMetaProps = ComponentProps<'div'> & {
  article: Article | ArticleListItem;
  showAuthor?: boolean;
  showDate?: boolean;
  showReadingTime?: boolean;
};

function MetaSeparator() {
  return (
    <span aria-hidden="true" className="opacity-60">
      ·
    </span>
  );
}

export function ArticleMeta({
  article,
  showAuthor = true,
  showDate = true,
  showReadingTime = true,
  className,
  ...rest
}: ArticleMetaProps) {
  const t = useTranslations();
  const formatter = useFormatter();

  const byline = t.rich('content.author.byline', {
    name: article.author.name,
    linkTag: (chunks) => chunks,
  });

  const publishedAt = formatter.dateTime(new Date(article.published_at), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const showReadingOrDate = showReadingTime || showDate;

  return (
    <div
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs',
        className,
      )}
      data-testid="article-meta"
      {...rest}
    >
      {showAuthor && <span>{byline}</span>}
      {showAuthor && showReadingOrDate && <MetaSeparator />}
      {showReadingTime && (
        <span>
          {t('content.article.readingTime', {
            minutes: article.reading_time_minutes,
          })}
        </span>
      )}
      {showReadingTime && showDate && <MetaSeparator />}
      {showDate && <time dateTime={article.published_at}>{publishedAt}</time>}
    </div>
  );
}
