'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { newsPostSchema, type NewsPostFormData } from '@/lib/validations/news';
import { requireAdmin } from '@/lib/auth-guard';
import type { ActionResult } from './people-actions';

export async function saveNewsPost(
  data: NewsPostFormData,
  id?: string
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = newsPostSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Invalid news post data',
      };
    }

    const val = parsed.data;

    const existing = await prisma.newsPost.findFirst({
      where: {
        slug: val.slug,
        ...(id ? { NOT: { id } } : {}),
      },
    });

    if (existing) {
      return {
        success: false,
        error: `Slug "${val.slug}" is already in use by another news post.`,
      };
    }

    if (id) {
      await prisma.newsPost.update({
        where: { id },
        data: {
          title: val.title,
          slug: val.slug,
          excerpt: val.excerpt,
          body: val.body,
          coverImageUrl: val.coverImageUrl ?? null,
          status: val.status,
        },
      });
    } else {
      await prisma.newsPost.create({
        data: {
          slug: val.slug,
          title: val.title,
          excerpt: val.excerpt,
          body: val.body,
          coverImageUrl: val.coverImageUrl ?? null,
          status: val.status,
        },
      });
    }

    revalidatePath('/news');
    revalidatePath(`/news/${val.slug}`);
    revalidatePath('/dashboard/news');
    revalidatePath('/');

    return {
      success: true,
      message: `News post "${val.title}" saved successfully.`,
    };
  } catch (err) {
    console.error('Save news error:', err);
    return { success: false, error: 'Failed to save news post.' };
  }
}

export async function deleteNewsPost(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.newsPost.delete({
      where: { id },
    });

    revalidatePath('/news');
    revalidatePath(`/news/${deleted.slug}`);
    revalidatePath('/dashboard/news');
    revalidatePath('/');

    return {
      success: true,
      message: `News post "${deleted.title}" removed successfully.`,
    };
  } catch (err) {
    console.error('Delete news error:', err);
    return { success: false, error: 'Failed to delete news post.' };
  }
}
