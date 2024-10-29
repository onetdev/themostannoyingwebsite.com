import HTMLReactParser from 'html-react-parser';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { ArticleService } from '@/features/articles';
import { PartitionalLockedContent } from '@/features/content_limiter';
import { useExperienceFlagsStore } from '@/state/experience_flags';
import styles from '@/styles/content.module.css';
import { getI18nProps } from '@/utils/i18n';

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

  const pageTitle = `${data.title} - ${t('meta.title')}`;

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
        Published at {data.publishedAt.toDateString()}
      </span>
      {data.coverImages?.original && (
        <Image
          className="h-auto w-full object-cover"
          src={data.coverImages?.original}
          alt="Cover image"
          width="1920"
          height="1200"
        />
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
