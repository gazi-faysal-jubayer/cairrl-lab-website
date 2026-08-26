'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guard';
import type { ActionResult } from './people-actions';

export async function markMessageRead(
  id: string,
  read: boolean
): Promise<ActionResult> {
  try {
    await requireAdmin();

    await prisma.contactMessage.update({
      where: { id },
      data: { read },
    });

    revalidatePath('/dashboard/messages');
    revalidatePath('/dashboard');

    return { success: true, message: `Message marked as ${read ? 'read' : 'unread'}.` };
  } catch (err) {
    console.error('Mark message error:', err);
    return { success: false, error: 'Failed to update message status.' };
  }
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath('/dashboard/messages');
    revalidatePath('/dashboard');

    return { success: true, message: 'Message deleted successfully.' };
  } catch (err) {
    console.error('Delete message error:', err);
    return { success: false, error: 'Failed to delete message.' };
  }
}
