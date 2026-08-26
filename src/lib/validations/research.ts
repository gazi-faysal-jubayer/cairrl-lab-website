import { z } from 'zod';

export const researchAreaSchema = z.object({
  name: z.string().min(2, 'Name is required and must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  shortDescription: z.string().min(10, 'Short description is required'),
  description: z.string().min(20, 'Full description must be at least 20 characters'),
  coverImageUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
});

export const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  summary: z.string().min(10, 'Summary is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  status: z.enum(['PLANNED', 'ONGOING', 'COMPLETED']),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  coverImageUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  researchAreaSlugs: z.array(z.string()).min(1, 'Select at least one research area'),
  teamSlugs: z.array(z.string()),
  contentStatus: z.enum(['DRAFT', 'PUBLISHED']),
});

export type ResearchAreaFormData = z.infer<typeof researchAreaSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
