import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-surface py-20">
      <Container className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-navy/10 text-brand-navy">
          <Compass className="h-10 w-10 text-accent-cyan" />
        </div>

        <p className="mt-6 font-mono text-sm font-semibold tracking-widest text-accent-cyan uppercase">
          404 Error — Page Not Found
        </p>

        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-5xl">
          Coordinate Mismatch
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-text">
          The requested page or research document could not be located in the CAIRRL Lab directory.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-brand-navy text-white hover:bg-brand-navy-hover'
            )}
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Link>
          <Link
            href="/research"
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse Research
          </Link>
        </div>
      </Container>
    </div>
  );
}
