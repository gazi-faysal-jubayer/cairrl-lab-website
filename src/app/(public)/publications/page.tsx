import type { Metadata } from 'next';
import { Container } from '@/components/shared';
import { PublicationList } from '@/components/public/publication-list';
import { siteConfig } from '@/lib/data/site-data';

export const metadata: Metadata = {
  title: 'Publications',
  description: `Browse peer-reviewed journal papers, conference proceedings, and academic contributions from ${siteConfig.name} at ${siteConfig.institution}.`,
};

export default function PublicationsPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Scientific Output
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Publications
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Peer-reviewed journal articles, conference papers, and technical contributions
            by CAIRRL Lab faculty and researchers.
          </p>
        </Container>
      </section>

      {/* ─── Main Content ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <PublicationList />
        </Container>
      </section>
    </>
  );
}
