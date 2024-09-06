import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { ArticleService } from '@/features/articles';
import { PartitionalLockedContent } from '@/features/content_limiter';
import { useExperienceFlagsStore } from '@/state/experience_flags';
import styles from '@/styles/content.module.css';
import { getI18nProps } from '@/utils/i18n';

type ArticleItemProps = {
  slug: string;
};

const ArticleItem: NextPage<ArticleItemProps> = ({
  slug,
}: ArticleItemProps) => {
  const { t } = useTranslation('common');
  const showLocker = useExperienceFlagsStore((state) => state.contentPaywall);
  const article = ArticleService.getBySlug(slug);

  if (!article) {
    return <Error statusCode={404} />;
  }

  const pageTitle = `${article.title} - ${t('meta.title')}`;

  return (
    <main>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:type" content="article" />
        <meta name="og:description" content={article.intro || article.title} />
        {article.coverImage && (
          <meta property="og:image" content={article.coverImage} />
        )}
      </Head>
      <h1>{article.title}</h1>
      <span className="mb-5 block">
        Published on {article.date.toDateString()}
      </span>
      <PartitionalLockedContent initialMaxHeight={200} active={showLocker}>
        <div className={styles['content']}>{article.body}</div>
      </PartitionalLockedContent>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<ArticleItemProps> = async (
  context,
) => {
  const slug = context.query.slug as string;
  return {
    props: {
      slug,
      ...(await getI18nProps(context, ['common'])),
    },
  };
};

export default ArticleItem;
