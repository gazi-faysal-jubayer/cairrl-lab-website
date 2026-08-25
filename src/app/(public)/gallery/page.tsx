import type { Metadata } from 'next';
import { Image as ImageIcon } from 'lucide-react';
import { Container } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photo gallery from CAIRRL Lab — lab work, events, projects, and team moments.',
};

export default function GalleryPage() {
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
            Photos from the lab, events, and our research work.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="rounded-lg border border-border bg-surface px-8 py-16 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-text/30" />
            <h2 className="mt-4 font-heading text-xl font-semibold text-ink">
              Gallery Coming Soon
            </h2>
            <p className="mt-2 text-muted-text">
              Photos will be added here as the lab grows and captures its work.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
