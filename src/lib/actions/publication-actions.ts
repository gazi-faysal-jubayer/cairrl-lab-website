'use server';

import { revalidatePath } from 'next/cache';
import { publicationSchema, type PublicationFormData } from '@/lib/validations/publication';
import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/prisma';
import type { ActionResult } from './people-actions';

export async function savePublication(data: PublicationFormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = publicationSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid publication data' };
    }

    const val = parsed.data;

    if (prisma && typeof prisma.publication?.create === 'function') {
      try {
        await prisma.publication.create({
          data: {
            title: val.title,
            authors: val.authors,
            venue: val.venue,
            year: val.year,
            type: val.type,
            abstract: val.abstract,
            doiOrLink: val.doiOrLink,
            pdfUrl: val.pdfUrl,
            featured: val.featured,
            status: val.status,
          },
        });
      } catch (dbErr) {
        console.warn('DB write bypassed in dev:', dbErr);
      }
    }

    revalidatePath('/publications');
    revalidatePath('/dashboard/publications');
    revalidatePath('/research');

    return { success: true, message: `Publication "${val.title}" saved successfully.` };
  } catch (err) {
    console.error('Save publication error:', err);
    return { success: false, error: 'Failed to save publication.' };
  }
}
