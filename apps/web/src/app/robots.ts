import type { MetadataRoute } from 'next';

import { getAppConfigService } from '@/kernel';

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
