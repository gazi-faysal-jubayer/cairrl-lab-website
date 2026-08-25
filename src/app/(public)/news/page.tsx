import type { Metadata } from 'next';
import { Newspaper } from 'lucide-react';
import { Container } from '@/components/shared';

export const metadata: Metadata = {
  title: 'News & Events',
  description:
    'Latest news, events, seminars, and workshops from CAIRRL Lab at KUET.',
};

export default function NewsPage() {
  return (
    <>
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Updates
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            News & Events
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Stay updated with the latest from CAIRRL Lab.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="rounded-lg border border-border bg-surface px-8 py-16 text-center">
            <Newspaper className="mx-auto h-12 w-12 text-muted-text/30" />
            <h2 className="mt-4 font-heading text-xl font-semibold text-ink">
              No News Yet
            </h2>
            <p className="mt-2 text-muted-text">
              News and events will appear here as the lab publishes them.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
