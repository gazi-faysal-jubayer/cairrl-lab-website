import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  FlaskConical,
  BookOpen,
  Newspaper,
  Image as ImageIcon,
  Mail,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { getDashboardMetrics, getPublications } from '@/lib/db/queries';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Dashboard Overview',
};

export const dynamic = 'force-dynamic';

export default async function DashboardOverviewPage() {
  const [metrics, recentPubs] = await Promise.all([
    getDashboardMetrics(),
    getPublications(),
  ]);

  const metricCards = [
    {
      title: 'Lab Members',
      count: metrics.people,
      label: `${metrics.faculty} Faculty, ${metrics.students} Students`,
      href: '/dashboard/people',
      icon: Users,
      color: 'text-accent-cyan',
      bgColor: 'bg-accent-cyan/10',
    },
    {
      title: 'Research & Projects',
      count: metrics.researchAreas,
      label: `${metrics.projects} Active Projects`,
      href: '/dashboard/research',
      icon: FlaskConical,
      color: 'text-accent-green',
      bgColor: 'bg-accent-green/10',
    },
    {
      title: 'Publications',
      count: metrics.publications,
      label: 'Peer-Reviewed & Preprints',
      href: '/dashboard/publications',
      icon: BookOpen,
      color: 'text-brand-navy',
      bgColor: 'bg-brand-navy/10',
    },
    {
      title: 'News & Events',
      count: metrics.news + metrics.events,
      label: `${metrics.news} News, ${metrics.events} Events`,
      href: '/dashboard/news',
      icon: Newspaper,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Media Gallery',
      count: metrics.gallery,
      label: 'Photos in Neon S3',
      href: '/dashboard/gallery',
      icon: ImageIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Contact Inquiries',
      count: metrics.unreadMessages,
      label: 'Unread Visitor Messages',
      href: '/dashboard/messages',
      icon: Mail,
      color: 'text-rose-600',
      bgColor: 'bg-rose-500/10',
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
          <p className="mt-1 text-xs text-muted-text">
            CAIRRL Lab Live Database Command Center connected to Neon Postgres.
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-xl border border-border bg-surface p-5 shadow-xs transition-all duration-150 hover:border-accent-cyan/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-text">
                  {card.title}
                </span>
                <div className={cn('rounded-lg p-2.5', card.bgColor, card.color)}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3">
                <p className="font-mono text-2xl font-bold tracking-tight text-ink">
                  {card.count}
                </p>
                <p className="mt-1 text-[11px] text-muted-text">{card.label}</p>
              </div>

              <div className="mt-3 flex items-center gap-1 border-t border-border pt-2.5 text-xs font-semibold text-accent-cyan group-hover:underline">
                <span>Manage {card.title}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── Recent Publications & Contact Messages ─── */}
      <div className="grid gap-6 lg:grid-cols-2">
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
            {recentPubs.slice(0, 4).map((pub) => (
              <div key={pub.id} className="py-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-[9px]">
                    {pub.type}
                  </Badge>
                  <span className="font-mono text-xs text-accent-cyan">
                    {pub.year}
                  </span>
                </div>
                <h3 className="mt-1 text-xs font-semibold text-ink">
                  {pub.title}
                </h3>
                <p className="text-[11px] text-muted-text line-clamp-1">{pub.authors}</p>
              </div>
            ))}
            {recentPubs.length === 0 && (
              <p className="py-6 text-center text-xs text-muted-text">
                No publications in database.
              </p>
            )}
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-ink">
              <Mail className="h-4 w-4 text-accent-cyan" />
              Recent Visitor Inquiries
            </h2>
            <Link
              href="/dashboard/messages"
              className="text-xs font-semibold text-accent-cyan hover:underline"
            >
              Inbox ({metrics.unreadMessages} unread)
            </Link>
          </div>

          <div className="mt-4 divide-y divide-border">
            {metrics.recentMessages.map((msg) => (
              <div key={msg.id} className="py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-xs text-ink">{msg.name}</span>
                  <span className="font-mono text-[10px] text-muted-text">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-text line-clamp-1">
                  {msg.subject || msg.message}
                </p>
              </div>
            ))}
            {metrics.recentMessages.length === 0 && (
              <p className="py-6 text-center text-xs text-muted-text">
                No contact inquiries yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
