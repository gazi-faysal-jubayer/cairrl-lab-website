import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getEvents } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events at CAIRRL Lab — seminars, workshops, talks, and defenses.',
};

export default async function EventsPage() {
  const events = await getEvents();
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.startAt) >= now);
  const past = events.filter((e) => new Date(e.startAt) < now);

  return (
    <>
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Calendar
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Events
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Seminars, workshops, and talks from the lab.
          </p>
        </Container>
      </section>

      {/* Upcoming */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Upcoming Events"
              description={upcoming.length > 0 ? 'Events happening soon.' : undefined}
            />
          </AnimatedSection>

          {upcoming.length > 0 ? (
            <div className="space-y-4">
              {upcoming.map((event, i) => {
                const date = new Date(event.startAt);
                return (
                  <AnimatedSection key={event.id} delay={i * 80}>
                    <Link
                      href={`/events/${event.slug}`}
                      className="group flex gap-5 rounded-lg border border-border bg-surface p-5 transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg"
                    >
                      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-navy text-white">
                        <span className="font-mono text-xs uppercase">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="font-heading text-2xl font-bold">{date.getDate()}</span>
                        <span className="font-mono text-[10px] text-white/50">{date.getFullYear()}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-accent-cyan/10 text-xs text-accent-cyan">{event.type}</Badge>
                          {event.isOnline && <Badge variant="secondary" className="bg-emerald-500/10 text-xs text-emerald-600"><Globe className="mr-1 h-3 w-3" /> Online</Badge>}
                        </div>
                        <h3 className="mt-2 font-heading text-lg font-semibold text-ink group-hover:text-accent-cyan transition-colors">{event.title}</h3>
                        {event.location && (
                          <p className="mt-1 flex items-center gap-1 text-sm text-muted-text">
                            <MapPin className="h-3.5 w-3.5" /> {event.location}
                          </p>
                        )}
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-text">
                          <Calendar className="h-3 w-3" />
                          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                          {' at '}
                          {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </p>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <AnimatedSection>
              <div className="rounded-lg border border-border bg-surface px-8 py-12 text-center">
                <Calendar className="mx-auto h-10 w-10 text-muted-text/20" />
                <p className="mt-4 text-muted-text">No upcoming events scheduled.</p>
              </div>
            </AnimatedSection>
          )}
        </Container>
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="bg-surface-muted py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading title="Past Events" />
            </AnimatedSection>

            <div className="space-y-3">
              {past.map((event) => {
                const date = new Date(event.startAt);
                return (
                  <AnimatedSection key={event.id}>
                    <Link
                      href={`/events/${event.slug}`}
                      className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-surface-muted text-muted-text">
                        <span className="font-mono text-[10px] uppercase">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="font-heading text-base font-bold">{date.getDate()}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-ink group-hover:text-accent-cyan transition-colors">{event.title}</h3>
                        <p className="text-xs text-muted-text">{event.type} • {date.getFullYear()}</p>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
