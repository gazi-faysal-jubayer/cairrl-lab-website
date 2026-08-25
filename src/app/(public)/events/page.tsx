import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { events, eventTypeLabels } from '@/lib/data/news-events-data';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Seminars, guest lectures, technical workshops, and thesis defense presentations at CAIRRL Lab, KUET.',
};

export default function EventsDirectoryPage() {
  const now = new Date().toISOString().slice(0, 10);
  const upcomingEvents = events.filter((e) => e.startAt.slice(0, 10) >= now);
  const pastEvents = events.filter((e) => e.startAt.slice(0, 10) < now);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Seminars & Workshops
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Lab Events & Talks
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Join our academic seminars, robotics workshops, and technical presentations
            hosted on campus and online.
          </p>
        </Container>
      </section>

      {/* ─── Upcoming Events ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Upcoming Events"
              description="Scheduled talks, defense sessions, and workshops open to researchers and students."
            />
          </AnimatedSection>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingEvents.map((evt, i) => (
                <AnimatedSection key={evt.slug} delay={i * 100}>
                  <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-7 shadow-sm transition-all duration-150 hover:border-accent-cyan/40 hover:shadow-md">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-brand-navy/10 font-mono text-xs text-brand-navy"
                      >
                        {eventTypeLabels[evt.type]}
                      </Badge>

                      <span className="font-mono text-xs font-bold text-accent-cyan">
                        {evt.startAt.slice(0, 10)}
                      </span>
                    </div>

                    <h3 className="mt-3 font-heading text-xl font-semibold text-ink">
                      <Link href={`/events/${evt.slug}`} className="hover:underline">
                        {evt.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-text">
                      {evt.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-text">
                      <div className="flex items-center gap-1.5">
                        {evt.isOnline ? (
                          <>
                            <Globe className="h-3.5 w-3.5 text-accent-cyan" />
                            <span>Online / Virtual Seminar</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-3.5 w-3.5 text-accent-cyan" />
                            <span>{evt.location}</span>
                          </>
                        )}
                      </div>

                      <Link
                        href={`/events/${evt.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-accent-cyan hover:underline"
                      >
                        <span>Details & Schedule</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface px-8 py-12 text-center text-muted-text">
              No upcoming events currently scheduled. Check back soon!
            </div>
          )}
        </Container>
      </section>

      {/* ─── Past Events ─── */}
      <section className="bg-surface-muted py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Past Events & Archive"
              description="Review previous talks and workshops conducted by CAIRRL Lab."
            />
          </AnimatedSection>

          {pastEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((evt, i) => (
                <AnimatedSection key={evt.slug} delay={i * 80}>
                  <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-xs">
                        {eventTypeLabels[evt.type]}
                      </Badge>
                      <span className="font-mono text-xs text-muted-text">
                        {evt.startAt.slice(0, 10)}
                      </span>
                    </div>

                    <h3 className="mt-3 font-heading text-base font-semibold text-ink">
                      <Link href={`/events/${evt.slug}`} className="hover:underline">
                        {evt.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-muted-text">
                      {evt.description}
                    </p>

                    <div className="mt-auto pt-4">
                      <Link
                        href={`/events/${evt.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan hover:underline"
                      >
                        <span>View Recap</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-muted-text">No past events recorded yet.</p>
          )}
        </Container>
      </section>
    </>
  );
}
