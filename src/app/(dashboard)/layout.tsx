'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  BookOpen,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/data/site-data';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'People', href: '/dashboard/people', icon: Users },
  { label: 'Research & Projects', href: '/dashboard/research', icon: FlaskConical },
  { label: 'Publications', href: '/dashboard/publications', icon: BookOpen },
  { label: 'News & Announcements', href: '/dashboard/news', icon: Newspaper },
  { label: 'Events & Seminars', href: '/dashboard/events', icon: Calendar },
  { label: 'Gallery Archive', href: '/dashboard/gallery', icon: ImageIcon },
  { label: 'Inquiries & Messages', href: '/dashboard/messages', icon: MessageSquare },
  { label: 'Lab Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-surface-muted text-ink">
      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold tracking-tight text-brand-navy">
              {siteConfig.name}
            </span>
          </Link>
          <Badge variant="secondary" className="bg-brand-navy/10 font-mono text-[10px] text-brand-navy">
            ADMIN
          </Badge>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4" aria-label="Dashboard navigation">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                  active
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-muted-text hover:bg-surface-muted hover:text-ink'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-accent-cyan' : 'text-muted-text')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer User Info */}
        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-xs font-semibold text-white">
                CA
              </div>
              <div className="text-xs">
                <p className="font-semibold text-ink">cairrl@kuet.ac.bd</p>
                <p className="text-[11px] text-muted-text">Administrator</p>
              </div>
            </div>

            <Link
              href="/login"
              className="rounded p-1.5 text-muted-text hover:bg-surface-muted hover:text-destructive"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ─── Mobile Sidebar Drawer ─── */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden',
          mobileSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setMobileSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-surface shadow-2xl transition-transform duration-200 ease-out md:hidden',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <span className="font-heading text-lg font-bold text-brand-navy">
            {siteConfig.name} Portal
          </span>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-md p-1.5 text-muted-text hover:bg-surface-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-brand-navy text-white'
                    : 'text-muted-text hover:bg-surface-muted hover:text-ink'
                )}
              >
                <Icon className={cn('h-4 w-4', active ? 'text-accent-cyan' : 'text-muted-text')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ─── Main Content Shell ─── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-6 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-md p-1.5 text-muted-text hover:bg-surface-muted md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-text">
              Administration Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-text transition-colors hover:border-accent-cyan hover:text-accent-cyan"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Website</span>
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
