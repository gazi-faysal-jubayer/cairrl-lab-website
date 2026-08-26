'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/data/site-data';
import { siteSettingsSchema, type SiteSettingsFormData } from '@/lib/validations/settings';

export default function DashboardSettingsPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SiteSettingsFormData>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      labFullName: siteConfig.fullName,
      labShortName: siteConfig.name,
      tagline: siteConfig.tagline,
      missionStatement: siteConfig.mission,
      address: siteConfig.address,
      contactEmail: siteConfig.contactEmail,
      phone: '+880-41-769468',
      heroImageUrl: '',
    },
  });

  const onSubmit = async (data: SiteSettingsFormData) => {
    setSavedSuccess(false);
    console.log('Saving settings:', data);
    setTimeout(() => {
      setSavedSuccess(true);
    }, 400);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">
          Lab Identity & Global Settings
        </h1>
        <p className="mt-1 text-xs text-muted-text">
          Configure core institutional metadata, branding copy, and contact coordinates.
        </p>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-lg border border-accent-green/30 bg-accent-green/10 p-3 text-xs font-semibold text-accent-green">
          <CheckCircle2 className="h-4 w-4" />
          Settings successfully updated.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink">
              Lab Full Name
            </label>
            <Input {...register('labFullName')} className="text-xs" />
            {errors.labFullName && (
              <p className="mt-1 text-xs text-error">{errors.labFullName.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink">
              Short Name / Wordmark
            </label>
            <Input {...register('labShortName')} className="text-xs" />
            {errors.labShortName && (
              <p className="mt-1 text-xs text-error">{errors.labShortName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink">
            Tagline
          </label>
          <Input {...register('tagline')} className="text-xs" />
          {errors.tagline && (
            <p className="mt-1 text-xs text-error">{errors.tagline.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink">
            Mission Statement
          </label>
          <Textarea {...register('missionStatement')} rows={3} className="text-xs" />
          {errors.missionStatement && (
            <p className="mt-1 text-xs text-error">{errors.missionStatement.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink">
              Contact Email
            </label>
            <Input type="email" {...register('contactEmail')} className="text-xs" />
            {errors.contactEmail && (
              <p className="mt-1 text-xs text-error">{errors.contactEmail.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink">
              Contact Phone
            </label>
            <Input {...register('phone')} className="text-xs" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink">
            Lab Address
          </label>
          <Input {...register('address')} className="text-xs" />
        </div>

        <div className="flex justify-end border-t border-border pt-4">
          <Button
            type="submit"
            className="bg-brand-navy text-white hover:bg-brand-navy-hover"
            disabled={isSubmitting}
          >
            <Save className="mr-1.5 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
