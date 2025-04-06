import {
  ArticleService,
  LargeCoverItem,
  SmallCoverListItem,
  TextListItem,
} from '@/root/apps/web/src/features/content';
import { OneByOneGift } from '@/root/apps/web/src/features/gifts';

export { generateStaticParams } from '@/root/apps/web/src/i18n/routing';
export const revalidate = 1800;

export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const coverArticle = ArticleService.getFirst({
    params: { isOnCover: true, locale },
    paginate: {
      take: 1,
      skip: 0,
    },
  });
  const articlePool = ArticleService.getMany({
    params: { isOnCover: false },
    paginate: { take: 12 },
  });
  const denseArticleList = articlePool.items.slice(0, 2);
  const smallCoverArticleList = articlePool.items.slice(2, 8);

  return (
    <main className="grid grid-cols-1 gap-3 lg:grid-cols-4" role="main">
      {coverArticle && (
        <LargeCoverItem
          className="col-span-1 lg:col-span-3"
          article={coverArticle}
          data-testid="cover-article"
        />
      )}
      <section role="region" className="col-span-1 flex flex-col justify-between" data-testid="dense-article-list">
        <ul className="flex flex-col gap-3">
          {denseArticleList.map((item, index) => (
            <li
              key={index}
              className="relative after:absolute after:w-full after:border-b after:border-b-hr-surface">
              <TextListItem article={item} data-testid="dense-article-item" />
            </li>
          ))}
        </ul>
        <OneByOneGift />
      </section>
      <section role="region" className='col-span-1 lg:col-span-4 lg:mt-3' data-testid="small-cover-article-list">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {smallCoverArticleList.map((article, index) => (
            <li key={index} className="basis-full md:basis-1/2">
              <SmallCoverListItem article={article} data-testid="small-cover-article-item" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
