import { PageLayout } from '@/components/PageLayout';
import {
  AppArticleService,
  LargeCoverItem,
  SmallCoverListItem,
  TextListItem,
} from '@/modules/content';
import { OneByOneGift } from '@/modules/gift';
export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const coverArticle = await AppArticleService.getFirst({
    params: { isOnCover: true, locale },
    paginate: {
      take: 1,
      skip: 0,
    },
  });
  const articlePool = await AppArticleService.getMany({
    params: { isOnCover: false },
    paginate: { take: 12 },
  });
  const denseArticleList = articlePool.items.slice(0, 2);
  const smallCoverArticleList = articlePool.items.slice(2, 10);

  return (
    <PageLayout
      activeItem="home"
      className="grid grid-cols-1 gap-x-5 gap-y-5 px-5 lg:grid-cols-4 lg:gap-y-0 xl:px-8"
      autoPadding={false}
      role="main">
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
        data-testid="dense-article-list">
        <ul className="flex flex-col gap-3">
          {denseArticleList.map((item, index) => (
            <li
              key={index}
              className="after:border-b-border-surface relative pb-2 after:absolute after:bottom-0 after:w-full after:border-b last:pb-0 last:after:border-0">
              <TextListItem article={item} data-testid="dense-article-item" />
            </li>
          ))}
        </ul>
        <OneByOneGift />
      </section>
      <div className="border-border-surface col-span-1 border-t-5 border-b-5 border-double p-5 text-center text-xl font-light italic lg:col-span-4 lg:my-6">
        There's more from the past, scroll!
      </div>
      <section
        role="region"
        className="col-span-1 lg:col-span-4"
        data-testid="small-cover-article-list">
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
    </PageLayout>
  );
}
