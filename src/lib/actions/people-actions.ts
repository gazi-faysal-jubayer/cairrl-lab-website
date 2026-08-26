'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { facultySchema, studentSchema, type FacultyFormData, type StudentFormData } from '@/lib/validations/people';
import { requireAdmin } from '@/lib/auth-guard';

export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function saveFacultyMember(data: FacultyFormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = facultySchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid form data' };
    }

    const val = parsed.data;

    await prisma.facultyMember.upsert({
      where: { slug: val.slug },
      update: {
        name: val.name,
        designation: val.designation,
        department: val.department,
        bio: val.bio ?? null,
        email: val.email ?? null,
        photoUrl: val.photoUrl ?? null,
        googleScholarUrl: val.googleScholarUrl ?? null,
        researchGateUrl: val.researchGateUrl ?? null,
        linkedinUrl: val.linkedinUrl ?? null,
        order: val.order ?? 0,
        status: val.status,
      },
      create: {
        name: val.name,
        slug: val.slug,
        designation: val.designation,
        department: val.department,
        bio: val.bio ?? null,
        email: val.email ?? null,
        photoUrl: val.photoUrl ?? null,
        googleScholarUrl: val.googleScholarUrl ?? null,
        researchGateUrl: val.researchGateUrl ?? null,
        linkedinUrl: val.linkedinUrl ?? null,
        order: val.order ?? 0,
        status: val.status,
      },
    });

    revalidatePath('/people');
    revalidatePath(`/people/${val.slug}`);
    revalidatePath('/dashboard/people');
    revalidatePath('/');

    return { success: true, message: `Faculty member "${val.name}" saved successfully.` };
  } catch (err) {
    console.error('Save faculty error:', err);
    return { success: false, error: 'Failed to save faculty member.' };
  }
}

export async function deleteFacultyMember(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.facultyMember.delete({
      where: { id },
    });

    revalidatePath('/people');
    revalidatePath(`/people/${deleted.slug}`);
    revalidatePath('/dashboard/people');
    revalidatePath('/');

    return { success: true, message: `Faculty member "${deleted.name}" removed successfully.` };
  } catch (err) {
    console.error('Delete faculty error:', err);
    return { success: false, error: 'Failed to delete faculty member.' };
  }
}

export async function saveStudentMember(data: StudentFormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = studentSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid form data' };
    }

    const val = parsed.data;

    await prisma.studentMember.upsert({
      where: { slug: val.slug },
      update: {
        name: val.name,
        level: val.level,
        program: val.program ?? null,
        batchOrYear: val.batchOrYear ?? null,
        bio: val.bio ?? null,
        email: val.email ?? null,
        photoUrl: val.photoUrl ?? null,
        googleScholarUrl: val.googleScholarUrl ?? null,
        linkedinUrl: val.linkedinUrl ?? null,
        order: val.order ?? 0,
        status: val.status,
      },
      create: {
        name: val.name,
        slug: val.slug,
        level: val.level,
        program: val.program ?? null,
        batchOrYear: val.batchOrYear ?? null,
        bio: val.bio ?? null,
        email: val.email ?? null,
        photoUrl: val.photoUrl ?? null,
        googleScholarUrl: val.googleScholarUrl ?? null,
        linkedinUrl: val.linkedinUrl ?? null,
        order: val.order ?? 0,
        status: val.status,
      },
    });

    revalidatePath('/people');
    revalidatePath(`/people/${val.slug}`);
    revalidatePath('/dashboard/people');
    revalidatePath('/');

    return { success: true, message: `Student researcher "${val.name}" saved successfully.` };
  } catch (err) {
    console.error('Save student error:', err);
    return { success: false, error: 'Failed to save student member.' };
  }
}

export async function deleteStudentMember(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const deleted = await prisma.studentMember.delete({
      where: { id },
    });

    revalidatePath('/people');
    revalidatePath(`/people/${deleted.slug}`);
    revalidatePath('/dashboard/people');
    revalidatePath('/');

    return { success: true, message: `Student researcher "${deleted.name}" removed successfully.` };
  } catch (err) {
    console.error('Delete student error:', err);
    return { success: false, error: 'Failed to delete student member.' };
  }
}
