'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { eventSchema, type EventFormData } from '@/lib/validations/event';
import { saveEvent } from '@/lib/actions/event-actions';

export type EditableEvent = {
  id?: string;
  slug: string;
  title: string;
  type: 'SEMINAR' | 'TALK' | 'WORKSHOP' | 'DEFENSE' | 'OTHER';
  description: string;
  startAt: string;
  endAt?: string | null;
  location?: string | null;
  isOnline: boolean;
  coverImageUrl?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
};

interface EventDialogProps {
  isOpen: boolean;
  event?: EditableEvent | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EventDialog({
  isOpen,
  event,
  onClose,
  onSuccess,
}: EventDialogProps) {
  const isEditing = !!event;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    values: event ? {
      title: event.title,
      slug: event.slug,
      type: event.type,
      description: event.description,
      startAt: new Date(event.startAt).toISOString().slice(0, 16),
      endAt: event.endAt ? new Date(event.endAt).toISOString().slice(0, 16) : undefined,
      location: event.location || '',
      isOnline: event.isOnline,
      coverImageUrl: event.coverImageUrl || '',
      status: event.status,
    } : {
      title: '',
      slug: '',
      type: 'SEMINAR',
      description: '',
      startAt: new Date().toISOString().slice(0, 16),
      location: '',
      isOnline: false,
      status: 'PUBLISHED',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: EventFormData) => {
    setErrorMsg(null);
    const res = await saveEvent(data);
    if (res.success) {
      reset();
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to save event.');
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
            {isEditing ? 'Edit Event' : 'Schedule Event / Seminar'}
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
            <label className="mb-1 block text-xs font-semibold text-ink">Event Title *</label>
            <Input
              {...register('title')}
              placeholder="e.g. CAIRRL Seminar: Adaptive Control in Robotics"
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
              placeholder="e.g. adaptive-control-seminar"
              className="text-xs font-mono"
              disabled={isEditing}
            />
            {errors.slug && (
              <p className="text-[11px] text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Event Type *</label>
              <select
                {...register('type')}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
              >
                <option value="SEMINAR">Seminar</option>
                <option value="TALK">Guest Talk</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="DEFENSE">Thesis Defense</option>
                <option value="OTHER">Other Event</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Status</label>
              <select
                {...register('status')}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Start Date &amp; Time *</label>
              <Input
                type="datetime-local"
                {...register('startAt')}
                className="text-xs font-mono"
              />
              {errors.startAt && (
                <p className="text-[11px] text-destructive">{errors.startAt.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">End Date &amp; Time</label>
              <Input
                type="datetime-local"
                {...register('endAt')}
                className="text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Physical Location / Room</label>
              <Input
                {...register('location')}
                placeholder="e.g. ME Seminar Room 204, KUET"
                className="text-xs"
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="isOnline"
                {...register('isOnline')}
                className="h-4 w-4 rounded border-input text-brand-navy"
              />
              <label htmlFor="isOnline" className="text-xs font-medium text-ink">
                Online Event (Zoom / Meet)
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Event Description *</label>
            <Textarea
              {...register('description')}
              rows={4}
              placeholder="Detailed schedule, speaker bio, and participation guidelines..."
              className="text-xs"
            />
            {errors.description && (
              <p className="text-[11px] text-destructive">{errors.description.message}</p>
            )}
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
              {isEditing ? 'Update Event' : 'Schedule Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
