'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { publicationSchema, type PublicationFormData } from '@/lib/validations/publication';
import { savePublication } from '@/lib/actions/publication-actions';

interface PublicationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PublicationDialog({ isOpen, onClose, onSuccess }: PublicationDialogProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PublicationFormData>({
    resolver: zodResolver(publicationSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      type: 'JOURNAL',
      featured: false,
      status: 'PUBLISHED',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: PublicationFormData) => {
    setErrorMsg(null);
    const res = await savePublication(data);
    if (res.success) {
      reset();
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to save publication.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-heading text-lg font-bold text-ink">Add Publication</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted-text hover:bg-surface-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Paper Title</label>
            <Input {...register('title')} placeholder="e.g. Adaptive Robust Control of Quadrotors..." className="text-xs" />
            {errors.title && <p className="text-[11px] text-destructive">{errors.title.message}</p>}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Authors</label>
              <Input {...register('authors')} placeholder="e.g. P. N. Roy, M. H. An-Nahiyan" className="text-xs" />
              {errors.authors && <p className="text-[11px] text-destructive">{errors.authors.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Venue (Journal / Conf)</label>
              <Input {...register('venue')} placeholder="e.g. IEEE Transactions on Robotics" className="text-xs" />
              {errors.venue && <p className="text-[11px] text-destructive">{errors.venue.message}</p>}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Publication Type</label>
              <select
                {...register('type')}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
              >
                <option value="JOURNAL">Journal Article</option>
                <option value="CONFERENCE">Conference Proceeding</option>
                <option value="PREPRINT">Preprint</option>
                <option value="BOOK_CHAPTER">Book Chapter</option>
                <option value="PATENT">Patent</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Year</label>
              <Input
                type="number"
                {...register('year', { valueAsNumber: true })}
                className="text-xs font-mono"
              />
              {errors.year && <p className="text-[11px] text-destructive">{errors.year.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Abstract</label>
            <Textarea {...register('abstract')} rows={3} placeholder="Paper abstract summary..." className="text-xs" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">DOI / Link</label>
              <Input {...register('doiOrLink')} placeholder="https://doi.org/10.xxxx/..." className="text-xs" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">PDF URL</label>
              <Input {...register('pdfUrl')} placeholder="https://.../paper.pdf" className="text-xs" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" {...register('featured')} className="rounded border-input" />
            <label htmlFor="featured" className="text-xs text-ink">Feature this publication on homepage</label>
          </div>

          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-brand-navy text-white hover:bg-brand-navy-hover"
              disabled={isSubmitting}
            >
              <Save className="mr-1.5 h-3.5 w-3.5" />
              Save Publication
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
