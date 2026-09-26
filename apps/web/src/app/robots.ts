import type { MetadataRoute } from 'next';

import './bootstrap/di';
import { getAppConfigService } from '@/services';

export default function robots(): MetadataRoute.Robots {
  const { publicUrl } = getAppConfigService().getDeploymentMeta();

  return {
    rules: {
      userAgent: '*',
      crawlDelay: 10,
      // Internal surfaces are excluded from crawling outright; public utility
      // pages remain crawlable but are `noindex` via metadata.
      disallow: ['/api/', '/*/debug', '/*/admin'],
    },
    sitemap: `${publicUrl}/sitemap.xml`,
  };
}
