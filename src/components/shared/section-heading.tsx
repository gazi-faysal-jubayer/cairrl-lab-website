import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  description,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-[1.875rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-lg text-muted-text">
          {description}
        </p>
      )}
    </div>
  );
}
