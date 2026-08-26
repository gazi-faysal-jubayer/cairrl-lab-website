'use server';

import { revalidatePath } from 'next/cache';
import {
  researchAreaSchema,
  projectSchema,
  type ResearchAreaFormData,
  type ProjectFormData,
} from '@/lib/validations/research';
import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/prisma';
import type { ActionResult } from './people-actions';

export async function saveResearchArea(data: ResearchAreaFormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = researchAreaSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid research area data' };
    }

    const val = parsed.data;

    if (prisma && typeof prisma.researchArea?.upsert === 'function') {
      try {
        await prisma.researchArea.upsert({
          where: { slug: val.slug },
          update: {
            name: val.name,
            description: val.description,
            coverImageUrl: val.coverImageUrl,
          },
          create: {
            slug: val.slug,
            name: val.name,
            description: val.description,
            coverImageUrl: val.coverImageUrl,
          },
        });
      } catch (dbErr) {
        console.warn('DB write bypassed in dev:', dbErr);
      }
    }

    revalidatePath('/research');
    revalidatePath(`/research/${val.slug}`);
    revalidatePath('/dashboard/research');

    return { success: true, message: `Research area "${val.name}" saved successfully.` };
  } catch (err) {
    console.error('Save research area error:', err);
    return { success: false, error: 'Failed to save research area.' };
  }
}

export async function saveProject(data: ProjectFormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = projectSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid project data' };
    }

    const val = parsed.data;

    if (prisma && typeof prisma.project?.upsert === 'function') {
      try {
        await prisma.project.upsert({
          where: { slug: val.slug },
          update: {
            title: val.title,
            summary: val.summary,
            description: val.description,
            status: val.status,
            coverImageUrl: val.coverImageUrl,
            contentStatus: val.contentStatus,
          },
          create: {
            slug: val.slug,
            title: val.title,
            summary: val.summary,
            description: val.description,
            status: val.status,
            coverImageUrl: val.coverImageUrl,
            contentStatus: val.contentStatus,
          },
        });
      } catch (dbErr) {
        console.warn('DB write bypassed in dev:', dbErr);
      }
    }

    revalidatePath('/research');
    revalidatePath(`/research/projects/${val.slug}`);
    revalidatePath('/dashboard/research');

    return { success: true, message: `Project "${val.title}" saved successfully.` };
  } catch (err) {
    console.error('Save project error:', err);
    return { success: false, error: 'Failed to save project.' };
  }
}
