import { z } from 'zod';

export const siteSettingsSchema = z.object({
  labFullName: z.string().min(5, 'Full lab name is required'),
  labShortName: z.string().min(2, 'Short name is required'),
  tagline: z.string().min(10, 'Tagline is required'),
  missionStatement: z.string().min(20, 'Mission statement must be at least 20 characters'),
  address: z.string().optional(),
  contactEmail: z.string().email('Must be a valid email').optional(),
  phone: z.string().optional(),
  heroImageUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
});

export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;
