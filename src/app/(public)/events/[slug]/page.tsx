import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Globe,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { events, eventTypeLabels } from '@/lib/data/news-events-data';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return events.map((evt) => ({
    slug: evt.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const evt = events.find((e) => e.slug === slug);
  if (!evt) return { title: 'Event Not Found' };

  return {
    title: `${evt.title} — Event`,
    description: evt.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const evt = events.find((e) => e.slug === slug);
  if (!evt) notFound();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container className="max-w-4xl">
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-accent-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Events
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-accent-cyan/20 text-xs font-semibold text-accent-cyan"
            >
              {eventTypeLabels[evt.type]}
            </Badge>

            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <Calendar className="h-3.5 w-3.5 text-accent-cyan" />
              {evt.startAt.slice(0, 10)}
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white md:text-4xl">
            {evt.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent-cyan" />
              <span>Time: {evt.startAt.slice(11, 16) || '10:00 AM'}</span>
            </div>

            <span>•</span>

            <div className="flex items-center gap-2">
              {evt.isOnline ? (
                <>
                  <Globe className="h-4 w-4 text-accent-cyan" />
                  <span>Virtual / Online Meeting</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 text-accent-cyan" />
                  <span>{evt.location}</span>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Event Content ─── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <AnimatedSection>
            <div>
              <h2 className="font-heading text-xl font-semibold text-ink">
                Event Description & Schedule
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-text">
                {evt.description}
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-border bg-surface-muted p-6">
              <h3 className="font-heading text-base font-semibold text-ink">
                Location & Access Info
              </h3>
              <p className="mt-2 text-sm text-muted-text">
                {evt.isOnline
                  ? 'Access link and virtual credentials will be shared with registered attendees and KUET community members prior to the session.'
                  : `This event takes place in person at ${evt.location}. Open to faculty, students, and invited researchers.`}
              </p>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between border-t border-border pt-6">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: 'sm' }),
                  'bg-brand-navy text-white hover:bg-brand-navy-hover'
                )}
              >
                Inquire about this Event
              </Link>

              <Link
                href="/events"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' })
                )}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
