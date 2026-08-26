'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, AlertCircle, Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { newsPostSchema, type NewsPostFormData } from '@/lib/validations/news';
import { saveNewsPost } from '@/lib/actions/news-actions';

export type EditableNewsPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category?: string | null;
  coverImageUrl?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
};

interface NewsDialogProps {
  isOpen: boolean;
  post?: EditableNewsPost | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function NewsDialog({
  isOpen,
  post,
  onClose,
  onSuccess,
}: NewsDialogProps) {
  const isEditing = !!post;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string>(post?.coverImageUrl || '');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsPostFormData>({
    resolver: zodResolver(newsPostSchema),
    values: post
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          body: post.body,
          category: post.category || 'General',
          coverImageUrl: post.coverImageUrl || '',
          status: post.status,
        }
      : {
          title: '',
          slug: '',
          excerpt: '',
          body: '',
          category: 'General',
          coverImageUrl: '',
          status: 'PUBLISHED',
        },
  });

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setErrorMsg(null);
      const data = new FormData();
      data.append('file', file);
      data.append('folder', 'news');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setCoverUrl(json.url);
        setValue('coverImageUrl', json.url);
      } else {
        setErrorMsg(json.error || 'Failed to upload cover image.');
      }
    } catch {
      setErrorMsg('Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: NewsPostFormData) => {
    setErrorMsg(null);
    const res = await saveNewsPost(
      { ...data, coverImageUrl: coverUrl || data.coverImageUrl },
      post?.id
    );
    if (res.success) {
      reset();
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to save news post.');
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
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-heading text-lg font-bold text-ink">
            {isEditing ? 'Edit News Post' : 'Publish News Post'}
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
            <label className="mb-1 block text-xs font-semibold text-ink">Headline / Title *</label>
            <Input
              {...register('title')}
              placeholder="e.g. CAIRRL Lab Showcases New Autonomous Drone at National Robotics Fest"
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
              placeholder="e.g. cairrl-lab-showcases-drone"
              className="text-xs font-mono"
            />
            {errors.slug && (
              <p className="text-[11px] text-destructive">{errors.slug.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Short Excerpt *</label>
            <Input
              {...register('excerpt')}
              placeholder="Brief 1-2 sentence lead for cards and preview..."
              className="text-xs"
            />
            {errors.excerpt && (
              <p className="text-[11px] text-destructive">{errors.excerpt.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Article Body (Rich Text / HTML) *</label>
            <Textarea
              {...register('body')}
              rows={6}
              placeholder="Full article content (supports paragraphs and basic HTML)..."
              className="text-xs font-mono"
            />
            {errors.body && (
              <p className="text-[11px] text-destructive">{errors.body.message}</p>
            )}
          </div>

          {/* Cover Image */}
          <div className="rounded-lg border border-border bg-surface-muted/40 p-4">
            <label className="block text-xs font-semibold text-ink">Cover Image</label>
            <div className="mt-2 flex items-center gap-4">
              {coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverUrl} alt="Preview" className="h-16 w-24 rounded-lg object-cover" />
              ) : null}
              <div className="flex-1">
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-xs hover:bg-surface-muted">
                  {uploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5 text-accent-cyan" />
                      Upload Cover Photo
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <p className="mt-1 text-[10px] text-muted-text">PNG, JPG, WebP up to 10MB.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Category</label>
              <Input {...register('category')} placeholder="e.g. Research, Event, Award" className="text-xs" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Publish Status</label>
              <select
                {...register('status')}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
              >
                <option value="PUBLISHED">Published (Visible on site)</option>
                <option value="DRAFT">Draft (Hidden)</option>
              </select>
            </div>
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
              {isEditing ? 'Update News' : 'Publish News'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
