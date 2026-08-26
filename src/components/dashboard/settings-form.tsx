'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteSettingsSchema, type SiteSettingsFormData } from '@/lib/validations/settings';
import { saveSiteSettings } from '@/lib/actions/settings-actions';

type SettingsFormProps = {
  initialSettings: SiteSettingsFormData | null;
};

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SiteSettingsFormData>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      labFullName:
        initialSettings?.labFullName ||
        'Centre for Advanced Intelligent Robotics Research Laboratory',
      labShortName: initialSettings?.labShortName || 'CAIRRL',
      tagline:
        initialSettings?.tagline ||
        'Advancing Robotics, Control & Mechatronics at KUET',
      missionStatement:
        initialSettings?.missionStatement ||
        'To conduct cutting-edge interdisciplinary research in robotics and intelligent systems.',
      address: initialSettings?.address || 'KUET, Khulna 9203, Bangladesh',
      contactEmail: initialSettings?.contactEmail || 'cairrl@kuet.ac.bd',
      phone: initialSettings?.phone || '',
    },
  });

  const onSubmit = async (data: SiteSettingsFormData) => {
    setSuccessMsg(null);
    setErrorMsg(null);

    const res = await saveSiteSettings(data);
    if (res.success) {
      setSuccessMsg(res.message || 'Lab settings updated successfully.');
    } else {
      setErrorMsg(res.error || 'Failed to save settings.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">Global Lab Settings</h1>
        <p className="mt-1 text-xs text-muted-text">
          Configure laboratory branding, institutional coordinates, and mission text stored in Neon Postgres.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 rounded-lg border border-accent-green/30 bg-accent-green/10 p-4 text-xs font-medium text-accent-green">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-xs font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Lab Full Name *</label>
            <Input {...register('labFullName')} className="text-xs" />
            {errors.labFullName && (
              <p className="text-[11px] text-destructive">{errors.labFullName.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Lab Acronym / Short Name *</label>
            <Input {...register('labShortName')} className="text-xs" />
            {errors.labShortName && (
              <p className="text-[11px] text-destructive">{errors.labShortName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-ink">Tagline / Motto *</label>
          <Input {...register('tagline')} className="text-xs" />
          {errors.tagline && (
            <p className="text-[11px] text-destructive">{errors.tagline.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-ink">Mission Statement *</label>
          <Textarea {...register('missionStatement')} rows={4} className="text-xs" />
          {errors.missionStatement && (
            <p className="text-[11px] text-destructive">{errors.missionStatement.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Official Contact Email</label>
            <Input {...register('contactEmail')} type="email" className="text-xs" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink">Contact Phone Number</label>
            <Input {...register('phone')} className="text-xs" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-ink">Physical Campus Address</label>
          <Input {...register('address')} className="text-xs" />
        </div>

        <div className="flex justify-end border-t border-border pt-4">
          <Button
            type="submit"
            size="sm"
            className="bg-brand-navy text-white hover:bg-brand-navy-hover"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Saving to Database...
              </>
            ) : (
              <>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
