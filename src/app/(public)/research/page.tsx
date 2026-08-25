import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Bot,
  Cog,
  Layers,
  Plane,
  Factory,
  Cpu,
  ArrowRight,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { researchAreas, projects } from '@/lib/data/research-data';
import { people } from '@/lib/data/people-data';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Explore research areas and active engineering projects at CAIRRL Lab, KUET — Robotics, Control, Mechatronics, UAVs, and IoT.',
};

const iconMap = {
  bot: Bot,
  cog: Cog,
  layers: Layers,
  plane: Plane,
  factory: Factory,
  cpu: Cpu,
};

export default function ResearchOverviewPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Interdisciplinary Innovation
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Research & Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Bridging mechanical engineering, control systems, electronics, and
            computing to develop reliable intelligent systems for real-world applications.
          </p>
        </Container>
      </section>

      {/* ─── Research Areas ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Research Focus Areas"
              description="Our core research thrusts unite mechanical design with embedded intelligence and modern control theory."
            />
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area, i) => {
              const Icon = iconMap[area.iconName] || Bot;
              const associatedFaculty = people.filter((p) =>
                area.facultySlugs.includes(p.slug)
              );

              return (
                <AnimatedSection key={area.slug} delay={i * 80}>
                  <Link
                    href={`/research/${area.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-lg"
                  >
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan transition-colors duration-150 group-hover:bg-accent-cyan group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="font-heading text-xl font-semibold text-ink transition-colors duration-150 group-hover:text-accent-cyan">
                      {area.name}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-text">
                      {area.shortDescription}
                    </p>

                    {/* Associated Faculty */}
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-text/70">
                        Lead Faculty
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {associatedFaculty.map((f) => (
                          <span
                            key={f.slug}
                            className="inline-block text-xs font-medium text-ink"
                          >
                            {f.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent-cyan group-hover:underline">
                      <span>Explore Area & Projects</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── Active & Planned Projects ─── */}
      <section className="bg-surface-muted py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Featured Research Projects"
              description="Current experimental initiatives and student-led investigations underway in the laboratory."
            />
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj, i) => {
              const matchedAreas = researchAreas.filter((a) =>
                proj.researchAreaSlugs.includes(a.slug)
              );

              return (
                <AnimatedSection key={proj.slug} delay={i * 100}>
                  <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                    <div className="mb-3 flex items-center justify-between gap-2">
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
                      <span className="flex items-center gap-1 text-xs text-muted-text">
                        <Calendar className="h-3 w-3" />
                        {proj.startDate.slice(0, 4)}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-ink">
                      {proj.title}
                    </h3>

                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-text">
                      {proj.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {matchedAreas.map((a) => (
                        <Badge
                          key={a.slug}
                          variant="secondary"
                          className="bg-accent-cyan/10 text-xs text-accent-cyan"
                        >
                          {a.name}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-border pt-4">
                      <Link
                        href={`/research/projects/${proj.slug}`}
                        className={cn(
                          buttonVariants({ variant: 'outline', size: 'sm' }),
                          'w-full justify-between'
                        )}
                      >
                        <span>View Project Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-16 md:py-20">
        <Container>
          <AnimatedSection>
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-brand-navy p-8 text-white md:flex-row md:p-12">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-accent-cyan">
                  <Sparkles className="h-3.5 w-3.5" />
                  Academic Output
                </span>
                <h2 className="mt-3 font-heading text-2xl font-semibold md:text-3xl">
                  Browse Lab Publications
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Read our peer-reviewed journal papers, conference proceedings, and technical reports.
                </p>
              </div>
              <Link
                href="/publications"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'shrink-0 bg-accent-cyan text-white hover:bg-accent-cyan-hover'
                )}
              >
                Explore Publications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
