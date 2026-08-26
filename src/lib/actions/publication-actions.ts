'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { publicationSchema, type PublicationFormData } from '@/lib/validations/publication';
import { requireAdmin } from '@/lib/auth-guard';
import type { ActionResult } from './people-actions';

export async function savePublication(
  data: PublicationFormData,
  id?: string
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = publicationSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Invalid publication data',
      };
    }

    const val = parsed.data;

    if (id) {
      await prisma.publication.update({
        where: { id },
        data: {
          title: val.title,
          authors: val.authors,
          venue: val.venue,
          year: val.year,
          type: val.type,
          abstract: val.abstract ?? null,
          doiOrLink: val.doiOrLink ?? null,
          pdfUrl: val.pdfUrl ?? null,
          featured: val.featured,
          status: val.status,
        },
      });
    } else {
      await prisma.publication.create({
        data: {
          title: val.title,
          authors: val.authors,
          venue: val.venue,
          year: val.year,
          type: val.type,
          abstract: val.abstract ?? null,
          doiOrLink: val.doiOrLink ?? null,
          pdfUrl: val.pdfUrl ?? null,
          featured: val.featured,
          status: val.status,
        },
      });
    }

    revalidatePath('/publications');
    revalidatePath('/dashboard/publications');
    revalidatePath('/research');
    revalidatePath('/');

    return {
      success: true,
      message: `Publication "${val.title}" saved successfully.`,
    };
  } catch (err) {
    console.error('Save publication error:', err);
    return { success: false, error: 'Failed to save publication.' };
  }
}

export async function deletePublication(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.publication.delete({
      where: { id },
    });

    revalidatePath('/publications');
    revalidatePath('/dashboard/publications');
    revalidatePath('/research');
    revalidatePath('/');

    return {
      success: true,
      message: `Publication "${deleted.title}" removed successfully.`,
    };
  } catch (err) {
    console.error('Delete publication error:', err);
    return { success: false, error: 'Failed to delete publication.' };
  }
}

export async function toggleFeaturedPublication(
  id: string,
  featured: boolean
): Promise<ActionResult> {
  try {
    await requireAdmin();

    await prisma.publication.update({
      where: { id },
      data: { featured },
    });

    revalidatePath('/publications');
    revalidatePath('/dashboard/publications');
    revalidatePath('/');

    return { success: true, message: 'Featured status updated.' };
  } catch (err) {
    console.error('Toggle featured error:', err);
    return { success: false, error: 'Failed to update featured status.' };
  }
}
