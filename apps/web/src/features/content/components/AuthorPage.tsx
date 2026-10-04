import type { ArticleListItem, Author } from '@maw/content-sdk';
import { getTranslations } from 'next-intl/server';
import { SmallCoverListItem } from './SmallCoverListItem';

export interface AuthorPageProps {
  author: Author;
  articles: ArticleListItem[];
}

export async function AuthorPage({ author, articles }: AuthorPageProps) {
  const t = await getTranslations('content');

  return (
    <>
      <h1 className="mb-2 max-w-[900px]">{author.name}</h1>
      <p
        className="text-muted-foreground mb-5 text-xl italic"
        data-testid="author-persona"
      >
        {author.persona}
      </p>
      <p
        className="mb-10 max-w-[900px] leading-relaxed"
        data-testid="author-about"
      >
        {author.about}
      </p>
      {articles.length > 0 && (
        <section data-testid="author-article-list">
          <h2 className="mb-5">
            {t('author.articlesTitle', { name: author.name })}
          </h2>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => (
              <li key={article.id} className="basis-full md:basis-1/2">
                <SmallCoverListItem
                  article={article}
                  data-testid="author-article-item"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
