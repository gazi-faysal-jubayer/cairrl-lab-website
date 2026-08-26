'use client';

import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { newsPosts } from '@/lib/data/news-events-data';

export default function DashboardNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            News & Announcements
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Publish research highlights, breakthroughs, and milestone announcements.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={() => alert('New Post modal')}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Create News Post
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
            <tr>
              <th className="px-5 py-3.5">Headline Title</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Date</th>
              <th className="px-5 py-3.5">Author</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {newsPosts.map((post) => (
              <tr key={post.slug} className="hover:bg-surface-muted/30">
                <td className="max-w-md px-5 py-4 font-semibold text-ink">
                  <div>
                    <span>{post.title}</span>
                    <p className="font-mono text-[10px] text-muted-text">/news/{post.slug}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge variant="secondary" className="bg-accent-cyan/10 text-[10px] text-accent-cyan">
                    {post.category}
                  </Badge>
                </td>
                <td className="px-5 py-4 font-mono text-muted-text">
                  {post.publishedAt}
                </td>
                <td className="px-5 py-4 text-muted-text">
                  {post.authorName}
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
