'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NewsDialog, type EditableNewsPost } from '@/components/dashboard/news-dialog';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import { deleteNewsPost } from '@/lib/actions/news-actions';
import { cn } from '@/lib/utils';

export type DashboardNewsRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl?: string | null;
  publishedAt: string;
  status: 'DRAFT' | 'PUBLISHED';
};

type NewsTableProps = {
  initialNews: DashboardNewsRow[];
};

export function NewsTable({ initialNews }: NewsTableProps) {
  const [news, setNews] = useState<DashboardNewsRow[]>(initialNews);
  const [search, setSearch] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<EditableNewsPost | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<DashboardNewsRow | null>(null);

  const filteredNews = news.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  const handleEdit = (post: DashboardNewsRow) => {
    setEditingPost(post);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPost(null);
    setDialogOpen(true);
  };

  const handleDeleteClick = (post: DashboardNewsRow) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    await deleteNewsPost(postToDelete.id);
    setNews((prev) => prev.filter((p) => p.id !== postToDelete.id));
    setPostToDelete(null);
  };

  return (
    <div className="space-y-6">
      <NewsDialog
        isOpen={dialogOpen}
        post={editingPost}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => window.location.reload()}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete News Post?"
        description={`Are you sure you want to delete "${postToDelete?.title}"? This will immediately remove it from the news archive.`}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">News Management</h1>
          <p className="mt-1 text-xs text-muted-text">
            Publish announcements, lab achievements, and research stories in Neon Postgres.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={handleAdd}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add News Post
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
        <Input
          type="search"
          placeholder="Search news by title or excerpt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-xs"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
              <tr>
                <th className="px-5 py-3.5">Headline &amp; Slug</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Excerpt</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredNews.map((post) => (
                <tr key={post.id} className="transition-colors hover:bg-surface-muted/30">
                  <td className="max-w-md px-5 py-4 font-semibold text-ink">
                    <div className="flex items-center gap-3">
                      {post.coverImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImageUrl}
                          alt=""
                          className="h-10 w-14 shrink-0 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-brand-navy/5 text-muted-text">
                          <Newspaper className="h-4 w-4" />
                        </div>
                      )}
                      <div>
                        <span>{post.title}</span>
                        <p className="font-mono text-[10px] text-muted-text">
                          /news/{post.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-[9px]',
                        post.status === 'PUBLISHED'
                          ? 'border-accent-green/40 text-accent-green bg-accent-green/5'
                          : 'border-amber-500/40 text-amber-600 bg-amber-500/5'
                      )}
                    >
                      {post.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 font-mono text-muted-text">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="max-w-xs px-5 py-4 text-muted-text line-clamp-2">
                    {post.excerpt}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-ink"
                        onClick={() => handleEdit(post)}
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-destructive"
                        onClick={() => handleDeleteClick(post)}
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
