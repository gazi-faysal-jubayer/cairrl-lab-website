import type { Metadata } from 'next';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { PersonCard } from '@/components/public/person-card';
import {
  faculty,
  graduateStudents,
  undergraduateStudents,
} from '@/lib/data/people-data';

export const metadata: Metadata = {
  title: 'People',
  description:
    'Meet the faculty and student researchers of CAIRRL Lab at KUET — our team bridging Mechanical and Mechatronics Engineering.',
};

export default function PeoplePage() {
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
            The researchers and students driving CAIRRL Lab&apos;s work in robotics,
            control, and intelligent systems.
          </p>
        </Container>
      </section>

      {/* Faculty */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Faculty"
              description="Our founding faculty members lead the lab's research direction and mentor student researchers."
            />
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((person, i) => (
              <AnimatedSection key={person.slug} delay={i * 100}>
                <PersonCard person={person} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Graduate Students */}
      {graduateStudents.length > 0 && (
        <section className="bg-surface-muted py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Graduate Student Researchers"
                description="Graduate students pursuing advanced research in our focus areas."
              />
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {graduateStudents.map((person, i) => (
                <AnimatedSection key={person.slug} delay={i * 100}>
                  <PersonCard person={person} />
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Undergraduate Students */}
      {undergraduateStudents.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Undergraduate Student Researchers"
                description="Undergraduate students contributing to ongoing research and building their skills."
              />
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {undergraduateStudents.map((person, i) => (
                <AnimatedSection key={person.slug} delay={i * 100}>
                  <PersonCard person={person} />
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
