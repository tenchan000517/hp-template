import { MetadataRoute } from 'next';
import { meta, cases, columns } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = meta.siteUrl;

  // 静的ページ
  const staticPages = [
    '',
    '/philosophy',
    '/service',
    '/team',
    '/about',
    '/contact',
    '/privacy',
    '/case',
    '/column',
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : 0.8,
  }));

  // 事例詳細ページ
  const caseRoutes: MetadataRoute.Sitemap = cases.map((caseItem) => ({
    url: `${baseUrl}/case/${caseItem.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // コラム詳細ページ
  const columnRoutes: MetadataRoute.Sitemap = columns.map((column) => ({
    url: `${baseUrl}/column/${column.slug}`,
    lastModified: new Date(column.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes, ...columnRoutes];
}
