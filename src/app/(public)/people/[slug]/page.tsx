import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  ExternalLink,
  GraduationCap,
  Building2,
  BookOpen,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import {
  getFacultyBySlug,
  getStudentBySlug,
  getAllPeopleSlugs,
  getPublications,
} from '@/lib/db/queries';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  const slugs = await getAllPeopleSlugs();
  return slugs.map((slug) => ({ slug }));
}

type PersonData = {
  slug: string;
  name: string;
  photoUrl: string | null;
  bio: string | null;
  email: string | null;
  googleScholarUrl: string | null;
  researchGateUrl?: string | null;
  linkedinUrl: string | null;
  researchAreas: { id: string; name: string; slug: string }[];
  role: 'faculty' | 'graduate' | 'undergraduate';
  designation?: string;
  department?: string;
  program?: string | null;
};

async function getPersonData(slug: string): Promise<PersonData | null> {
  const faculty = await getFacultyBySlug(slug);
  if (faculty) {
    return {
      slug: faculty.slug,
      name: faculty.name,
      photoUrl: faculty.photoUrl,
      bio: faculty.bio,
      email: faculty.email,
      googleScholarUrl: faculty.googleScholarUrl,
      researchGateUrl: faculty.researchGateUrl,
      linkedinUrl: faculty.linkedinUrl,
      researchAreas: faculty.researchAreas,
      role: 'faculty',
      designation: faculty.designation,
      department: faculty.department,
    };
  }

  const student = await getStudentBySlug(slug);
  if (student) {
    return {
      slug: student.slug,
      name: student.name,
      photoUrl: student.photoUrl,
      bio: student.bio,
      email: student.email,
      googleScholarUrl: student.googleScholarUrl,
      linkedinUrl: student.linkedinUrl,
      researchAreas: student.researchAreas,
      role: student.level === 'GRAD' ? 'graduate' : 'undergraduate',
      program: student.program,
    };
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = await getPersonData(slug);
  if (!person) return { title: 'Person Not Found' };

  const roleLabel =
    person.role === 'faculty'
      ? 'Faculty'
      : person.role === 'graduate'
        ? 'Graduate Researcher'
        : 'Undergraduate Researcher';

  return {
    title: person.name,
    description: `${person.name} — ${roleLabel} at CAIRRL Lab, KUET. ${person.researchAreas.length > 0 ? `Research interests: ${person.researchAreas.map((a) => a.name).join(', ')}.` : ''}`,
  };
}

function nameToColor(name: string) {
  const colors = [
    'from-cyan-600 to-blue-700',
    'from-emerald-600 to-teal-700',
    'from-violet-600 to-purple-700',
    'from-amber-600 to-orange-700',
    'from-rose-600 to-pink-700',
    'from-sky-600 to-indigo-700',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default async function PersonProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = await getPersonData(slug);
  if (!person) notFound();

  // Find publications that mention this person's name
  const allPublications = await getPublications();
  const personPublications = allPublications.filter((pub) =>
    pub.authors.toLowerCase().includes(person.name.split(' ').pop()?.toLowerCase() ?? '')
  );

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
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl md:h-40 md:w-40">
              {person.photoUrl ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${person.photoUrl})` }}
                />
              ) : (
                <div
                  className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${nameToColor(person.name)}`}
                >
                  <span className="font-heading text-4xl font-bold text-white">
                    {getInitials(person.name)}
                  </span>
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

              {person.designation && (
                <p className="mt-2 text-base text-white/70">{person.designation}</p>
              )}

              {person.department && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/50">
                  <Building2 className="h-3.5 w-3.5" />
                  {person.department}
                </p>
              )}

              {person.program && (
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
                  <h2 className="font-heading text-xl font-semibold text-ink">About</h2>
                  {person.bio ? (
                    <p className="mt-4 leading-relaxed text-muted-text">{person.bio}</p>
                  ) : (
                    <p className="mt-4 italic text-muted-text/60">
                      Bio will be added soon.
                    </p>
                  )}
                </div>

                {/* Research Interests */}
                {person.researchAreas.length > 0 && (
                  <div className="mt-10">
                    <h2 className="font-heading text-xl font-semibold text-ink">
                      Research Interests
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {person.researchAreas.map((area) => (
                        <Link
                          key={area.id}
                          href={`/research/${area.slug}`}
                          className="transition-colors duration-150 hover:opacity-80"
                        >
                          <Badge
                            variant="secondary"
                            className="bg-accent-cyan/10 text-sm text-accent-cyan"
                          >
                            {area.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Publications by this person */}
                {personPublications.length > 0 && (
                  <div className="mt-10">
                    <h2 className="font-heading text-xl font-semibold text-ink">
                      Publications
                    </h2>
                    <div className="mt-4 space-y-3">
                      {personPublications.map((pub) => (
                        <div
                          key={pub.id}
                          className="rounded-lg border border-border bg-surface-muted p-4"
                        >
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-accent-cyan/10 text-[10px] text-accent-cyan"
                            >
                              {pub.type}
                            </Badge>
                            <span className="font-mono text-xs text-muted-text">
                              {pub.year}
                            </span>
                          </div>
                          <h4 className="mt-1.5 text-sm font-semibold leading-snug text-ink">
                            {pub.title}
                          </h4>
                          <p className="mt-0.5 text-xs text-muted-text">{pub.authors}</p>
                          <p className="text-xs italic text-muted-text/70">{pub.venue}</p>
                          {pub.doiOrLink && (
                            <a
                              href={pub.doiOrLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs text-accent-cyan hover:underline"
                            >
                              <BookOpen className="h-3 w-3" />
                              View Publication
                            </a>
                          )}
                        </div>
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
                    className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
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
