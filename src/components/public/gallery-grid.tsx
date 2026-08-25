'use client';

import { useState } from 'react';
import {
  Camera,
  X,
  Maximize2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  galleryItems,
  galleryCategories,
  type GalleryItem,
} from '@/lib/data/gallery-data';
import { cn } from '@/lib/utils';

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div>
      {/* ─── Category Tabs ─── */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150',
              selectedCategory === category
                ? 'bg-brand-navy text-white shadow-sm'
                : 'bg-surface-muted text-ink hover:bg-border'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ─── Gallery Grid ─── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-lg"
          >
            {/* Visual preview box / gradient placeholder */}
            <div
              className={cn(
                'relative flex items-center justify-center bg-gradient-to-br from-brand-navy/90 to-brand-navy p-8 text-white transition-transform duration-300 group-hover:scale-[1.02]',
                item.aspectRatio === 'square'
                  ? 'aspect-square'
                  : item.aspectRatio === 'portrait'
                    ? 'aspect-[3/4]'
                    : 'aspect-video'
              )}
            >
              <Camera className="h-12 w-12 text-white/20 transition-transform duration-200 group-hover:scale-110 group-hover:text-accent-cyan/50" />

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <Maximize2 className="h-3.5 w-3.5" />
                  View Photo
                </span>
              </div>
            </div>

            {/* Caption Info */}
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant="secondary"
                  className="bg-accent-cyan/10 text-[11px] text-accent-cyan"
                >
                  {item.category}
                </Badge>
                <span className="font-mono text-xs text-muted-text">
                  {item.date}
                </span>
              </div>

              <h3 className="mt-2 font-heading text-base font-semibold text-ink">
                {item.title}
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-muted-text">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Modal / Lightbox ─── */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute right-4 top-4 rounded-full bg-surface-muted p-1.5 text-ink transition-colors hover:bg-border"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Preview Area */}
            <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl bg-brand-navy text-white">
              <Camera className="h-16 w-16 text-white/30" />
              <p className="mt-3 font-mono text-xs text-white/50">
                [High-resolution lab photo asset: {activeModalItem.id}]
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-accent-cyan/10 text-xs text-accent-cyan">
                  {activeModalItem.category}
                </Badge>
                <span className="font-mono text-xs text-muted-text">
                  {activeModalItem.date}
                </span>
              </div>

              <h3 className="mt-2 font-heading text-xl font-semibold text-ink">
                {activeModalItem.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-text">
                {activeModalItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
