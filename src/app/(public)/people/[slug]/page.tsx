import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Mail,
  ExternalLink,
  GraduationCap,
  Building2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { people } from '@/lib/data/people-data';
import { cn } from '@/lib/utils';

// Generate static params for all people
export function generateStaticParams() {
  return people.map((person) => ({
    slug: person.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) return { title: 'Person Not Found' };

  const roleLabel =
    person.role === 'faculty'
      ? 'Faculty'
      : person.role === 'graduate'
        ? 'Graduate Researcher'
        : 'Undergraduate Researcher';

  return {
    title: person.name,
    description: `${person.name} — ${roleLabel} at CAIRRL Lab, KUET. ${person.researchInterests.length > 0 ? `Research interests: ${person.researchInterests.join(', ')}.` : ''}`,
  };
}

export default async function PersonProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) notFound();

  const roleLabel =
    person.role === 'faculty'
      ? 'Faculty'
      : person.role === 'graduate'
        ? 'Graduate Researcher'
        : 'Undergraduate Researcher';

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <Link
            href="/people"
            className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 transition-colors duration-150 hover:text-accent-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to People
          </Link>

          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* Photo */}
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-white/10 md:h-40 md:w-40">
              {person.photoUrl ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${person.photoUrl})` }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-16 w-16 text-white/30" strokeWidth={1} />
                </div>
              )}
            </div>

            {/* Name & Role */}
            <div>
              <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
                {roleLabel}
              </p>
              <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
                {person.name}
              </h1>

              {person.designation &&
                !person.designation.startsWith('[PLACEHOLDER') && (
                  <p className="mt-2 text-base text-white/70">
                    {person.designation}
                  </p>
                )}

              {person.department && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/50">
                  <Building2 className="h-3.5 w-3.5" />
                  {person.department}
                </p>
              )}

              {person.program &&
                !person.program.startsWith('[PLACEHOLDER') && (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/50">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {person.program}
                  </p>
                )}
            </div>
          </div>
        </Container>
      </section>

      {/* Details */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                {/* Bio */}
                <div>
                  <h2 className="font-heading text-xl font-semibold text-ink">
                    About
                  </h2>
                  {person.bio && !person.bio.startsWith('[PLACEHOLDER') ? (
                    <p className="mt-4 leading-relaxed text-muted-text">
                      {person.bio}
                    </p>
                  ) : (
                    <p className="mt-4 italic text-muted-text/60">
                      Bio will be added soon.
                    </p>
                  )}
                </div>

                {/* Research Interests */}
                {person.researchInterests.length > 0 && (
                  <div className="mt-10">
                    <h2 className="font-heading text-xl font-semibold text-ink">
                      Research Interests
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {person.researchInterests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="bg-accent-cyan/10 text-sm text-accent-cyan"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div>
              <AnimatedSection delay={100}>
                <div className="rounded-lg border border-border bg-surface-muted p-6">
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-text">
                    Links & Contact
                  </h3>

                  <div className="mt-4 space-y-3">
                    {person.googleScholarUrl && (
                      <a
                        href={person.googleScholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-accent-cyan transition-colors duration-150 hover:text-accent-cyan-hover"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Google Scholar
                      </a>
                    )}

                    {person.researchGateUrl && (
                      <a
                        href={person.researchGateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-accent-cyan transition-colors duration-150 hover:text-accent-cyan-hover"
                      >
                        <ExternalLink className="h-4 w-4" />
                        ResearchGate
                      </a>
                    )}

                    {person.linkedinUrl && (
                      <a
                        href={person.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-accent-cyan transition-colors duration-150 hover:text-accent-cyan-hover"
                      >
                        <ExternalLink className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}

                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="flex items-center gap-2 text-sm text-accent-cyan transition-colors duration-150 hover:text-accent-cyan-hover"
                      >
                        <Mail className="h-4 w-4" />
                        {person.email}
                      </a>
                    )}

                    {!person.googleScholarUrl &&
                      !person.researchGateUrl &&
                      !person.linkedinUrl &&
                      !person.email && (
                        <p className="text-sm italic text-muted-text/60">
                          Contact information will be added soon.
                        </p>
                      )}
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/people"
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-full'
                    )}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to People
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
