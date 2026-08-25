import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  ArrowRight,
  MapPin,
  Globe,
  Newspaper,
  CalendarDays,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import {
  newsPosts,
  events,
  eventTypeLabels,
} from '@/lib/data/news-events-data';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'News & Events',
  description:
    'Stay informed about the latest research breakthroughs, seminar talks, workshops, and milestones from CAIRRL Lab at KUET.',
};

export default function NewsAndEventsPage() {
  const now = new Date().toISOString();
  const upcomingEvents = events.filter((e) => e.startAt >= now.slice(0, 10));

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Lab Updates
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            News & Events
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Read about our latest research discoveries, academic milestones, technical
            seminars, and community workshops.
          </p>
        </Container>
      </section>

      {/* ─── Main Content Grid ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* News Articles Column (Left 8 cols) */}
            <div className="lg:col-span-8">
              <AnimatedSection>
                <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
                  <h2 className="flex items-center gap-2 font-heading text-2xl font-semibold text-ink">
                    <Newspaper className="h-6 w-6 text-accent-cyan" />
                    Latest News & Announcements
                  </h2>
                </div>

                <div className="space-y-8">
                  {newsPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="group rounded-xl border border-border bg-surface p-7 shadow-sm transition-all duration-150 hover:border-accent-cyan/40 hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-text">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-accent-cyan" />
                          {post.publishedAt}
                        </span>
                        <span>•</span>
                        <Badge
                          variant="secondary"
                          className="bg-accent-cyan/10 text-xs text-accent-cyan"
                        >
                          {post.category}
                        </Badge>
                      </div>

                      <h3 className="mt-3 font-heading text-xl font-semibold leading-snug text-ink transition-colors duration-150 group-hover:text-brand-navy">
                        <Link href={`/news/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-muted-text">
                        {post.excerpt}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                        <span className="text-muted-text">
                          By <strong className="text-ink">{post.authorName}</strong>
                        </span>

                        <Link
                          href={`/news/${post.slug}`}
                          className="inline-flex items-center gap-1 font-semibold text-accent-cyan transition-colors duration-150 hover:text-accent-cyan-hover"
                        >
                          <span>Read Full Story</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Events Sidebar (Right 4 cols - mirroring CMU RI pattern) */}
            <div className="lg:col-span-4">
              <AnimatedSection delay={100}>
                <div className="rounded-xl border border-border bg-surface-muted p-6">
                  <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
                    <h3 className="flex items-center gap-2 font-heading text-base font-semibold text-ink">
                      <CalendarDays className="h-5 w-5 text-accent-cyan" />
                      Upcoming Events
                    </h3>
                    <Link
                      href="/events"
                      className="text-xs font-semibold text-accent-cyan hover:underline"
                    >
                      View All
                    </Link>
                  </div>

                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map((evt) => (
                        <div
                          key={evt.slug}
                          className="rounded-lg border border-border bg-surface p-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-brand-navy/10 font-mono text-[10px] text-brand-navy"
                            >
                              {eventTypeLabels[evt.type]}
                            </Badge>
                            <span className="font-mono text-xs font-semibold text-accent-cyan">
                              {evt.startAt.slice(0, 10)}
                            </span>
                          </div>

                          <h4 className="mt-2 font-heading text-sm font-semibold text-ink">
                            <Link href={`/events/${evt.slug}`} className="hover:underline">
                              {evt.title}
                            </Link>
                          </h4>

                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-text">
                            {evt.isOnline ? (
                              <>
                                <Globe className="h-3 w-3 text-accent-cyan" />
                                Online / Virtual
                              </>
                            ) : (
                              <>
                                <MapPin className="h-3 w-3 text-accent-cyan" />
                                {evt.location || 'KUET Campus'}
                              </>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs italic text-muted-text">
                      No upcoming events scheduled at this moment.
                    </p>
                  )}

                  {/* Past Events Link */}
                  <div className="mt-6 border-t border-border pt-4">
                    <Link
                      href="/events"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        'w-full'
                      )}
                    >
                      Browse Past Seminars & Talks
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
