import { getGalleryItems } from '@/lib/db/queries';
import { GalleryManager, type DashboardGalleryItem } from '@/components/dashboard/gallery-manager';

export const dynamic = 'force-dynamic';

export default async function DashboardGalleryPage() {
  const rawItems = await getGalleryItems();

  const formattedItems: DashboardGalleryItem[] = rawItems.map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    caption: item.caption,
    category: item.category,
    createdAt: item.createdAt.toISOString(),
  }));

  return <GalleryManager initialItems={formattedItems} />;
}
