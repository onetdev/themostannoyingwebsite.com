import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleItemPage } from './article-item-page';

import { PageLayout } from '@/components/PageLayout';
import { AppArticleService } from '@/features/content/services/AppArticleService';
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
  const data = await AppArticleService.getByLookup(lookup);

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout activeItem="article-item" role="main">
      <ArticleItemPage data={data} />
    </PageLayout>
  );
}
