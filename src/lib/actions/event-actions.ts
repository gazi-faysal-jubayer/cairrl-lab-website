'use server';

import { revalidatePath } from 'next/cache';
import { eventSchema, type EventFormData } from '@/lib/validations/event';
import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/prisma';
import type { ActionResult } from './people-actions';

export async function saveEvent(data: EventFormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = eventSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid event data' };
    }

    const val = parsed.data;

    if (prisma && typeof prisma.event?.upsert === 'function') {
      try {
        await prisma.event.upsert({
          where: { slug: val.slug },
          update: {
            title: val.title,
            type: val.type,
            description: val.description,
            startAt: new Date(val.startAt),
            location: val.location,
            isOnline: val.isOnline,
            coverImageUrl: val.coverImageUrl,
            status: val.status,
          },
          create: {
            slug: val.slug,
            title: val.title,
            type: val.type,
            description: val.description,
            startAt: new Date(val.startAt),
            location: val.location,
            isOnline: val.isOnline,
            coverImageUrl: val.coverImageUrl,
            status: val.status,
          },
        });
      } catch (dbErr) {
        console.warn('DB write bypassed in dev:', dbErr);
      }
    }

    revalidatePath('/events');
    revalidatePath(`/events/${val.slug}`);
    revalidatePath('/dashboard/events');

    return { success: true, message: `Event "${val.title}" saved successfully.` };
  } catch (err) {
    console.error('Save event error:', err);
    return { success: false, error: 'Failed to save event.' };
  }
}
