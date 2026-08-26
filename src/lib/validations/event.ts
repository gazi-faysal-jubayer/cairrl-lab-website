import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  type: z.enum(['SEMINAR', 'TALK', 'WORKSHOP', 'DEFENSE', 'OTHER']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startAt: z.string().min(10, 'Start date and time is required'),
  endAt: z.string().optional(),
  location: z.string().optional(),
  isOnline: z.boolean(),
  coverImageUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export type EventFormData = z.infer<typeof eventSchema>;
