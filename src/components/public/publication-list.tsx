'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  BookOpen,
  ChevronDown,
  ChevronUp,
  X,
  Copy,
  Check,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type PublicationItem = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: string;
  abstract: string | null;
  doiOrLink: string | null;
  pdfUrl: string | null;
  featured: boolean;
  researchAreas: { id: string; name: string; slug: string }[];
};

export type ResearchAreaFilter = {
  id: string;
  name: string;
  slug: string;
};

const publicationTypeLabels: Record<string, string> = {
  JOURNAL: 'Journal Article',
  CONFERENCE: 'Conference Paper',
  THESIS: 'Thesis / Dissertation',
  PREPRINT: 'Preprint / arXiv',
  BOOK_CHAPTER: 'Book Chapter',
};

type PublicationListProps = {
  publications: PublicationItem[];
  researchAreas: ResearchAreaFilter[];
};

export function PublicationList({
  publications,
  researchAreas,
}: PublicationListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedArea, setSelectedArea] = useState<string>('ALL');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);

  // Unique years in the dataset (sorted descending)
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(publications.map((p) => p.year)));
    return years.sort((a, b) => b - a);
  }, [publications]);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      // Search query (title, author, venue, abstract)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          pub.title.toLowerCase().includes(q) ||
          pub.authors.toLowerCase().includes(q) ||
          pub.venue.toLowerCase().includes(q) ||
          (pub.abstract && pub.abstract.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Filter by Type
      if (selectedType !== 'ALL' && pub.type !== selectedType) {
        return false;
      }

      // Filter by Year
      if (selectedYear !== 'ALL' && pub.year !== parseInt(selectedYear, 10)) {
        return false;
      }

      // Filter by Research Area
      if (
        selectedArea !== 'ALL' &&
        !pub.researchAreas.some((a) => a.slug === selectedArea)
      ) {
        return false;
      }

      return true;
    });
  }, [publications, searchQuery, selectedType, selectedYear, selectedArea]);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyBibtex = (pub: PublicationItem) => {
    const bibtexKey = `${pub.authors.split(',')[0].trim().replace(/\s+/g, '')}${pub.year}`;
    const bibtex = `@article{${bibtexKey},
  title={${pub.title}},
  author={${pub.authors}},
  journal={${pub.venue}},
  year={${pub.year}}${pub.doiOrLink ? `,\n  url={${pub.doiOrLink}}` : ''}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtexId(pub.id);
    setTimeout(() => setCopiedBibtexId(null), 2000);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedType !== 'ALL' ||
    selectedYear !== 'ALL' ||
    selectedArea !== 'ALL';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('ALL');
    setSelectedYear('ALL');
    setSelectedArea('ALL');
  };

  return (
    <div>
      {/* ─── Filter & Search Control Panel ─── */}
      <div className="mb-8 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-12 md:items-center">
          {/* Search Bar */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
            <Input
              type="search"
              placeholder="Search by title, author, venue, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>

          {/* Type Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-ink shadow-sm transition-colors focus:border-accent-cyan focus:outline-none"
              aria-label="Filter by Publication Type"
            >
              <option value="ALL">All Types</option>
              {Object.entries(publicationTypeLabels).map(([typeKey, label]) => (
                <option key={typeKey} value={typeKey}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-ink shadow-sm transition-colors focus:border-accent-cyan focus:outline-none"
              aria-label="Filter by Year"
            >
              <option value="ALL">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Research Area Quick Filter Pills */}
        {researchAreas.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <span className="text-xs font-semibold text-muted-text">
              Filter Area:
            </span>
            <button
              type="button"
              onClick={() => setSelectedArea('ALL')}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                selectedArea === 'ALL'
                  ? 'bg-brand-navy text-white'
                  : 'bg-surface-muted text-ink hover:bg-border'
              )}
            >
              All Areas
            </button>
            {researchAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => setSelectedArea(area.slug)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  selectedArea === area.slug
                    ? 'bg-accent-cyan text-white'
                    : 'bg-surface-muted text-ink hover:bg-border'
                )}
              >
                {area.name}
              </button>
            ))}
          </div>
        )}

        {/* Status bar */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-text">
          <p>
            Showing <strong className="text-ink">{filteredPublications.length}</strong> of{' '}
            <strong>{publications.length}</strong> publications
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 font-semibold text-error hover:underline"
            >
              <X className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ─── Publication Cards List ─── */}
      {filteredPublications.length > 0 ? (
        <div className="space-y-4">
          {filteredPublications.map((pub) => {
            const isAbstractExpanded = !!expandedAbstracts[pub.id];

            return (
              <article
                key={pub.id}
                className="group rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-150 hover:border-accent-cyan/40 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-brand-navy/10 font-mono text-xs text-brand-navy"
                    >
                      {publicationTypeLabels[pub.type] ?? pub.type}
                    </Badge>
                    <span className="font-mono text-xs font-bold text-accent-cyan">
                      {pub.year}
                    </span>
                    {pub.featured && (
                      <Badge
                        variant="secondary"
                        className="bg-accent-green/10 text-xs text-accent-green"
                      >
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Research areas */}
                  <div className="flex flex-wrap gap-1.5">
                    {pub.researchAreas.map((area) => (
                      <span
                        key={area.id}
                        className="rounded bg-surface-muted px-2 py-0.5 text-xs font-medium text-muted-text"
                      >
                        {area.name}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-ink group-hover:text-brand-navy">
                  {pub.title}
                </h3>

                <p className="mt-2 text-sm text-muted-text">
                  <strong className="text-ink">{pub.authors}</strong> —{' '}
                  <span className="italic text-ink/80">{pub.venue}</span>
                </p>

                {/* Collapsible Abstract & Actions */}
                <div className="mt-3">
                  {pub.abstract && isAbstractExpanded ? (
                    <div className="mt-2 rounded-lg bg-surface-muted p-4 text-sm leading-relaxed text-muted-text">
                      <p className="font-semibold text-ink">Abstract:</p>
                      <p className="mt-1">{pub.abstract}</p>
                    </div>
                  ) : null}

                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    {pub.abstract && (
                      <button
                        type="button"
                        onClick={() => toggleAbstract(pub.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-muted-text hover:text-accent-cyan"
                      >
                        {isAbstractExpanded ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" />
                            Hide Abstract
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" />
                            View Abstract
                          </>
                        )}
                      </button>
                    )}

                    {pub.doiOrLink && (
                      <a
                        href={pub.doiOrLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Source / DOI</span>
                      </a>
                    )}

                    {/* BibTeX Copy Button */}
                    <button
                      type="button"
                      onClick={() => copyBibtex(pub)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-muted-text hover:text-accent-cyan"
                    >
                      {copiedBibtexId === pub.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-accent-green" />
                          <span className="text-accent-green">BibTeX Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>BibTeX</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="rounded-xl border border-border bg-surface px-8 py-16 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-text/30" />
          <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
            No publications found
          </h3>
          <p className="mt-1 text-sm text-muted-text">
            No publications match your selected filter criteria.
          </p>
          <div className="mt-5">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Reset all filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
