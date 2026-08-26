'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { siteSettingsSchema, type SiteSettingsFormData } from '@/lib/validations/settings';
import { requireAdmin } from '@/lib/auth-guard';
import type { ActionResult } from './people-actions';

export async function saveSiteSettings(
  data: SiteSettingsFormData
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = siteSettingsSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Invalid settings data',
      };
    }

    const val = parsed.data;

    await prisma.siteSetting.upsert({
      where: { id: 'singleton' },
      update: {
        labFullName: val.labFullName,
        labShortName: val.labShortName,
        tagline: val.tagline,
        missionStatement: val.missionStatement,
        address: val.address ?? null,
        contactEmail: val.contactEmail ?? null,
        phone: val.phone ?? null,
        heroImageUrl: val.heroImageUrl ?? null,
      },
      create: {
        id: 'singleton',
        labFullName: val.labFullName,
        labShortName: val.labShortName,
        tagline: val.tagline,
        missionStatement: val.missionStatement,
        address: val.address ?? null,
        contactEmail: val.contactEmail ?? null,
        phone: val.phone ?? null,
        heroImageUrl: val.heroImageUrl ?? null,
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidatePath('/join-us');
    revalidatePath('/dashboard/settings');

    return { success: true, message: 'Lab settings updated successfully.' };
  } catch (err) {
    console.error('Save settings error:', err);
    return { success: false, error: 'Failed to update settings.' };
  }
}
