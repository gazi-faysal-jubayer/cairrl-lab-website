import { z } from 'zod';

export const publicationSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  authors: z.string().min(2, 'Authors list is required'),
  venue: z.string().min(2, 'Venue / Journal / Conference name is required'),
  year: z.number().int().min(1990).max(new Date().getFullYear() + 2),
  type: z.enum(['JOURNAL', 'CONFERENCE', 'THESIS', 'PREPRINT', 'BOOK_CHAPTER']),
  abstract: z.string().optional(),
  doiOrLink: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  pdfUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  featured: z.boolean().optional(),
  researchAreaSlugs: z.array(z.string()).optional(),
  projectSlug: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export type PublicationFormData = z.infer<typeof publicationSchema>;
