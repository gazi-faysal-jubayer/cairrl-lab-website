'use client';

import { useState, useEffect, useCallback } from 'react';
import { Camera, X, Maximize2, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type GalleryItemData = {
  id: string;
  imageUrl: string;
  caption: string | null;
  category: string | null;
  projectTitle: string | null;
};

type GalleryGridProps = {
  items: GalleryItemData[];
  categories: string[];
};

export function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const allCategories = ['All', ...categories];

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const activeItem = activeIndex !== null ? filteredItems[activeIndex] : null;

  const goNext = useCallback(() => {
    if (activeIndex !== null && activeIndex < filteredItems.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, filteredItems.length]);

  const goPrev = useCallback(() => {
    if (activeIndex !== null && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, goNext, goPrev]);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface px-8 py-12 text-center">
        <Camera className="mx-auto h-10 w-10 text-muted-text/20" />
        <p className="mt-4 text-muted-text">No gallery items yet.</p>
        <p className="mt-1 text-sm text-muted-text/70">
          Photos will appear here as they&apos;re added through the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Category Tabs */}
      {categories.length > 0 && (
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {allCategories.map((category) => (
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
      )}

      {/* Grid */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            className="group mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:shadow-lg"
          >
            {item.imageUrl ? (
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.caption ?? 'Gallery image'}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <Maximize2 className="h-3.5 w-3.5" />
                    View
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-brand-navy/90 to-brand-navy">
                <ImageIcon className="h-12 w-12 text-white/20" />
              </div>
            )}

            {(item.caption || item.category) && (
              <div className="p-4">
                {item.category && (
                  <Badge variant="secondary" className="bg-accent-cyan/10 text-[10px] text-accent-cyan">
                    {item.category}
                  </Badge>
                )}
                {item.caption && (
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-text">{item.caption}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {activeIndex !== null && activeIndex > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next */}
          {activeIndex !== null && activeIndex < filteredItems.length - 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 top-1/2 -translate-y-1/2"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={activeItem.imageUrl}
                alt={activeItem.caption ?? 'Gallery image'}
                className="max-h-[80vh] rounded-lg object-contain"
              />
            ) : (
              <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-lg bg-brand-navy">
                <Camera className="h-16 w-16 text-white/30" />
              </div>
            )}

            {(activeItem.caption || activeItem.category) && (
              <div className="mt-3 text-center">
                {activeItem.category && (
                  <Badge variant="secondary" className="bg-white/10 text-xs text-white/80">
                    {activeItem.category}
                  </Badge>
                )}
                {activeItem.caption && (
                  <p className="mt-2 text-sm text-white/70">{activeItem.caption}</p>
                )}
              </div>
            )}

            {/* Counter */}
            <p className="mt-2 text-center font-mono text-xs text-white/40">
              {(activeIndex ?? 0) + 1} / {filteredItems.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
