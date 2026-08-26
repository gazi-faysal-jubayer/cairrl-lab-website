import type { Metadata } from 'next';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getGalleryItems } from '@/lib/db/queries';
import { GalleryGrid } from '@/components/public/gallery-grid';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos from CAIRRL Lab — research projects, team, events, and lab activities.',
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  const galleryData = items.map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    caption: item.caption,
    category: item.category,
    projectTitle: item.project?.title ?? null,
  }));

  // Extract unique categories
  const categories = Array.from(new Set(items.map((i) => i.category).filter(Boolean))) as string[];

  return (
    <>
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Visual Archive
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Gallery
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            A visual record of our research, events, and lab activities.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <GalleryGrid items={galleryData} categories={categories} />
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
