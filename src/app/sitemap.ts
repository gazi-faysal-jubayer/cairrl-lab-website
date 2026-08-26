import type { MetadataRoute } from 'next';
import { people } from '@/lib/data/people-data';
import { researchAreas, projects } from '@/lib/data/research-data';
import { newsPosts, events } from '@/lib/data/news-events-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/people',
    '/research',
    '/publications',
    '/news',
    '/events',
    '/gallery',
    '/join-us',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const peopleRoutes: MetadataRoute.Sitemap = people.map((p) => ({
    url: `${baseUrl}/people/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const researchRoutes: MetadataRoute.Sitemap = researchAreas.map((a) => ({
    url: `${baseUrl}/research/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((proj) => ({
    url: `${baseUrl}/research/projects/${proj.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const newsRoutes: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((evt) => ({
    url: `${baseUrl}/events/${evt.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...peopleRoutes,
    ...researchRoutes,
    ...projectRoutes,
    ...newsRoutes,
    ...eventRoutes,
  ];
}
