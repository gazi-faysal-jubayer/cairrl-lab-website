import type { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';
import { Container } from '@/components/shared';
import { AnimatedSection } from '@/components/shared/animated-section';
import { getNewsPosts } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news and updates from CAIRRL Lab at KUET.',
};

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <>
      <section className="bg-brand-navy py-16 md:py-20">
        <Container>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent-cyan">
            Updates
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">
            News
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Stay up to date with publications, events, and milestones from the lab.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 80}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="group block overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
                  >
                    <div className="aspect-video bg-brand-navy/5">
                      {post.coverImageUrl ? (
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundImage: `url(${post.coverImageUrl})` }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-navy/10 to-accent-cyan/5">
                          <Newspaper className="h-10 w-10 text-muted-text/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="font-mono text-xs text-muted-text">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <h3 className="mt-2 font-heading text-base font-semibold text-ink transition-colors group-hover:text-accent-cyan">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-text">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="rounded-lg border border-border bg-surface px-8 py-12 text-center">
                <Newspaper className="mx-auto h-10 w-10 text-muted-text/20" />
                <p className="mt-4 text-muted-text">No news posts published yet.</p>
                <p className="mt-1 text-sm text-muted-text/70">
                  Check back soon for research highlights and announcements.
                </p>
              </div>
            </AnimatedSection>
          )}
        </Container>
      </section>
    </>
  );
}
