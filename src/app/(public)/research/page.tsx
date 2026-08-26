import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Cog, FlaskConical, Plane, Factory, Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getResearchAreas, getProjects } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Explore the research areas, projects, and focus areas at CAIRRL Lab — robotics, control systems, mechatronics, and intelligent systems.',
};

const areaIcons: Record<string, typeof Cpu> = {
  'robotics-and-control': Cpu,
  'mechatronics-systems': Cog,
  'additive-manufacturing': FlaskConical,
  'aerial-robotics-and-uav': Plane,
  'industrial-automation': Factory,
  'iot-and-embedded-systems': Wifi,
};

const areaGradients: Record<string, string> = {
  'robotics-and-control': 'from-cyan-500/20 to-blue-500/5',
  'mechatronics-systems': 'from-violet-500/20 to-purple-500/5',
  'additive-manufacturing': 'from-emerald-500/20 to-teal-500/5',
  'aerial-robotics-and-uav': 'from-sky-500/20 to-indigo-500/5',
  'industrial-automation': 'from-amber-500/20 to-orange-500/5',
  'iot-and-embedded-systems': 'from-rose-500/20 to-pink-500/5',
};

export default async function ResearchPage() {
  const [researchAreas, projects] = await Promise.all([
    getResearchAreas(),
    getProjects(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Research
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Research Areas & Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Our lab works across multiple disciplines within robotics, control, and intelligent
            systems. Explore our focus areas and active projects below.
          </p>
        </Container>
      </section>

      {/* Research Areas */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Focus Areas"
              description="Core research domains that define our lab's expertise and ongoing investigations."
            />
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area, i) => {
              const Icon = areaIcons[area.slug] ?? Cpu;
              const gradient = areaGradients[area.slug] ?? 'from-cyan-500/20 to-blue-500/5';
              return (
                <AnimatedSection key={area.id} delay={i * 80}>
                  <Link
                    href={`/research/${area.slug}`}
                    className="group relative block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
                  >
                    {/* Gradient background */}
                    <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                    <div className="p-6">
                      <div className="mb-4 inline-flex rounded-lg bg-accent-cyan/10 p-3 transition-colors group-hover:bg-accent-cyan/20">
                        <Icon className="h-6 w-6 text-accent-cyan" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-ink transition-colors group-hover:text-accent-cyan">
                        {area.name}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-text">
                        {area.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-text">
                        {area.faculty.length + area.students.length > 0 && (
                          <span>{area.faculty.length + area.students.length} researchers</span>
                        )}
                        {area.projects.length > 0 && (
                          <span>{area.projects.length} projects</span>
                        )}
                        {area.publications.length > 0 && (
                          <span>{area.publications.length} publications</span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-cyan opacity-0 transition-opacity group-hover:opacity-100">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="bg-surface-muted py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Active Projects"
                description="Current and completed research projects across our focus areas."
              />
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 80}>
                  <Link
                    href={`/research/projects/${project.slug}`}
                    className="group block overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
                  >
                    {/* Cover */}
                    <div className="aspect-video bg-brand-navy/5">
                      {project.coverImageUrl ? (
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundImage: `url(${project.coverImageUrl})` }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-navy/10 to-accent-cyan/5">
                          <Cpu className="h-10 w-10 text-muted-text/20" />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={
                            project.status === 'ONGOING'
                              ? 'bg-accent-green/10 text-xs text-accent-green'
                              : project.status === 'COMPLETED'
                                ? 'bg-muted-text/10 text-xs text-muted-text'
                                : 'bg-amber-500/10 text-xs text-amber-600'
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <h3 className="mt-2 font-heading text-base font-semibold text-ink transition-colors group-hover:text-accent-cyan">
                        {project.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-text">
                        {project.summary}
                      </p>

                      {project.researchAreas.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {project.researchAreas.map((area) => (
                            <Badge
                              key={area.id}
                              variant="secondary"
                              className="bg-accent-cyan/10 text-[10px] text-accent-cyan"
                            >
                              {area.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
