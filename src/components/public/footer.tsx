import Link from 'next/link';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { Container } from '@/components/shared';
import { siteConfig, navLinks } from '@/lib/data/site-data';

const quickLinks = navLinks.filter(
  (link) => !['/', '/gallery'].includes(link.href)
);

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-navy text-white/90">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: About */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mb-2 text-sm leading-relaxed text-white/70">
              {siteConfig.fullName}
            </p>
            <p className="text-sm leading-relaxed text-white/60">
              {siteConfig.institution}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white/50">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors duration-150 hover:text-accent-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="h-4 w-4 shrink-0 text-accent-cyan" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="transition-colors duration-150 hover:text-accent-cyan"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>

            {/* Social / Academic Links */}
            <div className="mt-6">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                Find Us On
              </h4>
              <div className="flex gap-3">
                {Object.entries(siteConfig.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/60 transition-all duration-150 hover:border-accent-cyan/40 hover:text-accent-cyan"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="capitalize">{platform.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/40">
            © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.institution}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
