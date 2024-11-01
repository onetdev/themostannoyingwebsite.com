import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import {
  ArticleService,
  DenseTextList,
  LargeCoverItem,
  SmallCoverListItem,
} from '@/features/articles';
import { OneByOneGift } from '@/features/gifts';
import { makeI18nStaticProps } from '@/utils/i18n';

const Index: NextPage = () => {
  const { i18n } = useTranslation();
  const coverArticle = ArticleService.getFirst({
    params: { isOnCover: true, locale: i18n.language },
    paginate: {
      take: 1,
      skip: 0,
    },
  });
  const articlePool = ArticleService.getMany({
    params: { isOnCover: false },
    paginate: { take: 12 },
  });
  const denseList = articlePool.items.slice(0, 2);
  const regularList = articlePool.items.slice(2);

  return (
    <main className="grid grid-cols-1 gap-3 lg:grid-cols-4">
      {coverArticle && (
        <LargeCoverItem
          className="col-span-1 lg:col-span-3"
          article={coverArticle}
        />
      )}
      <div className="col-span-1 flex flex-col justify-between">
        <DenseTextList items={denseList} />
        <OneByOneGift />
      </div>
      <ul className="col-span-1 grid gap-3 md:grid-cols-2 lg:col-span-4 lg:mt-3 lg:grid-cols-3 xl:grid-cols-4">
        {regularList.map((article, index) => (
          <li key={index} className="basis-full md:basis-1/2">
            <SmallCoverListItem article={article} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Index;
