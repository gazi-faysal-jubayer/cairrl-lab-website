'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { facultySchema, studentSchema, type FacultyFormData, type StudentFormData } from '@/lib/validations/people';
import { saveFacultyMember, saveStudentMember } from '@/lib/actions/people-actions';

interface MemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function MemberDialog({ isOpen, onClose, onSuccess }: MemberDialogProps) {
  const [memberType, setMemberType] = useState<'faculty' | 'student'>('faculty');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const facultyForm = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      order: 1,
      status: 'PUBLISHED',
    },
  });

  const studentForm = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      level: 'UNDERGRAD',
      order: 1,
      status: 'PUBLISHED',
    },
  });

  if (!isOpen) return null;

  const onFacultySubmit = async (data: FacultyFormData) => {
    setErrorMsg(null);
    const res = await saveFacultyMember(data);
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
    const res = await saveStudentMember(data);
    if (res.success) {
      studentForm.reset();
      onSuccess?.();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to save student member.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-heading text-lg font-bold text-ink">Add Lab Member</h2>
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

        {/* Tab switch */}
        <div className="mt-4 flex gap-2 border-b border-border pb-3">
          <button
            type="button"
            onClick={() => setMemberType('faculty')}
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
            onClick={() => setMemberType('student')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
              memberType === 'student'
                ? 'bg-brand-navy text-white'
                : 'bg-surface-muted text-muted-text'
            }`}
          >
            Student Researcher
          </button>
        </div>

        {memberType === 'faculty' ? (
          <form onSubmit={facultyForm.handleSubmit(onFacultySubmit)} className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Full Name</label>
                <Input {...facultyForm.register('name')} placeholder="e.g. Dr. Jane Doe" className="text-xs" />
                {facultyForm.formState.errors.name && (
                  <p className="text-[11px] text-destructive">{facultyForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Slug</label>
                <Input {...facultyForm.register('slug')} placeholder="e.g. dr-jane-doe" className="text-xs font-mono" />
                {facultyForm.formState.errors.slug && (
                  <p className="text-[11px] text-destructive">{facultyForm.formState.errors.slug.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Designation</label>
                <Input {...facultyForm.register('designation')} placeholder="e.g. Associate Professor" className="text-xs" />
                {facultyForm.formState.errors.designation && (
                  <p className="text-[11px] text-destructive">{facultyForm.formState.errors.designation.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Department</label>
                <Input {...facultyForm.register('department')} placeholder="e.g. Mechanical Engineering" className="text-xs" />
                {facultyForm.formState.errors.department && (
                  <p className="text-[11px] text-destructive">{facultyForm.formState.errors.department.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Bio Summary</label>
              <Textarea {...facultyForm.register('bio')} rows={3} placeholder="Academic biography..." className="text-xs" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Email</label>
                <Input {...facultyForm.register('email')} type="email" placeholder="faculty@kuet.ac.bd" className="text-xs" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Google Scholar URL</label>
                <Input {...facultyForm.register('googleScholarUrl')} placeholder="https://scholar.google.com/..." className="text-xs" />
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
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Save Faculty
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Full Name</label>
                <Input {...studentForm.register('name')} placeholder="e.g. John Doe" className="text-xs" />
                {studentForm.formState.errors.name && (
                  <p className="text-[11px] text-destructive">{studentForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Slug</label>
                <Input {...studentForm.register('slug')} placeholder="e.g. john-doe" className="text-xs font-mono" />
                {studentForm.formState.errors.slug && (
                  <p className="text-[11px] text-destructive">{studentForm.formState.errors.slug.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Level</label>
                <select
                  {...studentForm.register('level')}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-ink"
                >
                  <option value="UNDERGRAD">Undergraduate</option>
                  <option value="GRAD">Graduate (M.Sc. / Ph.D.)</option>
                  <option value="ALUMNI">Alumni</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Program / Department</label>
                <Input {...studentForm.register('program')} placeholder="e.g. B.Sc. in Mechatronics" className="text-xs" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-ink">Bio / Research Focus</label>
              <Textarea {...studentForm.register('bio')} rows={3} placeholder="Research focus..." className="text-xs" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Email</label>
                <Input {...studentForm.register('email')} type="email" placeholder="student@kuet.ac.bd" className="text-xs" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Google Scholar URL</label>
                <Input {...studentForm.register('googleScholarUrl')} placeholder="https://scholar.google.com/..." className="text-xs" />
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
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Save Student
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
