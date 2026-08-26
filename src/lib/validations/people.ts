import { z } from 'zod';

export const facultySchema = z.object({
  name: z.string().min(2, 'Name is required and must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  designation: z.string().min(2, 'Designation is required'),
  department: z.string().min(2, 'Department is required'),
  photoUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  bio: z.string().optional(),
  email: z.string().email('Must be a valid email').or(z.literal('')).optional(),
  googleScholarUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  researchGateUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  linkedinUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  researchAreaSlugs: z.array(z.string()).optional(),
  order: z.number().int().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export const studentSchema = z.object({
  name: z.string().min(2, 'Name is required and must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  level: z.enum(['UNDERGRAD', 'GRAD', 'ALUMNI']),
  program: z.string().optional(),
  batchOrYear: z.string().optional(),
  photoUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  bio: z.string().optional(),
  email: z.string().email('Must be a valid email').or(z.literal('')).optional(),
  googleScholarUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  linkedinUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  researchAreaSlugs: z.array(z.string()).optional(),
  order: z.number().int().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export type FacultyFormData = z.infer<typeof facultySchema>;
export type StudentFormData = z.infer<typeof studentSchema>;
