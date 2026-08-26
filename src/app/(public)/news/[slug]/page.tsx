import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getNewsPostBySlug, getAllNewsSlugs } from '@/lib/db/queries';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt.slice(0, 160) };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <Link
            href="/news"
            className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-accent-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <h1 className="mt-4 font-heading text-3xl font-semibold text-white md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-white/70">{post.excerpt}</p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <div className="mx-auto max-w-3xl">
              <div
                className="prose prose-gray max-w-none leading-relaxed text-muted-text"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />

              <div className="mt-12">
                <Link href="/news" className={cn(buttonVariants({ variant: 'outline' }))}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
