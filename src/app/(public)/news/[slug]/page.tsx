import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { newsPosts } from '@/lib/data/news-events-data';
import { siteConfig } from '@/lib/data/site-data';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return newsPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'News Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-brand-navy py-16 md:py-20">
        <Container className="max-w-4xl">
          <Link
            href="/news"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-accent-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News & Events
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-accent-cyan/20 text-xs font-semibold text-accent-cyan"
            >
              {post.category}
            </Badge>

            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <Calendar className="h-3.5 w-3.5 text-accent-cyan" />
              {post.publishedAt}
            </span>

            <span className="text-white/40">•</span>

            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <User className="h-3.5 w-3.5 text-accent-cyan" />
              {post.authorName}
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white md:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
            {post.excerpt}
          </p>
        </Container>
      </section>

      {/* ─── Article Body ─── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <AnimatedSection>
            <article className="prose prose-slate max-w-none text-ink [&_a]:font-medium [&_a]:text-accent-cyan [&_a]:underline hover:[&_a]:text-accent-cyan-hover [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted-text">
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </article>

            {/* Bottom bar */}
            <div className="mt-12 flex flex-wrap items-center justify-between border-t border-border pt-6">
              <div className="text-xs text-muted-text">
                Published by <strong className="text-ink">{post.authorName}</strong> — {siteConfig.name}
              </div>

              <Link
                href="/news"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' })
                )}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All News
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
