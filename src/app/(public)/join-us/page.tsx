import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Users, Mail, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { siteConfig } from '@/lib/data/site-data';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Join Us',
  description: `Join CAIRRL Lab at ${siteConfig.institution} — learn how to become a research student in our robotics and mechatronics lab.`,
};

export default function JoinUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Join the Lab
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Become Part of CAIRRL
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            We&apos;re always looking for motivated students who are passionate about
            robotics, control systems, and intelligent mechatronics.
          </p>
        </Container>
      </section>

      {/* Opportunities */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="How to Join"
              description="CAIRRL Lab welcomes undergraduate and graduate students from KUET who are interested in hands-on research."
            />
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={100}>
              <div className="rounded-lg border border-border bg-surface p-8">
                <div className="mb-4 inline-flex rounded-lg bg-accent-cyan/10 p-3">
                  <GraduationCap className="h-6 w-6 text-accent-cyan" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-ink">
                  Thesis Students
                </h3>
                <p className="mt-3 text-muted-text">
                  If you&apos;re an undergraduate or graduate student at KUET looking to
                  complete your thesis in robotics, control, mechatronics, or related
                  areas, CAIRRL Lab may be the right fit.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-text">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                    Work directly with faculty advisors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                    Access lab equipment and resources
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                    Potential for publication in your research area
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="rounded-lg border border-border bg-surface p-8">
                <div className="mb-4 inline-flex rounded-lg bg-accent-cyan/10 p-3">
                  <Users className="h-6 w-6 text-accent-cyan" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-ink">
                  Research Assistants
                </h3>
                <p className="mt-3 text-muted-text">
                  Even if you&apos;re not at the thesis stage yet, we welcome motivated
                  students who want to contribute to ongoing projects and develop their
                  research skills.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-text">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                    Learn research methodologies hands-on
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                    Collaborate with peers on real projects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                    Build a foundation for future graduate studies
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-surface-muted py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <div className="mx-auto max-w-2xl text-center">
              <Mail className="mx-auto h-10 w-10 text-accent-cyan" />
              <h2 className="mt-6 font-heading text-2xl font-semibold text-ink">
                Get in Touch
              </h2>
              <p className="mt-4 text-muted-text">
                Interested in joining CAIRRL Lab? Reach out to us via the contact form
                or email us directly. We&apos;d love to hear about your research interests
                and discuss potential opportunities.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'bg-brand-navy text-white hover:bg-brand-navy-hover'
                  )}
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/people"
                  className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
                >
                  Meet Our Team
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
