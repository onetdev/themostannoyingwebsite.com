import { NextPage } from 'next';

import TextListItem from '@/features/articles/components/TextListItem';
import SmallCoverListItem from '@/features/articles/components/SmallCoverListItem';
import LargeCoverItem from '@/features/articles/components/LargeCoverItem';
import ArticleService from '@/features/articles/services/ArticleService';
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
    <main className="grid columns-1 gap-3 md:columns-2">
      <LargeCoverItem article={coverArticle} />
      <ul className="gap-3">
        {denseList.map((article, index) => (
          <li
            key={index}
            className="relative pb-5 after:inset-x-3 after:bottom-3 after:contents after:border after:border-secondary after:opacity-20">
            <TextListItem article={article} />
          </li>
        ))}
      </ul>
      <ul className="inline-flex flex-col gap-3 md:flex-row md:flex-wrap md:pt-3">
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
