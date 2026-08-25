import type { Metadata } from 'next';
import { Container } from '@/components/shared';
import { GalleryGrid } from '@/components/public/gallery-grid';
import { siteConfig } from '@/lib/data/site-data';

export const metadata: Metadata = {
  title: 'Gallery',
  description: `Visual archive and photographs from ${siteConfig.name} at ${siteConfig.institution} — lab setups, robotics equipment, and team milestones.`,
};

export default function GalleryPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Visual Archive
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Lab Gallery
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            A visual glimpse into our experimental workstations, custom robotics
            prototypes, research workshops, and team gatherings at KUET.
          </p>
        </Container>
      </section>

      {/* ─── Main Gallery Grid ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
