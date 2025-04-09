'use client';

import HTMLReactParser from 'html-react-parser';
import Image from 'next/image';

import { ArticleDatum, PartitionalLockedContent } from '@/features/content';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import styles from '@/styles/content.module.css';
import { useTranslations } from 'next-intl';

export function ArticleItemPage({ data }: { data: ArticleDatum }) {
  const t = useTranslations();
  const partitionEnabled = useExperienceFlagsStore((state) => state.contentPaywall);

  return (
    <main role="main">
      <h1 className="mb-2 max-w-[900px]">{data.title}</h1>
      <span className="mb-5 block italic">
        {t('article.published', { date: data.publishedAt.toDateString() })}
      </span>
      {data.coverImages?.original && (
        <div className="-mx-5">
          <Image
            className=" h-auto w-full object-cover"
            src={data.coverImages?.original}
            alt={t('article.coverImage')}
            width="1920"
            height="1200"
          />
        </div>
      )}
      <PartitionalLockedContent initialMaxHeight={300} active={partitionEnabled}>
        <div className={styles['content']}>{HTMLReactParser(data.content)}</div>
      </PartitionalLockedContent>
    </main>
  );
};
