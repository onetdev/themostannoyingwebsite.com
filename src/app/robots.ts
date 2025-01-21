import type { MetadataRoute } from 'next';

import config from '@/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      crawlDelay: 10,
    },
    sitemap: `${config.env.publicUrl}/sitemap.xml`,
  };
}
