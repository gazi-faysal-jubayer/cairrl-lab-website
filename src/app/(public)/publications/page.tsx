import type { Metadata } from 'next';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getPublications, getResearchAreas } from '@/lib/db/queries';
import { PublicationList } from '@/components/public/publication-list';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Browse publications from CAIRRL Lab — journal articles, conference papers, and theses in robotics, control, and mechatronics.',
};

export default async function PublicationsPage() {
  const [publications, researchAreas] = await Promise.all([
    getPublications(),
    getResearchAreas(),
  ]);

  // Transform for the client component
  const pubData = publications.map((pub) => ({
    id: pub.id,
    title: pub.title,
    authors: pub.authors,
    venue: pub.venue,
    year: pub.year,
    type: pub.type,
    abstract: pub.abstract,
    doiOrLink: pub.doiOrLink,
    pdfUrl: pub.pdfUrl,
    featured: pub.featured,
    researchAreas: pub.researchAreas.map((a) => ({ id: a.id, name: a.name, slug: a.slug })),
  }));

  const areaFilters = researchAreas.map((a) => ({ id: a.id, name: a.name, slug: a.slug }));

  return (
    <>
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Academic Output
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Publications
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Browse our published research — journal articles, conference papers, and theses.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <PublicationList publications={pubData} researchAreas={areaFilters} />
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
