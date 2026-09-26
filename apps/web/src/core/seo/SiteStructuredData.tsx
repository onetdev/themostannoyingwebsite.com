import config from '@/core/config';
import { buildSiteGraph } from './builders';
import { getSeoContext } from './context';
import { JsonLd } from './JsonLd';

export interface SiteStructuredDataProps {
  locale: AppLocale;
}

/**
 * Server component that emits the site-wide `Organization` + `WebSite` graph
 * (including the internal `SearchAction`).
 *
 * Must be rendered inside the document. The locale layout is a pass-through
 * whose children own `<html>`/`<body>`, so this is mounted by the
 * document-bearing route-group layouts rather than next to them.
 */
export async function SiteStructuredData({ locale }: SiteStructuredDataProps) {
  const seoContext = await getSeoContext(locale);

  const siteGraph = buildSiteGraph({
    ...seoContext,
    logoUrl: config.common.assets.appIcon,
    sameAs: Object.values(config.common.socialLinks),
    contactEmail: config.deploymentMeta.contactEmail,
  });

  return <JsonLd data={siteGraph} />;
}
