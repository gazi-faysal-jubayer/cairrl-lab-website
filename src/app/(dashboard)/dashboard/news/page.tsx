import { getAllDashboardNews } from '@/lib/db/queries';
import { NewsTable, type DashboardNewsRow } from '@/components/dashboard/news-table';

export const dynamic = 'force-dynamic';

export default async function DashboardNewsPage() {
  const rawNews = await getAllDashboardNews();

  const formattedNews: DashboardNewsRow[] = rawNews.map((n) => ({
    id: n.id,
    slug: n.slug,
    title: n.title,
    excerpt: n.excerpt,
    body: n.body,
    coverImageUrl: n.coverImageUrl,
    publishedAt: n.publishedAt.toISOString(),
    status: n.status,
  }));

  return <NewsTable initialNews={formattedNews} />;
}
