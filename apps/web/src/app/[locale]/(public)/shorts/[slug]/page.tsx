import type { LanguageCode } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import config from '@/core/config';
import { getDependencyContainer } from '@/core/di';
import { assertAppLocale } from '@/core/i18n/app-locale';
import { buildBreadcrumbList, buildShortVideo, JsonLd } from '@/core/seo';
import { ShortsPlayer } from '@/features/content/components';
import { selectShortMedia } from '@/features/content/components/Shorts/short-media';
import { getShortService } from '@/features/content/services';
import { ReportRouteVisit } from '@/features/monitoring/components';
import { buildShortMetadata } from './_lib/build-short-metadata';
import { ensureShortInFeed } from './_lib/ensure-short-in-feed';

type PageParams = {
  slug: string;
  locale: string;
};

type PageProps = NextPageProps<PageParams>;

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const appLocale = assertAppLocale(locale);
  const container = getDependencyContainer();
  const shortService = getShortService(container);
  const short = await shortService.getBySlug(slug, appLocale);

  if (!short) {
    return {};
  }

  return buildShortMetadata({ short, locale: appLocale });
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  const appLocale = assertAppLocale(locale);

  const container = getDependencyContainer();
  const shortService = getShortService(container);
  const short = await shortService.getBySlug(slug, appLocale);

  if (!short) {
    return notFound();
  }

  const feed = await shortService.listAll({ lang: appLocale as LanguageCode });
  const shorts = ensureShortInFeed(feed, short);
  const initialIndex = Math.max(
    shorts.findIndex((item) => item.id === short.id),
    0,
  );
  const media = selectShortMedia(short);
  const posterUrl = media.poster?.url;

  const navigation = await getTranslations({
    locale: appLocale,
    namespace: 'common.navigation',
  });
  const shortPath = `shorts/${short.slug}`;

  const videoSchema = posterUrl
    ? buildShortVideo({
        baseUrl: config.deploymentMeta.publicUrl,
        locale: appLocale,
        path: shortPath,
        name: short.title,
        description: short.summary,
        thumbnailUrl: posterUrl,
        uploadDate: short.published_at,
        durationMs: short.duration_ms,
        contentUrl: media.video?.url,
        authorName: short.author.name,
        authorPath: `authors/${short.author.slug}`,
      })
    : null;

  const breadcrumbSchema = buildBreadcrumbList(
    config.deploymentMeta.publicUrl,
    appLocale,
    [
      { name: navigation('home'), path: '' },
      { name: short.title, path: shortPath },
    ],
  );

  const structuredData = videoSchema
    ? [videoSchema, breadcrumbSchema]
    : [breadcrumbSchema];

  return (
    <>
      <ReportRouteVisit route="short.single" />
      <JsonLd data={structuredData} />
      <main
        className="fixed inset-0 z-50 bg-black"
        data-route-alias="short.single"
        data-track-section="content:shorts:player"
        data-testid="short-player-page"
      >
        <ShortsPlayer shorts={shorts} initialIndex={initialIndex} />
      </main>
    </>
  );
}
