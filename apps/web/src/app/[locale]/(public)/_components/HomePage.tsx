import type { Article, ArticleListItem } from '@maw/content-sdk';
import { buttonVariants, Icon } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/core/i18n/navigation';
import {
  LargeCoverItem,
  SmallCoverListItem,
  TextListItem,
} from '@/features/content/components';
import { WanAPhoneCampaignAd } from '@/features/marketing/components';

type HomePageProps = {
  coverArticle?: Article | ArticleListItem;
  denseArticleList: (Article | ArticleListItem)[];
  smallCoverArticleList: (Article | ArticleListItem)[];
};

export async function HomePage({
  coverArticle,
  denseArticleList,
  smallCoverArticleList,
}: HomePageProps) {
  const t = await getTranslations();

  return (
    <>
      <h1 className="sr-only">{t('common.app.title')}</h1>
      {coverArticle && (
        <LargeCoverItem
          className="col-span-1 lg:col-span-3"
          article={coverArticle}
          data-testid="cover-article"
          data-track-section="content:home:cover"
        />
      )}
      <section
        className="col-span-1 flex flex-col justify-between gap-4"
        data-testid="dense-article-list"
        data-track-section="content:home:latest"
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
        <WanAPhoneCampaignAd />
      </section>
      <div className="border-border col-span-1 border-t-5 border-b-5 border-double p-5 text-center text-xl font-light italic lg:col-span-4 lg:my-6">
        {t('content.article.moreContentScroll')}
      </div>
      <section
        className="col-span-1 lg:col-span-4"
        data-testid="small-cover-article-list"
        data-track-section="content:home:more"
      >
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {smallCoverArticleList.map((article, index) => (
            <li key={index} className="basis-full md:basis-1/2">
              <SmallCoverListItem
                article={article}
                headingLevel={2}
                data-testid="small-cover-article-item"
              />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Link
            href="/articles"
            prefetch={false}
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            data-testid="articles-archive-link"
            data-track="content:home:more:view-all"
          >
            {t('content.article.viewAllArticles')}
            <Icon icon="chevronRight" className="text-xs rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </>
  );
}
