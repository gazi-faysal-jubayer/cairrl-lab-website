'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navLinks, siteConfig } from '@/lib/data/site-data';
import { Container } from '@/components/shared';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for subtle shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-border bg-surface transition-shadow duration-200',
        scrolled && 'shadow-sm'
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        {/* Logo / Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity duration-150 hover:opacity-80"
        >
          <span className="font-heading text-xl font-bold tracking-tight text-brand-navy">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative px-3 py-2 text-sm font-medium transition-colors duration-150',
                isActive(link.href)
                  ? 'text-accent-cyan'
                  : 'text-ink hover:text-accent-cyan'
              )}
            >
              {link.label}
              {/* Active indicator */}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent-cyan" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink transition-colors duration-150 hover:bg-surface-muted lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-16 z-40 bg-black/30 transition-opacity duration-250 md:top-[72px] lg:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Nav Drawer */}
      <nav
        id="mobile-nav"
        className={cn(
          'fixed right-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-72 flex-col overflow-y-auto bg-surface shadow-xl transition-transform duration-250 ease-out md:top-[72px] md:h-[calc(100vh-72px)] lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'rounded-md px-4 py-3 text-base font-medium transition-colors duration-150',
                isActive(link.href)
                  ? 'bg-surface-muted text-accent-cyan'
                  : 'text-ink hover:bg-surface-muted hover:text-accent-cyan'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
