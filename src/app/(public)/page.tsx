import Link from 'next/link';
import { ArrowRight, Users, FlaskConical, BookOpen, Cpu } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { siteConfig, quickStats } from '@/lib/data/site-data';
import { StatsStrip } from '@/components/public/stats-strip';
import { cn } from '@/lib/utils';

const researchHighlights = [
  {
    icon: Cpu,
    title: 'Robotics & Control',
    description:
      'Developing advanced control algorithms for robotic manipulators, mobile robots, and autonomous systems.',
  },
  {
    icon: FlaskConical,
    title: 'Mechatronics Systems',
    description:
      'Integrating mechanical, electronic, and computational engineering for smart systems design.',
  },
  {
    icon: BookOpen,
    title: 'Additive Manufacturing',
    description:
      'Exploring 3D printing technologies and their applications in rapid prototyping and manufacturing.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-brand-navy">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <Container className="relative py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
              {siteConfig.institution}
            </p>

            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3rem] lg:leading-[1.1]">
              {siteConfig.name}
            </h1>

            <p className="mt-2 font-heading text-lg text-white/60 md:text-xl">
              {siteConfig.fullName}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {siteConfig.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/people"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-accent-cyan text-white hover:bg-accent-cyan-hover'
                )}
              >
                <Users className="mr-2 h-4 w-4" />
                Meet the Team
              </Link>
              <Link
                href="/research"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-white/20 text-white hover:bg-white/10 hover:text-white'
                )}
              >
                Explore Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Quick Stats ─── */}
      <StatsStrip stats={quickStats} />

      {/* ─── Research Highlights ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Research Focus Areas"
              description="Our lab works at the intersection of robotics, control systems, and intelligent mechatronics."
            />
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchHighlights.map((area, i) => (
              <AnimatedSection key={area.title} delay={i * 100}>
                <div className="group rounded-lg border border-border bg-surface p-6 transition-shadow duration-200 hover:shadow-md">
                  <div className="mb-4 inline-flex rounded-lg bg-accent-cyan/10 p-3">
                    <area.icon className="h-6 w-6 text-accent-cyan" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-text">
                    {area.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-10 text-center">
              <Link
                href="/research"
                className={cn(buttonVariants({ variant: 'outline' }))}
              >
                View All Research Areas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ─── Latest News (Placeholder) ─── */}
      <section className="bg-surface-muted py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Latest News"
              description="Updates from CAIRRL Lab — new publications, events, and milestones."
            />
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="rounded-lg border border-border bg-surface px-8 py-12 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-muted-text/30" />
              <p className="mt-4 text-muted-text">
                News and updates will appear here as the lab publishes them.
              </p>
              <p className="mt-1 text-sm text-muted-text/70">
                Check back soon for research highlights, event announcements, and more.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <div className="rounded-2xl bg-brand-navy px-8 py-12 text-center md:px-16 md:py-16">
              <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                Interested in Robotics Research?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-white/70">
                We&apos;re always looking for motivated undergraduate and graduate students
                to join our research team.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/join-us"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'bg-accent-cyan text-white hover:bg-accent-cyan-hover'
                  )}
                >
                  Learn How to Join
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'border-white/20 text-white hover:bg-white/10 hover:text-white'
                  )}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
