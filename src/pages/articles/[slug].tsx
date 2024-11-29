import HTMLReactParser from 'html-react-parser';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { ArticleService, PartitionalLockedContent } from '@/features/content';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { getI18nProps } from '@/lib/utils/i18n';
import styles from '@/styles/content.module.css';

type ArticleItemProps = {
  slug: string;
};

const ArticleItem: NextPage<ArticleItemProps> = (props: ArticleItemProps) => {
  const { t, i18n } = useTranslation('common');
  const enabled = useExperienceFlagsStore((state) => state.contentPaywall);
  const lookup = { slug: props.slug, locale: i18n.language };
  const data = ArticleService.getByLookup(lookup);

  if (!data) {
    return <Error statusCode={404} />;
  }

  const pageTitle = `${data.title} - ${t('app.title')}`;

  return (
    <main>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:type" content="article" />
        <meta name="og:description" content={data.intro || data.title} />
        {data.coverImages?.original && (
          <meta property="og:image" content={data.coverImages.original} />
        )}
      </Head>
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
      <PartitionalLockedContent initialMaxHeight={300} active={enabled}>
        <div className={styles['content']}>{HTMLReactParser(data.content)}</div>
      </PartitionalLockedContent>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: { params: ArticleItemProps; locale: string }[] = [];

  for (const locale of locales || []) {
    ArticleService.getMany({
      params: { locale },
      paginate: { take: -1 },
    }).items.forEach((article) => {
      paths.push({
        params: { slug: article.slug },
        locale,
      });
    });
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await getI18nProps(context)),
      slug: context.params?.slug,
    },
  };
};
export default ArticleItem;
