import type { Metadata } from 'next';
import { Target, Eye, Building2, Lightbulb } from 'lucide-react';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getSiteSettings } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about CAIRRL Lab at KUET — our mission, vision, and research philosophy.',
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const labName = settings?.labFullName ?? 'Centre for Advanced Intelligent Robotics Research Laboratory';
  const mission = settings?.missionStatement ?? 'To advance the frontiers of robotics, control systems, and intelligent mechatronics through rigorous interdisciplinary research.';

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            About the Lab
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            {labName}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            An interdisciplinary research lab bridging Mechanical Engineering and
            Mechatronics Engineering at KUET.
          </p>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedSection>
              <div className="rounded-lg border border-border bg-surface p-8">
                <div className="mb-4 inline-flex rounded-lg bg-accent-cyan/10 p-3">
                  <Target className="h-6 w-6 text-accent-cyan" />
                </div>
                <h2 className="font-heading text-xl font-semibold text-ink">Our Mission</h2>
                <p className="mt-3 leading-relaxed text-muted-text">{mission}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="rounded-lg border border-border bg-surface p-8">
                <div className="mb-4 inline-flex rounded-lg bg-accent-cyan/10 p-3">
                  <Eye className="h-6 w-6 text-accent-cyan" />
                </div>
                <h2 className="font-heading text-xl font-semibold text-ink">Our Vision</h2>
                <p className="mt-3 leading-relaxed text-muted-text">
                  To become a leading interdisciplinary research hub in Bangladesh for robotics,
                  automation, and intelligent systems — nurturing the next generation of engineers
                  and researchers who will shape the future of technology.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Founding Story & Affiliation */}
      <section className="bg-surface-muted py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <AnimatedSection>
              <div>
                <SectionHeading
                  title="Our Story"
                  description="Founded in 2026, CAIRRL Lab is one of the newest interdisciplinary research initiatives at KUET."
                />
                <div className="space-y-4 text-muted-text">
                  <p>
                    CAIRRL Lab — the Centre for Advanced Intelligent Robotics Research
                    Laboratory — was established to bring together expertise in
                    mechanical engineering and mechatronics engineering under one research
                    umbrella.
                  </p>
                  <p>
                    Our founding faculty members recognized that the most impactful
                    robotics and automation research happens at the intersection of
                    disciplines: control theory, mechanical design, embedded systems,
                    computer vision, and intelligent systems.
                  </p>
                  <p>
                    Starting with a core team of two faculty members and five student
                    researchers, CAIRRL is committed to growing into a leading research
                    hub for robotics and intelligent systems in Bangladesh.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-surface p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-accent-cyan/10 p-2">
                    <Building2 className="h-5 w-5 text-accent-cyan" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-ink">
                    Institutional Affiliation
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-text">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                      Department of Mechanical Engineering
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                      Department of Mechatronics Engineering
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                      Khulna University of Engineering &amp; Technology (KUET)
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-surface p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-accent-cyan/10 p-2">
                    <Lightbulb className="h-5 w-5 text-accent-cyan" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-ink">
                    Research Philosophy
                  </h3>
                  <p className="mt-3 text-sm text-muted-text">
                    We believe in rigorous, interdisciplinary research that bridges
                    theory and practice. Our work spans robotics, control systems,
                    mechatronics, additive manufacturing, aerial robotics, industrial
                    automation, and IoT — always with a focus on real-world applicability.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  );
}
