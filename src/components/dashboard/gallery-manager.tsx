'use client';

import { useState } from 'react';
import { Upload, Trash2, Loader2, AlertCircle, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import { saveGalleryItem, deleteGalleryItem } from '@/lib/actions/gallery-actions';

export type DashboardGalleryItem = {
  id: string;
  imageUrl: string;
  caption: string | null;
  category: string | null;
  createdAt: string;
};

type GalleryManagerProps = {
  initialItems: DashboardGalleryItem[];
};

export function GalleryManager({ initialItems }: GalleryManagerProps) {
  const [items, setItems] = useState<DashboardGalleryItem[]>(initialItems);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Lab & Facilities');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DashboardGalleryItem | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setErrorMsg(null);
      const data = new FormData();
      data.append('file', file);
      data.append('folder', 'gallery');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (json.success && json.url) {
        // Save record to DB
        const saveRes = await saveGalleryItem({
          imageUrl: json.url,
          caption: caption.trim() || file.name,
          category,
        });

        if (saveRes.success) {
          setCaption('');
          window.location.reload();
        } else {
          setErrorMsg(saveRes.error || 'Failed to save photo record.');
        }
      } else {
        setErrorMsg(json.error || 'Failed to upload photo to S3 storage.');
      }
    } catch {
      setErrorMsg('Error uploading photo.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = (item: DashboardGalleryItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    await deleteGalleryItem(itemToDelete.id);
    setItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
    setItemToDelete(null);
  };

  return (
    <div className="space-y-6">
      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        title="Remove Photo from Gallery?"
        description="Are you sure you want to delete this photo? It will be removed from the public visual archive immediately."
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">Visual Media Gallery</h1>
        <p className="mt-1 text-xs text-muted-text">
          Upload and manage laboratory photos, robotics demonstrations, and event archives in Neon S3.
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Upload Box */}
      <div className="rounded-xl border border-dashed border-border bg-surface p-6 shadow-sm">
        <h3 className="font-heading text-sm font-semibold text-ink">Add New Photo to Neon S3</h3>
        <p className="mt-1 text-xs text-muted-text">
          Select an image and assign a category tag. File will be uploaded directly to the S3 bucket.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Caption / Description</label>
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. 6-DOF Robotic Arm Experiment"
              className="text-xs"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
            >
              <option value="Lab & Facilities">Lab &amp; Facilities</option>
              <option value="Robotics Demos">Robotics Demos</option>
              <option value="Workshops & Events">Workshops &amp; Events</option>
              <option value="Team">Team</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-brand-navy px-4 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-brand-navy-hover">
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading to S3...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 text-accent-cyan" />
                  Choose &amp; Upload Photo
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
          </div>
        </div>
      </div>

      {/* Grid of Images */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-ink">
          Uploaded Media ({items.length})
        </h3>

        {items.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="aspect-video overflow-hidden bg-brand-navy/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.caption || 'Gallery photo'}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-accent-cyan/10 text-[9px] text-accent-cyan">
                      {item.category || 'General'}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(item)}
                      className="rounded p-1 text-muted-text transition-colors hover:bg-destructive/10 hover:text-destructive"
                      title="Delete photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {item.caption && (
                    <p className="mt-1.5 line-clamp-1 text-xs text-ink font-medium">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-border bg-surface px-6 py-12 text-center">
            <Camera className="mx-auto h-10 w-10 text-muted-text/20" />
            <p className="mt-3 text-xs text-muted-text">No photos uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
