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
  const { t, i18n } = useTranslation('common');
  const showLocker = useExperienceFlagsStore((state) => state.contentPaywall);
  const lookup = { slug, locale: i18n.language };
  const meta = ArticleService.getMeta(lookup);
  const content = ArticleService.getContent(lookup);

  if (!meta || !content) {
    return <Error statusCode={404} />;
  }

  const pageTitle = `${meta.title} - ${t('meta.title')}`;

  return (
    <main>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:type" content="article" />
        <meta name="og:description" content={meta.intro || meta.title} />
        {meta.coverImage && (
          <meta property="og:image" content={meta.coverImage} />
        )}
      </Head>
      <h1>{meta.title}</h1>
      <span className="mb-5 block">
        Published on {meta.date.toDateString()}
      </span>
      <PartitionalLockedContent initialMaxHeight={200} active={showLocker}>
        <div className={styles['content']}>{content}</div>
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
      ...(await getI18nProps(context, ['common', 'contentLimiter'])),
    },
  };
};

export default ArticleItem;
