import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Users,
  ExternalLink,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { projects, researchAreas } from '@/lib/data/research-data';
import { people } from '@/lib/data/people-data';
import { publications, publicationTypeLabels } from '@/lib/data/publications-data';
import { PersonCard } from '@/components/public/person-card';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return projects.map((p) => ({
    projectSlug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}): Promise<Metadata> {
  const { projectSlug } = await params;
  const project = projects.find((p) => p.slug === projectSlug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Research Project`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  const project = projects.find((p) => p.slug === projectSlug);
  if (!project) notFound();

  const relatedAreas = researchAreas.filter((a) =>
    project.researchAreaSlugs.includes(a.slug)
  );
  const teamMembers = people.filter((p) => project.teamSlugs.includes(p.slug));
  const relatedPublications = publications.filter(
    (pub) => pub.projectSlug === project.slug
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
            Back to Research & Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className={cn(
                'text-xs font-semibold',
                project.status === 'ONGOING'
                  ? 'bg-accent-green/20 text-accent-green'
                  : 'bg-white/10 text-white'
              )}
            >
              {project.status === 'ONGOING' ? '● Active Project' : 'Planned Project'}
            </Badge>

            <span className="flex items-center gap-1 text-xs text-white/60">
              <Calendar className="h-3.5 w-3.5 text-accent-cyan" />
              Started {project.startDate}
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold text-white md:text-4xl">
            {project.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {relatedAreas.map((area) => (
              <Badge
                key={area.slug}
                variant="outline"
                className="border-white/20 text-xs text-white/80"
              >
                {area.name}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Body & Team ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-semibold text-ink">
                  Executive Summary
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-text">
                  {project.summary}
                </p>

                <h3 className="mt-10 font-heading text-xl font-semibold text-ink">
                  Research Methodology & Scope
                </h3>
                <p className="mt-4 leading-relaxed text-muted-text">
                  {project.description}
                </p>

                {/* Related Publications */}
                {relatedPublications.length > 0 && (
                  <div className="mt-12">
                    <h3 className="flex items-center gap-2 font-heading text-xl font-semibold text-ink">
                      <BookOpen className="h-5 w-5 text-accent-cyan" />
                      Resulting Publications
                    </h3>
                    <div className="mt-6 space-y-4">
                      {relatedPublications.map((pub) => (
                        <div
                          key={pub.id}
                          className="rounded-xl border border-border bg-surface p-5 shadow-sm"
                        >
                          <div className="flex items-center gap-2">
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
                              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Publication Link
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatedSection>
            </div>

            {/* Sidebar: Team */}
            <div>
              <AnimatedSection delay={100}>
                <div className="rounded-xl border border-border bg-surface-muted p-6">
                  <h3 className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-muted-text">
                    <Users className="h-4 w-4 text-accent-cyan" />
                    Investigators & Students
                  </h3>

                  <div className="mt-6 space-y-4">
                    {teamMembers.map((member) => (
                      <PersonCard key={member.slug} person={member} />
                    ))}
                  </div>

                  <div className="mt-6 border-t border-border pt-4">
                    <Link
                      href="/join-us"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan hover:underline"
                    >
                      <span>Interested in joining this project?</span>
                      <ArrowRight className="h-3.5 w-3.5" />
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
