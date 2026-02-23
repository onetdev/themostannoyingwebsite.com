import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageLayout } from '@/app/_components/PageLayout';
import { CommentService } from '@/features/comments';
import { AppArticleService } from '@/features/content';
import { ArticleItemPage } from '@/features/content/pages/ArticleItemPage';
import i18nConfig from '@/root/i18n.config';

type PageParams = {
  slug: string;
  locale: string;
};

type PageProps = NextPageProps<PageParams>;

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const lookup = { slug, locale };
  const data = await AppArticleService.getByLookup(lookup);

  return {
    title: data?.title,
    openGraph: {
      title: data?.title,
      description: data?.intro,
      images: data?.coverImages?.original,
    },
  };
}

export const generateStaticParams = async () => {
  const locales = i18nConfig.locales;
  const paths: PageParams[] = [];

  for (const locale of locales) {
    const articles = await AppArticleService.getMany({
      params: { locale },
      paginate: { take: -1 },
    });

    articles.items.forEach((article) => {
      paths.push({ slug: article.slug, locale });
    });
  }

  return paths;
};

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  const lookup = { slug, locale };
  const datum = await AppArticleService.getByLookup(lookup);

  if (!datum) {
    return notFound();
  }

  const comments = await new CommentService().getByArticle(datum);

  return (
    <PageLayout
      activeItem="article-item"
      role="main"
      data-testid="article-item">
      <ArticleItemPage article={datum} comments={comments} />
    </PageLayout>
  );
}
