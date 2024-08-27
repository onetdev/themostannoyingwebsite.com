import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import LockedContent from '@/components/templates/LockedContent';
import { ArticleService } from '@/features/articles';
import { getI18nProps } from '@/utils/i18n';
import styles from '@/styles/content.module.css';
import { useExperienceStore } from '@/state/experience';

type Props = {
  slug: string;
};

const ArticleItem: NextPage<Props> = ({ slug }: Props) => {
  const { t } = useTranslation('common');
  const showLocker = useExperienceStore((state) => state.contentPaywall);
  const article = ArticleService.getBySlug(slug);

  if (!article) {
    return <Error statusCode={404} />;
  }

  return (
    <main>
      <Head>
        <title>
          {article.title} - {t('meta.title')}
        </title>
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
      <LockedContent initialMaxHeight={200} active={showLocker}>
        <div className={styles['content']}>{article.body}</div>
      </LockedContent>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
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
