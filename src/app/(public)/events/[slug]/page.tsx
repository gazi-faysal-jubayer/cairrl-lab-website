import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getEventBySlug, getAllEventSlugs } from '@/lib/db/queries';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: 'Event Not Found' };
  return { title: event.title, description: event.description.slice(0, 160) };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const date = new Date(event.startAt);

  return (
    <>
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-accent-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-accent-cyan/20 text-accent-cyan">{event.type}</Badge>
            {event.isOnline && (
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300">
                <Globe className="mr-1 h-3 w-3" /> Online
              </Badge>
            )}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold text-white md:text-4xl">
            {event.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              {' at '}
              {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {event.location}
              </span>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <div className="mx-auto max-w-3xl">
              <div
                className="prose prose-gray max-w-none leading-relaxed text-muted-text"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />

              <div className="mt-12">
                <Link href="/events" className={cn(buttonVariants({ variant: 'outline' }))}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
