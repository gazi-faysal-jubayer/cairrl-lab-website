'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { researchAreaSchema, type ResearchAreaFormData } from '@/lib/validations/research';
import { saveResearchArea } from '@/lib/actions/research-actions';

export type EditableResearchArea = {
  id?: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  description: string;
  coverImageUrl?: string | null;
};

interface ResearchAreaDialogProps {
  isOpen: boolean;
  area?: EditableResearchArea | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ResearchAreaDialog({
  isOpen,
  area,
  onClose,
  onSuccess,
}: ResearchAreaDialogProps) {
  const isEditing = !!area;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResearchAreaFormData>({
    resolver: zodResolver(researchAreaSchema),
    values: area
      ? {
          name: area.name,
          slug: area.slug,
          shortDescription:
            area.shortDescription || area.description.slice(0, 80) || 'Research Area at CAIRRL',
          description: area.description,
          coverImageUrl: area.coverImageUrl || '',
        }
      : {
          name: '',
          slug: '',
          shortDescription: '',
          description: '',
          coverImageUrl: '',
        },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: ResearchAreaFormData) => {
    setErrorMsg(null);
    const res = await saveResearchArea(data);
    if (res.success) {
      reset();
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to save research area.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-heading text-lg font-bold text-ink">
            {isEditing ? 'Edit Research Area' : 'Add Research Area'}
          </h2>
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
            <label className="mb-1 block text-xs font-semibold text-ink">Area Name *</label>
            <Input
              {...register('name')}
              placeholder="e.g. Robotics & Control"
              className="text-xs"
            />
            {errors.name && (
              <p className="text-[11px] text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Slug *</label>
            <Input
              {...register('slug')}
              placeholder="e.g. robotics-and-control"
              className="text-xs font-mono"
              disabled={isEditing}
            />
            {errors.slug && (
              <p className="text-[11px] text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Short Summary *</label>
            <Input
              {...register('shortDescription')}
              placeholder="Brief summary sentence..."
              className="text-xs"
            />
            {errors.shortDescription && (
              <p className="text-[11px] text-destructive">{errors.shortDescription.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Full Description *</label>
            <Textarea
              {...register('description')}
              rows={4}
              placeholder="Scope and research objectives of this focus area..."
              className="text-xs"
            />
            {errors.description && (
              <p className="text-[11px] text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Cover Image URL</label>
            <Input
              {...register('coverImageUrl')}
              placeholder="https://.../cover.webp"
              className="text-xs"
            />
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
              {isSubmitting ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="mr-1.5 h-3.5 w-3.5" />
              )}
              Save Research Area
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
