import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Users, Mail, CheckCircle2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getSiteSettings } from '@/lib/db/queries';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Join Us',
  description: 'Join CAIRRL Lab at KUET — learn how to become a thesis researcher or research assistant in our robotics and mechatronics lab.',
};

export default async function JoinUsPage() {
  const settings = await getSiteSettings();
  const email = settings?.contactEmail ?? 'cairrl@kuet.ac.bd';

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
            We&apos;re always looking for motivated undergraduate and graduate students who are passionate about
            robotics, control systems, and intelligent mechatronics at KUET.
          </p>
        </Container>
      </section>

      {/* Opportunities */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Research Opportunities"
              description="CAIRRL Lab welcomes undergraduate and graduate researchers from KUET across Mechanical and Mechatronics Engineering."
            />
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Thesis Students */}
            <AnimatedSection delay={100}>
              <div className="rounded-xl border border-border bg-surface p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex rounded-lg bg-accent-cyan/10 p-3">
                  <GraduationCap className="h-6 w-6 text-accent-cyan" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink">
                  Undergraduate &amp; Graduate Thesis
                </h3>
                <p className="mt-3 leading-relaxed text-muted-text">
                  If you are a 3rd/4th year undergraduate or M.Sc./Ph.D. student at KUET looking to
                  conduct your thesis in robotics, control algorithms, UAV flight dynamics, additive manufacturing,
                  or industrial automation, CAIRRL provides faculty mentorship and hands-on laboratory resources.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted-text">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                    <span>Direct mentorship under Prof. Md. Helal-An-Nahiyan and Asst. Prof. Priyo Nath Roy</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                    <span>Access to robotics manipulators, embedded platforms, sensors, and 3D printing equipment</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                    <span>Opportunity to co-author papers in prestigious IEEE, ASME, and Elsevier journals/conferences</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            {/* Research Assistants */}
            <AnimatedSection delay={200}>
              <div className="rounded-xl border border-border bg-surface p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex rounded-lg bg-accent-cyan/10 p-3">
                  <Users className="h-6 w-6 text-accent-cyan" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink">
                  Student Research Assistants
                </h3>
                <p className="mt-3 leading-relaxed text-muted-text">
                  Early-stage undergraduate students (1st &amp; 2nd year) who demonstrate strong motivation in
                  robotics programming, computer vision, mathematical modeling, or CAD design can join active
                  research projects to build foundational research skills.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted-text">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                    <span>Gain practical experience in ROS/ROS2, Python, MATLAB/Simulink, and embedded C/C++</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                    <span>Collaborate closely with senior graduate researchers on active experimental setups</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                    <span>Build a competitive profile for future international graduate school applications</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* How to Apply / FAQ */}
      <section className="bg-surface-muted py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Application Steps"
              description="Simple guidelines on how to introduce yourself and your research interests."
            />
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-3">
            <AnimatedSection delay={100}>
              <div className="rounded-lg border border-border bg-surface p-6">
                <span className="font-mono text-2xl font-bold text-accent-cyan">01</span>
                <h4 className="mt-2 font-heading text-base font-semibold text-ink">Review Research</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-text">
                  Explore our <Link href="/research" className="text-accent-cyan hover:underline">Research Focus Areas</Link> and recent faculty publications to identify projects aligned with your interests.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="rounded-lg border border-border bg-surface p-6">
                <span className="font-mono text-2xl font-bold text-accent-cyan">02</span>
                <h4 className="mt-2 font-heading text-base font-semibold text-ink">Prepare Your Profile</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-text">
                  Prepare a concise CV highlighting your department, student ID, CGPA, programming skills, relevant coursework, and any robotics project experience.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="rounded-lg border border-border bg-surface p-6">
                <span className="font-mono text-2xl font-bold text-accent-cyan">03</span>
                <h4 className="mt-2 font-heading text-base font-semibold text-ink">Get in Touch</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-text">
                  Send a brief introductory email to <a href={`mailto:${email}`} className="text-accent-cyan hover:underline">{email}</a> or submit a message through our Contact page.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-accent-cyan text-white hover:bg-accent-cyan-hover'
                )}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Lab Coordinators
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
