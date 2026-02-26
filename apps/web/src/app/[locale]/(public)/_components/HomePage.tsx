import { getTranslations } from 'next-intl/server';

import {
  LargeCoverItem,
  SmallCoverListItem,
  TextListItem,
} from '@/features/content/components';
import type { ArticleDatum } from '@/features/content/types';
import { OneByOnePromotion } from '@/features/promotion/components';

type HomePageProps = {
  coverArticle?: ArticleDatum;
  denseArticleList: ArticleDatum[];
  smallCoverArticleList: ArticleDatum[];
};

export async function HomePage({
  coverArticle,
  denseArticleList,
  smallCoverArticleList,
}: HomePageProps) {
  const t = await getTranslations();

  return (
    <>
      {coverArticle && (
        <LargeCoverItem
          className="col-span-1 lg:col-span-3"
          article={coverArticle}
          data-testid="cover-article"
        />
      )}
      <section
        role="region"
        className="col-span-1 flex flex-col justify-between"
        data-testid="dense-article-list"
      >
        <ul className="flex flex-col gap-3">
          {denseArticleList.map((item, index) => (
            <li
              key={index}
              className="after:border-b-border relative pb-2 after:absolute after:bottom-0 after:w-full after:border-b last:pb-0 last:after:border-0"
            >
              <TextListItem article={item} data-testid="dense-article-item" />
            </li>
          ))}
        </ul>
        <OneByOnePromotion />
      </section>
      <div className="border-border col-span-1 border-t-5 border-b-5 border-double p-5 text-center text-xl font-light italic lg:col-span-4 lg:my-6">
        {t('article.moreContentScroll')}
      </div>
      <section
        role="region"
        className="col-span-1 lg:col-span-4"
        data-testid="small-cover-article-list"
      >
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {smallCoverArticleList.map((article, index) => (
            <li key={index} className="basis-full md:basis-1/2">
              <SmallCoverListItem
                article={article}
                data-testid="small-cover-article-item"
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
