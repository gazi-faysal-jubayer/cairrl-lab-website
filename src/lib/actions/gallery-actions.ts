'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guard';
import type { ActionResult } from './people-actions';

export type GalleryItemInput = {
  imageUrl: string;
  caption?: string | null;
  category?: string | null;
  projectId?: string | null;
};

export async function saveGalleryItem(data: GalleryItemInput): Promise<ActionResult> {
  try {
    await requireAdmin();

    if (!data.imageUrl) {
      return { success: false, error: 'Image URL is required.' };
    }

    await prisma.galleryItem.create({
      data: {
        imageUrl: data.imageUrl,
        caption: data.caption ?? null,
        category: data.category ?? 'General',
        projectId: data.projectId ?? null,
      },
    });

    revalidatePath('/gallery');
    revalidatePath('/dashboard/gallery');

    return { success: true, message: 'Photo added to gallery successfully.' };
  } catch (err) {
    console.error('Save gallery item error:', err);
    return { success: false, error: 'Failed to add photo to gallery.' };
  }
}

export async function deleteGalleryItem(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    await prisma.galleryItem.delete({
      where: { id },
    });

    revalidatePath('/gallery');
    revalidatePath('/dashboard/gallery');

    return { success: true, message: 'Photo removed from gallery.' };
  } catch (err) {
    console.error('Delete gallery item error:', err);
    return { success: false, error: 'Failed to delete photo.' };
  }
}
