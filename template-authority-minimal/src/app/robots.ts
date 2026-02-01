import { MetadataRoute } from 'next';
import { meta } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${meta.siteUrl}/sitemap.xml`,
  };
}
