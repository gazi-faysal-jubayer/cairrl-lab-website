'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { submitContactMessage } from '@/lib/actions/contact-action';

export function ContactForm() {
  const [submitResult, setSubmitResult] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitResult(null);
    const res = await submitContactMessage(data);
    if (res.success) {
      setSubmitResult({
        type: 'success',
        message: res.message || 'Thank you! Your message has been sent.',
      });
      reset();
    } else {
      setSubmitResult({
        type: 'error',
        message: res.error || 'Failed to submit. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {submitResult && (
        <div
          className={`flex items-start gap-2.5 rounded-lg p-4 text-xs font-medium ${
            submitResult.type === 'success'
              ? 'border border-accent-green/30 bg-accent-green/10 text-accent-green'
              : 'border border-destructive/30 bg-destructive/10 text-destructive'
          }`}
          role="alert"
        >
          {submitResult.type === 'success' ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>{submitResult.message}</span>
        </div>
      )}
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Name
        </label>
        <Input
          id="contact-name"
          placeholder="Your full name"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-error">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Email
        </label>
        <Input
          id="contact-email"
          type="email"
          placeholder="your@email.com"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-error">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Subject
        </label>
        <Input
          id="contact-subject"
          placeholder="What is this about?"
          {...register('subject')}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-error">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Message
        </label>
        <Textarea
          id="contact-message"
          placeholder="Tell us more..."
          rows={5}
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-error">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot (hidden spam field) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <Input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-brand-navy text-white hover:bg-brand-navy-hover sm:w-auto"
        disabled={isSubmitting}
      >
        <Send className="mr-2 h-4 w-4" />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
