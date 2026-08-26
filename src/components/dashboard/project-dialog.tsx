'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { projectSchema, type ProjectFormData } from '@/lib/validations/research';
import { saveProject } from '@/lib/actions/research-actions';

export type EditableProject = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: 'PLANNED' | 'ONGOING' | 'COMPLETED';
  coverImageUrl?: string | null;
  contentStatus: 'DRAFT' | 'PUBLISHED';
};

interface ProjectDialogProps {
  isOpen: boolean;
  project?: EditableProject | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ProjectDialog({
  isOpen,
  project,
  onClose,
  onSuccess,
}: ProjectDialogProps) {
  const isEditing = !!project;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    values: project ? {
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      description: project.description,
      status: project.status,
      coverImageUrl: project.coverImageUrl || '',
      contentStatus: project.contentStatus,
    } : {
      title: '',
      slug: '',
      summary: '',
      description: '',
      status: 'ONGOING',
      coverImageUrl: '',
      contentStatus: 'PUBLISHED',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: ProjectFormData) => {
    setErrorMsg(null);
    const res = await saveProject(data);
    if (res.success) {
      reset();
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to save project.');
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
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-heading text-lg font-bold text-ink">
            {isEditing ? 'Edit Project' : 'Add Project'}
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
            <label className="mb-1 block text-xs font-semibold text-ink">Project Title *</label>
            <Input
              {...register('title')}
              placeholder="e.g. Autonomous Robotic Manipulator with Visual Servoing"
              className="text-xs"
            />
            {errors.title && (
              <p className="text-[11px] text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Slug *</label>
            <Input
              {...register('slug')}
              placeholder="e.g. autonomous-robotic-manipulator"
              className="text-xs font-mono"
              disabled={isEditing}
            />
            {errors.slug && (
              <p className="text-[11px] text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Status</label>
              <select
                {...register('status')}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
              >
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="PLANNED">Planned</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Visibility</label>
              <select
                {...register('contentStatus')}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Short Summary *</label>
            <Input
              {...register('summary')}
              placeholder="One-line overview of the project objectives..."
              className="text-xs"
            />
            {errors.summary && (
              <p className="text-[11px] text-destructive">{errors.summary.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Detailed Description *</label>
            <Textarea
              {...register('description')}
              rows={4}
              placeholder="Full project description, methodologies, experimental setups, and milestones..."
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
              placeholder="https://.../project-cover.webp"
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
              Save Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
