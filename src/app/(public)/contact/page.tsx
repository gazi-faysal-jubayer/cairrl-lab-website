import type { Metadata } from 'next';
import { Mail, MapPin, Building2 } from 'lucide-react';
import { Container, SectionHeading } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { ContactForm } from '@/components/public/contact-form';
import { getSiteSettings } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with CAIRRL Lab at KUET. Send us a message or visit us at KUET campus in Khulna, Bangladesh.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const email = settings?.contactEmail ?? 'cairrl@kuet.ac.bd';
  const address = settings?.address ?? 'KUET, Khulna 9203, Bangladesh';

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Get in Touch
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Have a question about our research or interested in collaboration?
            We&apos;d love to hear from you.
          </p>
        </Container>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <SectionHeading
                  title="Send Us a Message"
                  description="Fill out the form below and we'll get back to you as soon as possible."
                />
                <ContactForm />
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={100}>
                <div className="space-y-6">
                  <div className="rounded-lg border border-border bg-surface-muted p-6">
                    <div className="mb-3 inline-flex rounded-lg bg-accent-cyan/10 p-2">
                      <Mail className="h-5 w-5 text-accent-cyan" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-ink">
                      Official Email
                    </h3>
                    <a
                      href={`mailto:${email}`}
                      className="mt-2 block text-sm text-accent-cyan transition-colors duration-150 hover:text-accent-cyan-hover"
                    >
                      {email}
                    </a>
                  </div>

                  <div className="rounded-lg border border-border bg-surface-muted p-6">
                    <div className="mb-3 inline-flex rounded-lg bg-accent-cyan/10 p-2">
                      <MapPin className="h-5 w-5 text-accent-cyan" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-ink">
                      Campus Coordinates
                    </h3>
                    <p className="mt-2 text-sm text-muted-text">
                      {address}
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-surface-muted p-6">
                    <div className="mb-3 inline-flex rounded-lg bg-accent-cyan/10 p-2">
                      <Building2 className="h-5 w-5 text-accent-cyan" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-ink">
                      Departments & Affiliation
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-muted-text">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                        Department of Mechanical Engineering
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                        Department of Mechatronics Engineering
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                        Khulna University of Engineering &amp; Technology (KUET)
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
