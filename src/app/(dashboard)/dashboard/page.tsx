import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  FlaskConical,
  BookOpen,
  Newspaper,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { people } from '@/lib/data/people-data';
import { researchAreas, projects } from '@/lib/data/research-data';
import { publications } from '@/lib/data/publications-data';
import { newsPosts, events } from '@/lib/data/news-events-data';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Dashboard Overview',
};

export default function DashboardOverviewPage() {
  const metricCards = [
    {
      title: 'Lab Members',
      count: people.length,
      label: '2 Faculty, 5 Students',
      href: '/dashboard/people',
      icon: Users,
      color: 'text-accent-cyan',
      bgColor: 'bg-accent-cyan/10',
    },
    {
      title: 'Research Areas',
      count: researchAreas.length,
      label: `${projects.length} Active Projects`,
      href: '/dashboard/research',
      icon: FlaskConical,
      color: 'text-accent-green',
      bgColor: 'bg-accent-green/10',
    },
    {
      title: 'Publications',
      count: publications.length,
      label: 'Peer-Reviewed & Preprints',
      href: '/dashboard/publications',
      icon: BookOpen,
      color: 'text-brand-navy',
      bgColor: 'bg-brand-navy/10',
    },
    {
      title: 'News & Events',
      count: newsPosts.length + events.length,
      label: `${newsPosts.length} News, ${events.length} Events`,
      href: '/dashboard/news',
      icon: Newspaper,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink md:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-muted-text">
            Welcome to CAIRRL Lab Content Management & Operations.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/dashboard/publications"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'bg-brand-navy text-white hover:bg-brand-navy-hover'
            )}
          >
            <PlusCircle className="mr-1.5 h-4 w-4" />
            Add Publication
          </Link>
          <Link
            href="/dashboard/news"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' })
            )}
          >
            <PlusCircle className="mr-1.5 h-4 w-4" />
            Post News Update
          </Link>
        </div>
      </div>

      {/* ─── Metric Cards ─── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-150 hover:border-accent-cyan/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-text">
                  {card.title}
                </span>
                <div className={cn('rounded-lg p-2.5', card.bgColor, card.color)}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4">
                <p className="font-mono text-3xl font-bold tracking-tight text-ink">
                  {card.count}
                </p>
                <p className="mt-1 text-xs text-muted-text">{card.label}</p>
              </div>

              <div className="mt-4 flex items-center gap-1 border-t border-border pt-3 text-xs font-semibold text-accent-cyan group-hover:underline">
                <span>Manage {card.title}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── Recent Lab Activity & Content Quick Panels ─── */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Publications */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-ink">
              <BookOpen className="h-4 w-4 text-accent-cyan" />
              Recent Publications
            </h2>
            <Link
              href="/dashboard/publications"
              className="text-xs font-semibold text-accent-cyan hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="mt-4 divide-y divide-border">
            {publications.slice(0, 3).map((pub) => (
              <div key={pub.id} className="py-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    {pub.type}
                  </Badge>
                  <span className="font-mono text-xs text-accent-cyan">
                    {pub.year}
                  </span>
                </div>
                <h3 className="mt-1 text-xs font-semibold text-ink">
                  {pub.title}
                </h3>
                <p className="text-[11px] text-muted-text">{pub.authors}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent News & Events */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-ink">
              <Newspaper className="h-4 w-4 text-accent-cyan" />
              Latest Announcements & Events
            </h2>
            <Link
              href="/dashboard/news"
              className="text-xs font-semibold text-accent-cyan hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="mt-4 divide-y divide-border">
            {newsPosts.slice(0, 2).map((post) => (
              <div key={post.slug} className="py-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="bg-accent-cyan/10 text-[10px] text-accent-cyan">
                    News
                  </Badge>
                  <span className="font-mono text-xs text-muted-text">
                    {post.publishedAt}
                  </span>
                </div>
                <h3 className="mt-1 text-xs font-semibold text-ink">
                  {post.title}
                </h3>
              </div>
            ))}

            {events.slice(0, 1).map((evt) => (
              <div key={evt.slug} className="py-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="bg-brand-navy/10 text-[10px] text-brand-navy">
                    Event
                  </Badge>
                  <span className="font-mono text-xs text-muted-text">
                    {evt.startAt.slice(0, 10)}
                  </span>
                </div>
                <h3 className="mt-1 text-xs font-semibold text-ink">
                  {evt.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
