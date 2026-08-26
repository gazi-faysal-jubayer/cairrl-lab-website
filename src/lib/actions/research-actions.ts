'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import {
  researchAreaSchema,
  projectSchema,
  type ResearchAreaFormData,
  type ProjectFormData,
} from '@/lib/validations/research';
import { requireAdmin } from '@/lib/auth-guard';
import type { ActionResult } from './people-actions';

export async function saveResearchArea(
  data: ResearchAreaFormData,
  id?: string
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = researchAreaSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Invalid research area data',
      };
    }

    const val = parsed.data;

    const existing = await prisma.researchArea.findFirst({
      where: {
        slug: val.slug,
        ...(id ? { NOT: { id } } : {}),
      },
    });

    if (existing) {
      return {
        success: false,
        error: `Slug "${val.slug}" is already in use by another research area.`,
      };
    }

    if (id) {
      await prisma.researchArea.update({
        where: { id },
        data: {
          name: val.name,
          slug: val.slug,
          description: val.description,
          coverImageUrl: val.coverImageUrl ?? null,
        },
      });
    } else {
      await prisma.researchArea.create({
        data: {
          slug: val.slug,
          name: val.name,
          description: val.description,
          coverImageUrl: val.coverImageUrl ?? null,
        },
      });
    }

    revalidatePath('/research');
    revalidatePath(`/research/${val.slug}`);
    revalidatePath('/dashboard/research');
    revalidatePath('/');

    return {
      success: true,
      message: `Research area "${val.name}" saved successfully.`,
    };
  } catch (err) {
    console.error('Save research area error:', err);
    return { success: false, error: 'Failed to save research area.' };
  }
}

export async function deleteResearchArea(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.researchArea.delete({
      where: { id },
    });

    revalidatePath('/research');
    revalidatePath(`/research/${deleted.slug}`);
    revalidatePath('/dashboard/research');
    revalidatePath('/');

    return {
      success: true,
      message: `Research area "${deleted.name}" removed successfully.`,
    };
  } catch (err) {
    console.error('Delete research area error:', err);
    return { success: false, error: 'Failed to delete research area.' };
  }
}

export async function saveProject(
  data: ProjectFormData,
  id?: string
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = projectSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Invalid project data',
      };
    }

    const val = parsed.data;

    const existing = await prisma.project.findFirst({
      where: {
        slug: val.slug,
        ...(id ? { NOT: { id } } : {}),
      },
    });

    if (existing) {
      return {
        success: false,
        error: `Slug "${val.slug}" is already in use by another project.`,
      };
    }

    if (id) {
      await prisma.project.update({
        where: { id },
        data: {
          title: val.title,
          slug: val.slug,
          summary: val.summary,
          description: val.description,
          status: val.status,
          coverImageUrl: val.coverImageUrl ?? null,
          contentStatus: val.contentStatus,
        },
      });
    } else {
      await prisma.project.create({
        data: {
          slug: val.slug,
          title: val.title,
          summary: val.summary,
          description: val.description,
          status: val.status,
          coverImageUrl: val.coverImageUrl ?? null,
          contentStatus: val.contentStatus,
        },
      });
    }

    revalidatePath('/research');
    revalidatePath(`/research/projects/${val.slug}`);
    revalidatePath('/dashboard/research');
    revalidatePath('/');

    return {
      success: true,
      message: `Project "${val.title}" saved successfully.`,
    };
  } catch (err) {
    console.error('Save project error:', err);
    return { success: false, error: 'Failed to save project.' };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.project.delete({
      where: { id },
    });

    revalidatePath('/research');
    revalidatePath(`/research/projects/${deleted.slug}`);
    revalidatePath('/dashboard/research');
    revalidatePath('/');

    return {
      success: true,
      message: `Project "${deleted.title}" removed successfully.`,
    };
  } catch (err) {
    console.error('Delete project error:', err);
    return { success: false, error: 'Failed to delete project.' };
  }
}
