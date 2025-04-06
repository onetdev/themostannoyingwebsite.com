import type { MetadataRoute } from 'next';

import config from '@/root/apps/web/src/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      crawlDelay: 10,
    },
    sitemap: `${config.publicUrl}/sitemap.xml`,
  };
}
