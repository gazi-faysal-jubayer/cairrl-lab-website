import { z } from 'zod';

export const galleryItemSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  imageUrl: z.string().url('Must be a valid image URL').or(z.literal('')),
  caption: z.string().min(5, 'Caption must be at least 5 characters'),
  category: z.string().default('General'),
  projectId: z.string().optional(),
});

export type GalleryItemFormData = z.infer<typeof galleryItemSchema>;
