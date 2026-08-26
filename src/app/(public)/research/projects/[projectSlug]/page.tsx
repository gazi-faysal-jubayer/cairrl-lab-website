import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/db/queries';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ projectSlug: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}): Promise<Metadata> {
  const { projectSlug } = await params;
  const project = await getProjectBySlug(projectSlug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.summary.slice(0, 160),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  const project = await getProjectBySlug(projectSlug);
  if (!project) notFound();

  return (
    <>
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <Link
            href="/research"
            className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-accent-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research
          </Link>

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className={
                project.status === 'ONGOING'
                  ? 'bg-accent-green/20 text-accent-green'
                  : project.status === 'COMPLETED'
                    ? 'bg-white/10 text-white/70'
                    : 'bg-amber-500/20 text-amber-300'
              }
            >
              {project.status}
            </Badge>
            {project.startDate && (
              <span className="flex items-center gap-1 text-xs text-white/50">
                <Calendar className="h-3 w-3" />
                {new Date(project.startDate).getFullYear()}
                {project.endDate && ` — ${new Date(project.endDate).getFullYear()}`}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold text-white md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-white/70 md:text-lg">
            {project.summary}
          </p>

          {project.researchAreas.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.researchAreas.map((area) => (
                <Link key={area.id} href={`/research/${area.slug}`}>
                  <Badge variant="secondary" className="bg-accent-cyan/20 text-accent-cyan">
                    {area.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="prose prose-gray max-w-none">
                  <h2 className="font-heading text-xl font-semibold text-ink">Description</h2>
                  <div
                    className="mt-4 text-muted-text leading-relaxed whitespace-pre-line"
                  >
                    {project.description}
                  </div>
                </div>
              </AnimatedSection>

              {project.publications.length > 0 && (
                <AnimatedSection delay={100}>
                  <div className="mt-12">
                    <h2 className="font-heading text-xl font-semibold text-ink">Related Publications</h2>
                    <div className="mt-4 space-y-3">
                      {project.publications.map((pub) => (
                        <div key={pub.id} className="rounded-lg border border-border p-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-accent-cyan/10 text-xs text-accent-cyan">
                              {pub.type}
                            </Badge>
                            <span className="font-mono text-xs text-muted-text">{pub.year}</span>
                          </div>
                          <h4 className="mt-1.5 text-sm font-semibold text-ink">{pub.title}</h4>
                          <p className="text-xs text-muted-text">{pub.authors}</p>
                          {pub.doiOrLink && (
                            <a
                              href={pub.doiOrLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs text-accent-cyan hover:underline"
                            >
                              <BookOpen className="h-3 w-3" /> View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            <div>
              <AnimatedSection delay={200}>
                <Link href="/research" className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Research
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
