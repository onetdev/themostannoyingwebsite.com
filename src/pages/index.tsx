import { NextPage } from 'next';

import {
  SmallCoverListItem,
  LargeCoverItem,
  ArticleService,
  DenseTextList,
} from '@/features/articles';
import { makeI18nStaticProps } from '@/utils/i18n';

const Index: NextPage = () => {
  const coverArticle = ArticleService.getAllFiltered({ isOnCover: true })[0];
  const articlePool = ArticleService.getAllFiltered({ isOnCover: false }).slice(
    0,
    12,
  );
  const denseList = articlePool.slice(0, 3);
  const regularList = articlePool.slice(3);

  return (
    <main className="grid grid-cols-1 gap-3 lg:grid-cols-4">
      <LargeCoverItem
        className="col-span-1 lg:col-span-3"
        article={coverArticle}
      />
      <DenseTextList className="col-span-1" items={denseList} />
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

export const getStaticProps = makeI18nStaticProps(['common']);
export default Index;
