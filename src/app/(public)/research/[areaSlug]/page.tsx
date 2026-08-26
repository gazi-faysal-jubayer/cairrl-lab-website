import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, BookOpen, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getResearchAreaBySlug, getAllResearchAreaSlugs } from '@/lib/db/queries';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  const slugs = await getAllResearchAreaSlugs();
  return slugs.map((slug) => ({ areaSlug: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ areaSlug: string }>;
}): Promise<Metadata> {
  const { areaSlug } = await params;
  const area = await getResearchAreaBySlug(areaSlug);
  if (!area) return { title: 'Research Area Not Found' };
  return {
    title: area.name,
    description: area.description.slice(0, 160),
  };
}

export default async function ResearchAreaPage({
  params,
}: {
  params: Promise<{ areaSlug: string }>;
}) {
  const { areaSlug } = await params;
  const area = await getResearchAreaBySlug(areaSlug);
  if (!area) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <Link
            href="/research"
            className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-accent-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research
          </Link>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Research Area
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            {area.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-white/70 md:text-lg">
            {area.description}
          </p>
        </Container>
      </section>

      {/* People */}
      {(area.faculty.length > 0 || area.students.length > 0) && (
        <section className="py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Researchers"
                description={`Faculty and students working in ${area.name}.`}
              />
            </AnimatedSection>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {area.faculty.map((member) => (
                <AnimatedSection key={member.id}>
                  <Link
                    href={`/people/${member.slug}`}
                    className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-navy">
                      <Users className="h-5 w-5 text-white/50" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-accent-cyan">Faculty</p>
                      <h3 className="font-heading text-sm font-semibold text-ink group-hover:text-accent-cyan transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-muted-text">{member.designation}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
              {area.students.map((member) => (
                <AnimatedSection key={member.id}>
                  <Link
                    href={`/people/${member.slug}`}
                    className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-muted">
                      <Users className="h-5 w-5 text-muted-text/50" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-text">Student</p>
                      <h3 className="font-heading text-sm font-semibold text-ink group-hover:text-accent-cyan transition-colors">
                        {member.name}
                      </h3>
                      {member.program && <p className="text-xs text-muted-text">{member.program}</p>}
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Projects */}
      {area.projects.length > 0 && (
        <section className="bg-surface-muted py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading title="Projects" description={`Projects within ${area.name}.`} />
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2">
              {area.projects.map((project) => (
                <AnimatedSection key={project.id}>
                  <Link
                    href={`/research/projects/${project.slug}`}
                    className="group block rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg"
                  >
                    <Badge
                      variant="secondary"
                      className={
                        project.status === 'ONGOING'
                          ? 'bg-accent-green/10 text-xs text-accent-green'
                          : 'bg-muted-text/10 text-xs text-muted-text'
                      }
                    >
                      {project.status}
                    </Badge>
                    <h3 className="mt-2 font-heading text-lg font-semibold text-ink group-hover:text-accent-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-text">{project.summary}</p>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Publications */}
      {area.publications.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Publications"
                description={`Published work in ${area.name}.`}
              />
            </AnimatedSection>

            <div className="space-y-3">
              {area.publications.map((pub) => (
                <AnimatedSection key={pub.id}>
                  <div className="rounded-lg border border-border bg-surface p-5">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-accent-cyan/10 text-xs text-accent-cyan">
                        {pub.type}
                      </Badge>
                      <span className="font-mono text-xs text-muted-text">{pub.year}</span>
                    </div>
                    <h4 className="mt-2 font-heading text-base font-semibold text-ink">{pub.title}</h4>
                    <p className="mt-1 text-sm text-muted-text">{pub.authors}</p>
                    <p className="text-xs italic text-muted-text/70">{pub.venue}</p>
                    {pub.doiOrLink && (
                      <a
                        href={pub.doiOrLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-accent-cyan hover:underline"
                      >
                        <BookOpen className="h-3 w-3" /> View Publication
                      </a>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Empty state */}
      {area.faculty.length === 0 && area.students.length === 0 && area.projects.length === 0 && area.publications.length === 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <div className="rounded-lg border border-border bg-surface px-8 py-12 text-center">
              <Cpu className="mx-auto h-10 w-10 text-muted-text/30" />
              <p className="mt-4 text-muted-text">
                Content for this research area is being populated.
              </p>
              <Link href="/research" className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Research
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
