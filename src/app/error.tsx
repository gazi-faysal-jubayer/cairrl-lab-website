'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertOctagon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/shared';
import { cn } from '@/lib/utils';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-surface py-20">
      <Container className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertOctagon className="h-10 w-10 text-destructive" />
        </div>

        <p className="mt-6 font-mono text-sm font-semibold tracking-widest text-destructive uppercase">
          Application Error
        </p>

        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-5xl">
          System Interruption
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-text">
          An unexpected error occurred while processing this request. Our engineering logs have captured the event.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => reset()}
            className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link
            href="/"
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Safety
          </Link>
        </div>
      </Container>
    </div>
  );
}
