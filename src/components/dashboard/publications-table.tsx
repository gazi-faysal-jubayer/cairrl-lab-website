'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Star, StarOff, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  PublicationDialog,
  type EditablePublication,
} from '@/components/dashboard/publication-dialog';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import {
  deletePublication,
  toggleFeaturedPublication,
} from '@/lib/actions/publication-actions';
import { cn } from '@/lib/utils';

export type DashboardPublicationRow = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: 'JOURNAL' | 'CONFERENCE' | 'THESIS' | 'PREPRINT' | 'BOOK_CHAPTER';
  abstract?: string | null;
  doiOrLink?: string | null;
  pdfUrl?: string | null;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED';
  researchAreas: { id: string; name: string }[];
};

const typeLabels: Record<string, string> = {
  JOURNAL: 'Journal',
  CONFERENCE: 'Conference',
  THESIS: 'Thesis',
  PREPRINT: 'Preprint',
  BOOK_CHAPTER: 'Book Chapter',
};

type PublicationsTableProps = {
  initialPublications: DashboardPublicationRow[];
};

export function PublicationsTable({ initialPublications }: PublicationsTableProps) {
  const [publications, setPublications] =
    useState<DashboardPublicationRow[]>(initialPublications);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPub, setEditingPub] = useState<EditablePublication | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pubToDelete, setPubToDelete] = useState<DashboardPublicationRow | null>(null);

  const filteredPubs = publications.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedType !== 'ALL' && p.type !== selectedType) {
      return false;
    }
    return true;
  });

  const handleEdit = (pub: DashboardPublicationRow) => {
    setEditingPub(pub);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPub(null);
    setDialogOpen(true);
  };

  const handleDeleteClick = (pub: DashboardPublicationRow) => {
    setPubToDelete(pub);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!pubToDelete) return;
    await deletePublication(pubToDelete.id);
    setPublications((prev) => prev.filter((p) => p.id !== pubToDelete.id));
    setPubToDelete(null);
  };

  const handleToggleFeatured = async (pub: DashboardPublicationRow) => {
    const nextVal = !pub.featured;
    await toggleFeaturedPublication(pub.id, nextVal);
    setPublications((prev) =>
      prev.map((p) => (p.id === pub.id ? { ...p, featured: nextVal } : p))
    );
  };

  return (
    <div className="space-y-6">
      <PublicationDialog
        isOpen={dialogOpen}
        publication={editingPub}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          window.location.reload();
        }}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Publication?"
        description={`Are you sure you want to delete "${pubToDelete?.title}"? This will immediately remove it from all research areas and public lists.`}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Publications Management
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Add, edit, or feature peer-reviewed papers and conference proceedings in Neon Postgres.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={handleAdd}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Publication
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
          <Input
            type="search"
            placeholder="Search by title, author, or venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-text">Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-ink shadow-sm focus:border-accent-cyan focus:outline-none"
          >
            <option value="ALL">All Types ({publications.length})</option>
            <option value="JOURNAL">Journals ({publications.filter((p) => p.type === 'JOURNAL').length})</option>
            <option value="CONFERENCE">Conferences ({publications.filter((p) => p.type === 'CONFERENCE').length})</option>
            <option value="THESIS">Theses ({publications.filter((p) => p.type === 'THESIS').length})</option>
            <option value="PREPRINT">Preprints ({publications.filter((p) => p.type === 'PREPRINT').length})</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
              <tr>
                <th className="px-5 py-3.5">Title &amp; Status</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Year</th>
                <th className="px-5 py-3.5">Authors &amp; Venue</th>
                <th className="px-5 py-3.5 text-center">Featured</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPubs.map((pub) => (
                <tr key={pub.id} className="transition-colors hover:bg-surface-muted/30">
                  <td className="max-w-md px-5 py-4 font-semibold text-ink">
                    <div>
                      <span>{pub.title}</span>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-[9px]',
                            pub.status === 'PUBLISHED'
                              ? 'border-accent-green/40 text-accent-green bg-accent-green/5'
                              : 'border-amber-500/40 text-amber-600 bg-amber-500/5'
                          )}
                        >
                          {pub.status}
                        </Badge>
                        {pub.doiOrLink && (
                          <a
                            href={pub.doiOrLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] text-accent-cyan hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Link
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="outline" className="text-[10px]">
                      {typeLabels[pub.type] ?? pub.type}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 font-mono font-bold text-accent-cyan">
                    {pub.year}
                  </td>
                  <td className="px-5 py-4 text-muted-text">
                    <p className="font-medium text-ink">{pub.authors}</p>
                    <p className="italic text-[11px]">{pub.venue}</p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(pub)}
                      className="rounded p-1 text-muted-text hover:bg-surface-muted"
                      title={pub.featured ? 'Remove from featured' : 'Feature on homepage'}
                    >
                      {pub.featured ? (
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ) : (
                        <StarOff className="h-4 w-4 text-muted-text/40" />
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-ink"
                        onClick={() => handleEdit(pub)}
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-destructive"
                        onClick={() => handleDeleteClick(pub)}
                        title="Delete"
                      >
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
    </div>
  );
}
