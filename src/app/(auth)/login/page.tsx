'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { siteConfig } from '@/lib/data/site-data';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid institutional email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'cairrl@kuet.ac.bd',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    try {
      // Simulate authentication verification
      if (data.email === 'cairrl@kuet.ac.bd') {
        router.push('/dashboard');
      } else {
        setAuthError('Invalid credentials. Please use your registered lab administrator account.');
      }
    } catch {
      setAuthError('An error occurred during authentication. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy px-4 py-12">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-surface/95 p-8 shadow-2xl backdrop-blur-md md:p-10">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-accent-cyan shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-ink">
              {siteConfig.name} Portal
            </h1>
            <p className="mt-1 text-xs text-muted-text">
              Administrative & Editorial Content Management
            </p>
          </div>

          {/* Error Alert */}
          {authError && (
            <div className="mt-6 flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
            <div>
              <label
                htmlFor="login-email"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink"
              >
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="name@kuet.ac.bd"
                  {...register('email')}
                  className="pl-9"
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-error">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="pl-9"
                  aria-invalid={!!errors.password}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-error">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full bg-brand-navy text-white hover:bg-brand-navy-hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-text">
            <Link
              href="/"
              className="text-accent-cyan transition-colors hover:text-accent-cyan-hover hover:underline"
            >
              ← Return to CAIRRL Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
