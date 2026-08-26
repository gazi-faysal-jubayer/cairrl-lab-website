import { z } from 'zod';

export const newsPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  body: z.string().min(20, 'Content body must be at least 20 characters'),
  coverImageUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  category: z.string().min(1, 'Category is required'),
  publishedAt: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export type NewsPostFormData = z.infer<typeof newsPostSchema>;
