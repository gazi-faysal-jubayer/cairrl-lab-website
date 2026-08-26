'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, AlertCircle, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { facultySchema, studentSchema, type FacultyFormData, type StudentFormData } from '@/lib/validations/people';
import { saveFacultyMember, saveStudentMember } from '@/lib/actions/people-actions';

export type EditableMember = {
  id?: string;
  slug: string;
  name: string;
  role: 'faculty' | 'graduate' | 'undergraduate';
  designation?: string | null;
  department?: string | null;
  program?: string | null;
  batchOrYear?: string | null;
  bio?: string | null;
  email?: string | null;
  photoUrl?: string | null;
  googleScholarUrl?: string | null;
  researchGateUrl?: string | null;
  linkedinUrl?: string | null;
  order?: number;
  status: 'DRAFT' | 'PUBLISHED';
};

interface MemberDialogProps {
  isOpen: boolean;
  member?: EditableMember | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function MemberDialog({ isOpen, member, onClose, onSuccess }: MemberDialogProps) {
  const isEditing = !!member;
  const [selectedType, setSelectedType] = useState<'faculty' | 'student'>('faculty');
  const memberType = member ? (member.role === 'faculty' ? 'faculty' : 'student') : selectedType;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>('');

  const facultyForm = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema),
    values: member && member.role === 'faculty' ? {
      name: member.name,
      slug: member.slug,
      designation: member.designation || '',
      department: member.department || '',
      bio: member.bio || '',
      email: member.email || '',
      photoUrl: member.photoUrl || '',
      googleScholarUrl: member.googleScholarUrl || '',
      researchGateUrl: member.researchGateUrl || '',
      linkedinUrl: member.linkedinUrl || '',
      order: member.order || 0,
      status: member.status || 'PUBLISHED',
    } : {
      name: '',
      slug: '',
      designation: '',
      department: 'Department of Mechanical Engineering',
      bio: '',
      email: '',
      photoUrl: '',
      googleScholarUrl: '',
      researchGateUrl: '',
      linkedinUrl: '',
      order: 0,
      status: 'PUBLISHED',
    },
  });

  const studentForm = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    values: member && member.role !== 'faculty' ? {
      name: member.name,
      slug: member.slug,
      level: member.role === 'graduate' ? 'GRAD' : 'UNDERGRAD',
      program: member.program || '',
      batchOrYear: member.batchOrYear || '',
      bio: member.bio || '',
      email: member.email || '',
      photoUrl: member.photoUrl || '',
      googleScholarUrl: member.googleScholarUrl || '',
      linkedinUrl: member.linkedinUrl || '',
      order: member.order || 0,
      status: member.status || 'PUBLISHED',
    } : {
      name: '',
      slug: '',
      level: 'UNDERGRAD',
      program: 'B.Sc. in Mechatronics Engineering',
      batchOrYear: '',
      bio: '',
      email: '',
      photoUrl: '',
      googleScholarUrl: '',
      linkedinUrl: '',
      order: 0,
      status: 'PUBLISHED',
    },
  });

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPhoto(true);
      setErrorMsg(null);
      const data = new FormData();
      data.append('file', file);
      data.append('folder', 'members');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setPhotoUrl(json.url);
        facultyForm.setValue('photoUrl', json.url);
        studentForm.setValue('photoUrl', json.url);
      } else {
        setErrorMsg(json.error || 'Failed to upload photo.');
      }
    } catch {
      setErrorMsg('Error uploading photo.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const onFacultySubmit = async (data: FacultyFormData) => {
    setErrorMsg(null);
    const res = await saveFacultyMember({ ...data, photoUrl: photoUrl || data.photoUrl });
    if (res.success) {
      facultyForm.reset();
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to save faculty member.');
    }
  };

  const onStudentSubmit = async (data: StudentFormData) => {
    setErrorMsg(null);
    const res = await saveStudentMember({ ...data, photoUrl: photoUrl || data.photoUrl });
    if (res.success) {
      studentForm.reset();
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to save student member.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-heading text-lg font-bold text-ink">
            {isEditing ? `Edit Member: ${member?.name}` : 'Add Lab Member'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted-text hover:bg-surface-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab switch only when creating */}
        {!isEditing && (
          <div className="mt-4 flex gap-2 border-b border-border pb-3">
            <button
              type="button"
              onClick={() => setSelectedType('faculty')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                memberType === 'faculty'
                  ? 'bg-brand-navy text-white'
                  : 'bg-surface-muted text-muted-text'
              }`}
            >
              Faculty Member
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('student')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                memberType === 'student'
                  ? 'bg-brand-navy text-white'
                  : 'bg-surface-muted text-muted-text'
              }`}
            >
              Student Researcher
            </button>
          </div>
        )}

        {/* Photo Upload Section */}
        <div className="mt-4 rounded-lg border border-border bg-surface-muted/40 p-4">
          <label className="block text-xs font-semibold text-ink">Profile Photo</label>
          <div className="mt-2 flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-navy/10">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoUrl} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-muted-text">
                  No Photo
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-xs hover:bg-surface-muted">
                {uploadingPhoto ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Uploading to S3...
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5 text-accent-cyan" />
                    Upload Image
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploadingPhoto}
                />
              </label>
              <p className="mt-1 text-[10px] text-muted-text">PNG, JPG, WebP up to 10MB.</p>
            </div>
          </div>
        </div>

        {memberType === 'faculty' ? (
          <form onSubmit={facultyForm.handleSubmit(onFacultySubmit)} className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Full Name *</label>
                <Input
                  {...facultyForm.register('name')}
                  placeholder="e.g. Prof. Md. Helal-An-Nahiyan"
                  className="text-xs"
                />
                {facultyForm.formState.errors.name && (
                  <p className="text-[11px] text-destructive">{facultyForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Slug *</label>
                <Input
                  {...facultyForm.register('slug')}
                  placeholder="e.g. md-helal-an-nahiyan"
                  className="text-xs font-mono"
                  disabled={isEditing}
                />
                {facultyForm.formState.errors.slug && (
                  <p className="text-[11px] text-destructive">{facultyForm.formState.errors.slug.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Designation *</label>
                <Input
                  {...facultyForm.register('designation')}
                  placeholder="e.g. Professor"
                  className="text-xs"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Department *</label>
                <Input
                  {...facultyForm.register('department')}
                  placeholder="e.g. Department of Mechanical Engineering"
                  className="text-xs"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Bio Summary</label>
              <Textarea
                {...facultyForm.register('bio')}
                rows={3}
                placeholder="Academic background, research experience..."
                className="text-xs"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Email</label>
                <Input
                  {...facultyForm.register('email')}
                  type="email"
                  placeholder="faculty@kuet.ac.bd"
                  className="text-xs"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Google Scholar URL</label>
                <Input
                  {...facultyForm.register('googleScholarUrl')}
                  placeholder="https://scholar.google.com/..."
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">ResearchGate URL</label>
                <Input
                  {...facultyForm.register('researchGateUrl')}
                  placeholder="https://researchgate.net/profile/..."
                  className="text-xs"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">LinkedIn URL</label>
                <Input
                  {...facultyForm.register('linkedinUrl')}
                  placeholder="https://linkedin.com/in/..."
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Display Order</label>
                <Input
                  type="number"
                  {...facultyForm.register('order', { valueAsNumber: true })}
                  className="text-xs font-mono"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Status</label>
                <select
                  {...facultyForm.register('status')}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-brand-navy text-white hover:bg-brand-navy-hover"
                disabled={facultyForm.formState.isSubmitting}
              >
                {facultyForm.formState.isSubmitting ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                )}
                Save Faculty
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Full Name *</label>
                <Input
                  {...studentForm.register('name')}
                  placeholder="e.g. Hafizur Rahman"
                  className="text-xs"
                />
                {studentForm.formState.errors.name && (
                  <p className="text-[11px] text-destructive">{studentForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Slug *</label>
                <Input
                  {...studentForm.register('slug')}
                  placeholder="e.g. hafizur-rahman"
                  className="text-xs font-mono"
                  disabled={isEditing}
                />
                {studentForm.formState.errors.slug && (
                  <p className="text-[11px] text-destructive">{studentForm.formState.errors.slug.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Level *</label>
                <select
                  {...studentForm.register('level')}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
                >
                  <option value="UNDERGRAD">Undergraduate (B.Sc.)</option>
                  <option value="GRAD">Graduate (M.Sc. / Ph.D.)</option>
                  <option value="ALUMNI">Alumni</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Program / Department</label>
                <Input
                  {...studentForm.register('program')}
                  placeholder="e.g. B.Sc. in Mechatronics Engineering"
                  className="text-xs"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Bio / Research Focus</label>
              <Textarea
                {...studentForm.register('bio')}
                rows={3}
                placeholder="Research interests, thesis topic..."
                className="text-xs"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Email</label>
                <Input
                  {...studentForm.register('email')}
                  type="email"
                  placeholder="student@kuet.ac.bd"
                  className="text-xs"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Google Scholar URL</label>
                <Input
                  {...studentForm.register('googleScholarUrl')}
                  placeholder="https://scholar.google.com/..."
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Display Order</label>
                <Input
                  type="number"
                  {...studentForm.register('order', { valueAsNumber: true })}
                  className="text-xs font-mono"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Status</label>
                <select
                  {...studentForm.register('status')}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-brand-navy text-white hover:bg-brand-navy-hover"
                disabled={studentForm.formState.isSubmitting}
              >
                {studentForm.formState.isSubmitting ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                )}
                Save Student
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
