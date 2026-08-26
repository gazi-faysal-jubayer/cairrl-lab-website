import Link from 'next/link';
import {
  ArrowRight,
  Users,
  FlaskConical,
  BookOpen,
  Cpu,
  Newspaper,
  GraduationCap,
  Cog,
  Wifi,
  Plane,
  Factory,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { cn } from '@/lib/utils';
import {
  getQuickStats,
  getResearchAreas,
  getLatestNews,
  getUpcomingEvents,
  getFeaturedPublications,
  getFacultyMembers,
} from '@/lib/db/queries';

const areaIcons: Record<string, typeof Cpu> = {
  'robotics-and-control': Cpu,
  'mechatronics-systems': Cog,
  'additive-manufacturing': FlaskConical,
  'aerial-robotics-and-uav': Plane,
  'industrial-automation': Factory,
  'iot-and-embedded-systems': Wifi,
};

export default async function HomePage() {
  const [stats, researchAreas, latestNews, upcomingEvents, featuredPubs, faculty] =
    await Promise.all([
      getQuickStats(),
      getResearchAreas(),
      getLatestNews(3),
      getUpcomingEvents(3),
      getFeaturedPublications(),
      getFacultyMembers(),
    ]);

  const statsDisplay = [
    { label: 'Faculty', value: stats.faculty, icon: GraduationCap },
    { label: 'Members', value: stats.members, icon: Users },
    { label: 'Research Areas', value: stats.researchAreas, icon: FlaskConical },
    { label: 'Publications', value: stats.publications, icon: BookOpen },
  ];

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-brand-navy">
        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient orb */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-cyan/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-24 h-80 w-80 rounded-full bg-accent-cyan/5 blur-3xl" />

        <Container className="relative py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
              Khulna University of Engineering &amp; Technology (KUET)
            </p>

            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Centre for Advanced Intelligent{' '}
              <span className="bg-gradient-to-r from-accent-cyan to-cyan-300 bg-clip-text text-transparent">
                Robotics
              </span>{' '}
              Research Laboratory
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Advancing Robotics, Control, and Intelligent Systems at the Intersection of
              Mechanical and Mechatronics Engineering
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/people"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-accent-cyan text-white hover:bg-accent-cyan-hover'
                )}
              >
                <Users className="mr-2 h-4 w-4" />
                Meet the Team
              </Link>
              <Link
                href="/research"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-white/20 text-white hover:bg-white/10 hover:text-white'
                )}
              >
                Explore Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Live Stats Strip ─── */}
      <section className="border-b border-border bg-surface">
        <Container>
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {statsDisplay.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-4 py-6 md:px-6 md:py-8">
                <div className="rounded-lg bg-accent-cyan/10 p-2.5">
                  <stat.icon className="h-5 w-5 text-accent-cyan" />
                </div>
                <div>
                  <p className="font-mono text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {String(stat.value).padStart(2, '0')}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-text">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Research Focus Areas ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Research Focus Areas"
              description="Our lab works at the intersection of robotics, control systems, and intelligent mechatronics."
            />
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area, i) => {
              const Icon = areaIcons[area.slug] ?? Cpu;
              return (
                <AnimatedSection key={area.id} delay={i * 80}>
                  <Link
                    href={`/research/${area.slug}`}
                    className="group block rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
                  >
                    <div className="mb-4 inline-flex rounded-lg bg-accent-cyan/10 p-3 transition-colors duration-200 group-hover:bg-accent-cyan/20">
                      <Icon className="h-6 w-6 text-accent-cyan" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-ink">
                      {area.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-text">
                      {area.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-text">
                      <span>{area.faculty.length + area.students.length} members</span>
                      <span>{area.projects.length} projects</span>
                      <span>{area.publications.length} publications</span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={500}>
            <div className="mt-10 text-center">
              <Link
                href="/research"
                className={cn(buttonVariants({ variant: 'outline' }))}
              >
                View All Research Areas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ─── Faculty Spotlight ─── */}
      {faculty.length > 0 && (
        <section className="bg-surface-muted py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Our Faculty"
                description="Leading interdisciplinary research across Mechanical and Mechatronics Engineering."
              />
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-2">
              {faculty.map((member, i) => (
                <AnimatedSection key={member.id} delay={i * 100}>
                  <Link
                    href={`/people/${member.slug}`}
                    className="group flex gap-5 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
                  >
                    {/* Avatar */}
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-navy">
                      {member.photoUrl ? (
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${member.photoUrl})` }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="font-heading text-2xl font-bold text-white/50">
                            {member.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-lg font-semibold text-ink group-hover:text-accent-cyan transition-colors duration-150">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-text">
                        {member.designation}, {member.department}
                      </p>
                      {member.researchAreas.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {member.researchAreas.slice(0, 3).map((area) => (
                            <Badge
                              key={area.id}
                              variant="secondary"
                              className="bg-accent-cyan/10 text-xs text-accent-cyan"
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

            <AnimatedSection delay={300}>
              <div className="mt-8 text-center">
                <Link
                  href="/people"
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  View All Team Members
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ─── Featured Publications ─── */}
      {featuredPubs.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Featured Publications"
                description="Recent highlights from our research output."
              />
            </AnimatedSection>

            <div className="space-y-4">
              {featuredPubs.map((pub, i) => (
                <AnimatedSection key={pub.id} delay={i * 80}>
                  <div className="rounded-lg border border-border bg-surface p-5 transition-shadow duration-200 hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="shrink-0 bg-accent-cyan/10 text-xs text-accent-cyan"
                          >
                            {pub.type}
                          </Badge>
                          <span className="font-mono text-xs text-muted-text">
                            {pub.year}
                          </span>
                        </div>
                        <h3 className="mt-2 font-heading text-base font-semibold leading-snug text-ink">
                          {pub.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-text">{pub.authors}</p>
                        <p className="mt-0.5 text-xs italic text-muted-text/70">
                          {pub.venue}
                        </p>
                      </div>
                      {pub.doiOrLink && (
                        <a
                          href={pub.doiOrLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-accent-cyan transition-colors hover:bg-accent-cyan/10"
                        >
                          View →
                        </a>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={400}>
              <div className="mt-8 text-center">
                <Link
                  href="/publications"
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  View All Publications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ─── Latest News ─── */}
      <section className="bg-surface-muted py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Latest News"
              description="Updates from CAIRRL Lab — new publications, events, and milestones."
            />
          </AnimatedSection>

          {latestNews.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 100}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="group block overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
                  >
                    {/* Cover image */}
                    <div className="aspect-video bg-brand-navy/5">
                      {post.coverImageUrl ? (
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundImage: `url(${post.coverImageUrl})` }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Newspaper className="h-10 w-10 text-muted-text/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="font-mono text-xs text-muted-text">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <h3 className="mt-2 font-heading text-base font-semibold text-ink transition-colors duration-150 group-hover:text-accent-cyan">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-text">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection delay={100}>
              <div className="rounded-lg border border-border bg-surface px-8 py-12 text-center">
                <Newspaper className="mx-auto h-10 w-10 text-muted-text/20" />
                <p className="mt-4 text-muted-text">
                  News and updates will appear here as the lab publishes them.
                </p>
              </div>
            </AnimatedSection>
          )}
        </Container>
      </section>

      {/* ─── Upcoming Events ─── */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Upcoming Events"
                description="Seminars, workshops, and talks from the lab."
              />
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-3">
              {upcomingEvents.map((event, i) => {
                const date = new Date(event.startAt);
                return (
                  <AnimatedSection key={event.id} delay={i * 100}>
                    <Link
                      href={`/events/${event.slug}`}
                      className="group flex gap-4 rounded-lg border border-border bg-surface p-5 transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg"
                    >
                      {/* Calendar date */}
                      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-navy text-white">
                        <span className="font-mono text-xs uppercase leading-none">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="mt-0.5 font-heading text-xl font-bold leading-none">
                          {date.getDate()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <Badge
                          variant="secondary"
                          className="bg-accent-cyan/10 text-xs text-accent-cyan"
                        >
                          {event.type}
                        </Badge>
                        <h3 className="mt-1.5 font-heading text-sm font-semibold text-ink transition-colors group-hover:text-accent-cyan">
                          {event.title}
                        </h3>
                        {event.location && (
                          <p className="mt-1 text-xs text-muted-text">{event.location}</p>
                        )}
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={400}>
              <div className="mt-8 text-center">
                <Link
                  href="/events"
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ─── CTA Section ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy px-8 py-12 text-center md:px-16 md:py-16">
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent-cyan/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent-cyan/5 blur-3xl" />

              <div className="relative">
                <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                  Interested in Robotics Research?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base text-white/70">
                  We&apos;re always looking for motivated undergraduate and graduate students
                  to join our research team at KUET.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/join-us"
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'bg-accent-cyan text-white hover:bg-accent-cyan-hover'
                    )}
                  >
                    Learn How to Join
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'border-white/20 text-white hover:bg-white/10 hover:text-white'
                    )}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
