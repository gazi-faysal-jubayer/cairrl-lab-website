import type { Metadata } from 'next';
import Link from 'next/link';
import { User, Mail, ExternalLink, GraduationCap, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getFacultyMembers, getStudentMembers } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: 'People',
  description:
    'Meet the faculty and student researchers at CAIRRL Lab — Centre for Advanced Intelligent Robotics Research Laboratory, KUET.',
};

// Deterministic color based on name for avatar placeholders
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
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default async function PeoplePage() {
  const [faculty, students] = await Promise.all([
    getFacultyMembers(),
    getStudentMembers(),
  ]);

  const gradStudents = students.filter((s) => s.level === 'GRAD');
  const undergradStudents = students.filter((s) => s.level === 'UNDERGRAD');

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Our Team
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            People
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Meet the faculty and researchers driving innovation at CAIRRL Lab.
          </p>
        </Container>
      </section>

      {/* Faculty */}
      {faculty.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Faculty"
                description="Our founding faculty members bring expertise from Mechanical and Mechatronics Engineering."
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
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                      {member.photoUrl ? (
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${member.photoUrl})` }}
                        />
                      ) : (
                        <div
                          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${nameToColor(member.name)}`}
                        >
                          <span className="font-heading text-2xl font-bold text-white">
                            {getInitials(member.name)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-accent-cyan">
                        Faculty
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-semibold text-ink transition-colors duration-150 group-hover:text-accent-cyan">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-text">
                        {member.designation}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-muted-text/70">
                        <Building2 className="h-3 w-3" />
                        {member.department}
                      </p>

                      {member.researchAreas.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {member.researchAreas.map((area) => (
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

                      <div className="mt-3 flex items-center gap-3">
                        {member.email && (
                          <Mail className="h-3.5 w-3.5 text-muted-text/50" />
                        )}
                        {member.googleScholarUrl && (
                          <ExternalLink className="h-3.5 w-3.5 text-muted-text/50" />
                        )}
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Graduate Students */}
      {gradStudents.length > 0 && (
        <section className="bg-surface-muted py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Graduate Researchers"
                description="M.Sc. and Ph.D. students conducting advanced research."
              />
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gradStudents.map((member, i) => (
                <AnimatedSection key={member.id} delay={i * 100}>
                  <Link
                    href={`/people/${member.slug}`}
                    className="group block rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                        {member.photoUrl ? (
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${member.photoUrl})` }}
                          />
                        ) : (
                          <div
                            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${nameToColor(member.name)}`}
                          >
                            <span className="font-heading text-lg font-bold text-white">
                              {getInitials(member.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-ink transition-colors duration-150 group-hover:text-accent-cyan">
                          {member.name}
                        </h3>
                        {member.program && (
                          <p className="flex items-center gap-1 text-xs text-muted-text">
                            <GraduationCap className="h-3 w-3" />
                            {member.program}
                          </p>
                        )}
                      </div>
                    </div>

                    {member.researchAreas.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {member.researchAreas.map((area) => (
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
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Undergraduate Students */}
      {undergradStudents.length > 0 && (
        <section className={gradStudents.length > 0 ? 'py-16 md:py-24' : 'bg-surface-muted py-16 md:py-24'}>
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Undergraduate Researchers"
                description="B.Sc. students contributing to active lab research projects."
              />
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {undergradStudents.map((member, i) => (
                <AnimatedSection key={member.id} delay={i * 80}>
                  <Link
                    href={`/people/${member.slug}`}
                    className="group block rounded-lg border border-border bg-surface p-5 text-center transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
                  >
                    <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                      {member.photoUrl ? (
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${member.photoUrl})` }}
                        />
                      ) : (
                        <div
                          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${nameToColor(member.name)}`}
                        >
                          <span className="font-heading text-lg font-bold text-white">
                            {getInitials(member.name)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="mt-3 font-heading text-sm font-semibold text-ink transition-colors duration-150 group-hover:text-accent-cyan">
                      {member.name}
                    </h3>
                    {member.program && (
                      <p className="mt-0.5 text-xs text-muted-text">{member.program}</p>
                    )}
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Empty state */}
      {faculty.length === 0 && students.length === 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <div className="rounded-lg border border-border bg-surface px-8 py-12 text-center">
              <User className="mx-auto h-10 w-10 text-muted-text/30" strokeWidth={1} />
              <p className="mt-4 text-muted-text">
                Team member profiles will appear here once added.
              </p>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
