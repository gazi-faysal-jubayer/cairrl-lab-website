'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { eventSchema, type EventFormData } from '@/lib/validations/event';
import { requireAdmin } from '@/lib/auth-guard';
import type { ActionResult } from './people-actions';

export async function saveEvent(
  data: EventFormData
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = eventSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Invalid event data',
      };
    }

    const val = parsed.data;

    await prisma.event.upsert({
      where: { slug: val.slug },
      update: {
        title: val.title,
        type: val.type,
        description: val.description,
        startAt: new Date(val.startAt),
        endAt: val.endAt ? new Date(val.endAt) : null,
        location: val.location ?? null,
        isOnline: val.isOnline ?? false,
        coverImageUrl: val.coverImageUrl ?? null,
        status: val.status,
      },
      create: {
        slug: val.slug,
        title: val.title,
        type: val.type,
        description: val.description,
        startAt: new Date(val.startAt),
        endAt: val.endAt ? new Date(val.endAt) : null,
        location: val.location ?? null,
        isOnline: val.isOnline ?? false,
        coverImageUrl: val.coverImageUrl ?? null,
        status: val.status,
      },
    });

    revalidatePath('/events');
    revalidatePath(`/events/${val.slug}`);
    revalidatePath('/dashboard/events');
    revalidatePath('/');

    return {
      success: true,
      message: `Event "${val.title}" saved successfully.`,
    };
  } catch (err) {
    console.error('Save event error:', err);
    return { success: false, error: 'Failed to save event.' };
  }
}

export async function deleteEvent(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.event.delete({
      where: { id },
    });

    revalidatePath('/events');
    revalidatePath(`/events/${deleted.slug}`);
    revalidatePath('/dashboard/events');
    revalidatePath('/');

    return {
      success: true,
      message: `Event "${deleted.title}" removed successfully.`,
    };
  } catch (err) {
    console.error('Delete event error:', err);
    return { success: false, error: 'Failed to delete event.' };
  }
}
