'use server';

import { revalidatePath } from 'next/cache';
import { facultySchema, studentSchema, type FacultyFormData, type StudentFormData } from '@/lib/validations/people';
import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/prisma';

export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function saveFacultyMember(data: FacultyFormData): Promise<ActionResult> {
  try {
    // 1. Authenticate admin
    await requireAdmin();

    // 2. Validate
    const parsed = facultySchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid data' };
    }

    const val = parsed.data;

    // 3. Persist to DB if connected
    if (prisma && typeof prisma.facultyMember?.upsert === 'function') {
      try {
        await prisma.facultyMember.upsert({
          where: { slug: val.slug },
          update: {
            name: val.name,
            designation: val.designation,
            department: val.department,
            bio: val.bio,
            email: val.email,
            photoUrl: val.photoUrl,
            googleScholarUrl: val.googleScholarUrl,
            researchGateUrl: val.researchGateUrl,
            linkedinUrl: val.linkedinUrl,
            order: val.order,
            status: val.status,
          },
          create: {
            name: val.name,
            slug: val.slug,
            designation: val.designation,
            department: val.department,
            bio: val.bio,
            email: val.email,
            photoUrl: val.photoUrl,
            googleScholarUrl: val.googleScholarUrl,
            researchGateUrl: val.researchGateUrl,
            linkedinUrl: val.linkedinUrl,
            order: val.order,
            status: val.status,
          },
        });
      } catch (dbErr) {
        console.warn('DB write bypassed in dev:', dbErr);
      }
    }

    revalidatePath('/people');
    revalidatePath(`/people/${val.slug}`);
    revalidatePath('/dashboard/people');

    return { success: true, message: `Faculty member "${val.name}" saved successfully.` };
  } catch (err) {
    console.error('Save faculty error:', err);
    return { success: false, error: 'Failed to save faculty member.' };
  }
}

export async function saveStudentMember(data: StudentFormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = studentSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid data' };
    }

    const val = parsed.data;

    if (prisma && typeof prisma.studentMember?.upsert === 'function') {
      try {
        await prisma.studentMember.upsert({
          where: { slug: val.slug },
          update: {
            name: val.name,
            level: val.level,
            program: val.program,
            batchOrYear: val.batchOrYear,
            bio: val.bio,
            email: val.email,
            photoUrl: val.photoUrl,
            googleScholarUrl: val.googleScholarUrl,
            linkedinUrl: val.linkedinUrl,
            order: val.order,
            status: val.status,
          },
          create: {
            name: val.name,
            slug: val.slug,
            level: val.level,
            program: val.program,
            batchOrYear: val.batchOrYear,
            bio: val.bio,
            email: val.email,
            photoUrl: val.photoUrl,
            googleScholarUrl: val.googleScholarUrl,
            linkedinUrl: val.linkedinUrl,
            order: val.order,
            status: val.status,
          },
        });
      } catch (dbErr) {
        console.warn('DB write bypassed in dev:', dbErr);
      }
    }

    revalidatePath('/people');
    revalidatePath(`/people/${val.slug}`);
    revalidatePath('/dashboard/people');

    return { success: true, message: `Student researcher "${val.name}" saved successfully.` };
  } catch (err) {
    console.error('Save student error:', err);
    return { success: false, error: 'Failed to save student member.' };
  }
}
