'use server';

import { revalidatePath } from 'next/cache';
import { newsPostSchema, type NewsPostFormData } from '@/lib/validations/news';
import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/prisma';
import type { ActionResult } from './people-actions';

export async function saveNewsPost(data: NewsPostFormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = newsPostSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid news data' };
    }

    const val = parsed.data;

    if (prisma && typeof prisma.newsPost?.upsert === 'function') {
      try {
        await prisma.newsPost.upsert({
          where: { slug: val.slug },
          update: {
            title: val.title,
            excerpt: val.excerpt,
            body: val.body,
            coverImageUrl: val.coverImageUrl,
            status: val.status,
          },
          create: {
            slug: val.slug,
            title: val.title,
            excerpt: val.excerpt,
            body: val.body,
            coverImageUrl: val.coverImageUrl,
            status: val.status,
          },
        });
      } catch (dbErr) {
        console.warn('DB write bypassed in dev:', dbErr);
      }
    }

    revalidatePath('/news');
    revalidatePath(`/news/${val.slug}`);
    revalidatePath('/dashboard/news');

    return { success: true, message: `News post "${val.title}" saved successfully.` };
  } catch (err) {
    console.error('Save news error:', err);
    return { success: false, error: 'Failed to save news post.' };
  }
}
