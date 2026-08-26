'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { publications, publicationTypeLabels } from '@/lib/data/publications-data';

import { PublicationDialog } from '@/components/dashboard/publication-dialog';

export default function DashboardPublicationsPage() {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPubs = publications.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <PublicationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => alert('Publication saved successfully!')}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Publications Management
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Add, edit, or archive peer-reviewed journal papers and conference proceedings.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Publication
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
        <Input
          type="search"
          placeholder="Search by title, author, or venue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-xs"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
            <tr>
              <th className="px-5 py-3.5">Publication Title</th>
              <th className="px-5 py-3.5">Type</th>
              <th className="px-5 py-3.5">Year</th>
              <th className="px-5 py-3.5">Authors & Venue</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredPubs.map((pub) => (
              <tr key={pub.id} className="hover:bg-surface-muted/30">
                <td className="max-w-md px-5 py-4 font-semibold text-ink">
                  <div>
                    <span>{pub.title}</span>
                    {pub.featured && (
                      <Badge variant="secondary" className="ml-2 bg-accent-green/10 text-[9px] text-accent-green">
                        Featured
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge variant="outline" className="text-[10px]">
                    {publicationTypeLabels[pub.type]}
                  </Badge>
                </td>
                <td className="px-5 py-4 font-mono font-bold text-accent-cyan">
                  {pub.year}
                </td>
                <td className="px-5 py-4 text-muted-text">
                  <p className="font-medium text-ink">{pub.authors}</p>
                  <p className="italic text-[11px]">{pub.venue}</p>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
