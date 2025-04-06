import { Metadata } from 'next';

import { ArticleService } from '@/root/apps/web/src/features/content';
import { getTranslations } from 'next-intl/server';
import { ArticleItemPage } from './article-item-page';
import i18nConfig from '@/root/apps/web/i18n.config';
import { notFound } from 'next/navigation';

type PageParams = {
  slug: string;
  locale: string;
};

type PageProps = NextPageProps<PageParams>

export const revalidate = 1800;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const lookup = { slug, locale };
  const data = ArticleService.getByLookup(lookup);

  return {
    title: data?.title,
    openGraph: {
      title: data?.title,
      description: data?.intro,
      images: data?.coverImages?.original,
    }
  };
}

export const generateStaticParams = async () => {
  const locales = i18nConfig.locales;
  const paths: PageParams[] = [];

  for (const locale of locales) {
    const articles = ArticleService.getMany({
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
  const data = ArticleService.getByLookup(lookup);

  if (!data) {
    return notFound();
  }

  return (
    <ArticleItemPage data={data} />
  );
};
