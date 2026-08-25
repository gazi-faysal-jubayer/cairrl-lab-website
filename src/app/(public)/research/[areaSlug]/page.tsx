import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Bot,
  Cog,
  Layers,
  Plane,
  Factory,
  Cpu,
  Users,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { researchAreas, projects } from '@/lib/data/research-data';
import { people } from '@/lib/data/people-data';
import { publications, publicationTypeLabels } from '@/lib/data/publications-data';
import { PersonCard } from '@/components/public/person-card';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return researchAreas.map((area) => ({
    areaSlug: area.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ areaSlug: string }>;
}): Promise<Metadata> {
  const { areaSlug } = await params;
  const area = researchAreas.find((a) => a.slug === areaSlug);
  if (!area) return { title: 'Research Area Not Found' };

  return {
    title: `${area.name} — Research Area`,
    description: area.shortDescription,
  };
}

const iconMap = {
  bot: Bot,
  cog: Cog,
  layers: Layers,
  plane: Plane,
  factory: Factory,
  cpu: Cpu,
};

export default async function ResearchAreaDetailPage({
  params,
}: {
  params: Promise<{ areaSlug: string }>;
}) {
  const { areaSlug } = await params;
  const area = researchAreas.find((a) => a.slug === areaSlug);
  if (!area) notFound();

  const Icon = iconMap[area.iconName] || Bot;
  const associatedFaculty = people.filter((p) =>
    area.facultySlugs.includes(p.slug)
  );
  const associatedProjects = projects.filter((p) =>
    p.researchAreaSlugs.includes(area.slug)
  );
  const associatedPublications = publications.filter((p) =>
    p.researchAreaSlugs.includes(area.slug)
  );

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <Link
            href="/research"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-accent-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Research Areas
          </Link>

          <div className="flex items-start gap-4 md:gap-6">
            <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-cyan md:h-16 md:w-16">
              <Icon className="h-8 w-8" />
            </div>

            <div>
              <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
                Research Track
              </p>
              <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
                {area.name}
              </h1>
              <p className="mt-3 max-w-3xl text-base text-white/70 md:text-lg">
                {area.shortDescription}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Main Overview ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-semibold text-ink">
                  Overview & Scientific Objectives
                </h2>
                <p className="mt-4 leading-relaxed text-muted-text">
                  {area.description}
                </p>

                {/* Associated Projects */}
                <div className="mt-12">
                  <h3 className="font-heading text-xl font-semibold text-ink">
                    Projects in this Area
                  </h3>
                  {associatedProjects.length > 0 ? (
                    <div className="mt-6 space-y-4">
                      {associatedProjects.map((proj) => (
                        <div
                          key={proj.slug}
                          className="rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-150 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <Badge
                              variant="secondary"
                              className={cn(
                                'text-xs font-semibold',
                                proj.status === 'ONGOING'
                                  ? 'bg-accent-green/10 text-accent-green'
                                  : 'bg-muted text-muted-text'
                              )}
                            >
                              {proj.status === 'ONGOING' ? '● Ongoing' : 'Planned'}
                            </Badge>
                            <span className="font-mono text-xs text-muted-text">
                              Started {proj.startDate}
                            </span>
                          </div>
                          <h4 className="mt-3 font-heading text-base font-semibold text-ink">
                            {proj.title}
                          </h4>
                          <p className="mt-2 text-sm text-muted-text">
                            {proj.summary}
                          </p>
                          <div className="mt-4">
                            <Link
                              href={`/research/projects/${proj.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan hover:underline"
                            >
                              <span>Read Project Details</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm italic text-muted-text/70">
                      New project proposals in this area will be announced soon.
                    </p>
                  )}
                </div>

                {/* Related Publications */}
                <div className="mt-12">
                  <h3 className="font-heading text-xl font-semibold text-ink">
                    Key Publications
                  </h3>
                  {associatedPublications.length > 0 ? (
                    <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
                      {associatedPublications.map((pub) => (
                        <div key={pub.id} className="p-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {publicationTypeLabels[pub.type]}
                            </Badge>
                            <span className="font-mono text-xs text-muted-text">
                              {pub.year}
                            </span>
                          </div>
                          <h4 className="mt-2 font-heading text-base font-semibold text-ink">
                            {pub.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted-text">
                            {pub.authors} — <span className="italic">{pub.venue}</span>
                          </p>
                          {pub.doiOrLink && (
                            <a
                              href={pub.doiOrLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent-cyan hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Link
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm italic text-muted-text/70">
                      Publications will appear here once indexed.
                    </p>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar: Faculty Leads */}
            <div>
              <AnimatedSection delay={100}>
                <div className="rounded-xl border border-border bg-surface-muted p-6">
                  <h3 className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-muted-text">
                    <Users className="h-4 w-4 text-accent-cyan" />
                    Faculty Leads
                  </h3>

                  <div className="mt-6 space-y-4">
                    {associatedFaculty.map((fac) => (
                      <PersonCard key={fac.slug} person={fac} />
                    ))}
                  </div>

                  <div className="mt-6 pt-4">
                    <Link
                      href="/people"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        'w-full'
                      )}
                    >
                      View All Lab Members
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
