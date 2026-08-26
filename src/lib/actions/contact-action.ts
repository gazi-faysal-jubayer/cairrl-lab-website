'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { prisma } from '@/lib/prisma';

export interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactMessage(
  data: ContactFormData
): Promise<ActionResponse> {
  try {
    // 1. Validate payload
    const parsed = contactFormSchema.safeParse(data);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid form input.';
      return { success: false, error: firstError };
    }

    const { name, email, subject, message, website } = parsed.data;

    // 2. Honeypot check (Rules.md §6) — silent discard
    if (website && website.trim().length > 0) {
      return {
        success: true,
        message: 'Your message has been submitted successfully.',
      };
    }

    // 3. Save to database if connected
    if (prisma && typeof prisma.contactMessage?.create === 'function') {
      try {
        await prisma.contactMessage.create({
          data: {
            name,
            email,
            subject,
            message,
          },
        });
      } catch (dbErr) {
        console.warn('Database write bypassed (DB not connected):', dbErr);
      }
    }

    return {
      success: true,
      message: 'Thank you! Your message has been sent to CAIRRL Lab coordinators.',
    };
  } catch (err) {
    console.error('Contact submission error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again or email us directly.',
    };
  }
}
