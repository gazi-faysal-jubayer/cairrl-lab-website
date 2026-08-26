'use client';

import { Camera, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { galleryItems } from '@/lib/data/gallery-data';

export default function DashboardGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Gallery Archive Manager
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Upload and organize laboratory photos, equipment prototypes, and event media.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={() => alert('Add Photo Item modal')}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Photo Item
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-surface p-4 shadow-sm">
            <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-brand-navy text-white/40">
              <Camera className="h-8 w-8" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Badge variant="secondary" className="bg-accent-cyan/10 text-[10px] text-accent-cyan">
                {item.category}
              </Badge>
              <span className="font-mono text-xs text-muted-text">{item.date}</span>
            </div>

            <h3 className="mt-2 text-sm font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-xs text-muted-text line-clamp-2">{item.caption}</p>

            <div className="mt-4 flex justify-end border-t border-border pt-3">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:bg-destructive/10">
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
