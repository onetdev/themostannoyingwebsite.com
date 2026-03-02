import type { MetadataRoute } from 'next';

import './bootstrap/di';
import { getAppConfigService } from '@/services';

export default function robots(): MetadataRoute.Robots {
  const { publicUrl } = getAppConfigService().getDeploymentMeta();

  return {
    rules: {
      userAgent: '*',
      crawlDelay: 10,
    },
    sitemap: `${publicUrl}/sitemap.xml`,
  };
}
