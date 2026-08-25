import Link from 'next/link';
import { User, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Person } from '@/lib/data/people-data';

interface PersonCardProps {
  person: Person;
  className?: string;
}

export function PersonCard({ person, className }: PersonCardProps) {
  return (
    <Link
      href={`/people/${person.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-shadow duration-200 hover:shadow-md',
        className
      )}
    >
      {/* Photo / Placeholder */}
      <div className="relative aspect-square w-full overflow-hidden bg-surface-muted">
        {person.photoUrl ? (
          // Will use next/image once real photos are available
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${person.photoUrl})` }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-16 w-16 text-muted-text/30" strokeWidth={1} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-semibold text-ink transition-colors duration-150 group-hover:text-accent-cyan">
          {person.name}
        </h3>

        {person.designation && !person.designation.startsWith('[PLACEHOLDER') && (
          <p className="mt-0.5 text-sm text-muted-text">{person.designation}</p>
        )}

        {person.department && (
          <p className="mt-0.5 text-xs text-muted-text">{person.department}</p>
        )}

        {person.program && !person.program.startsWith('[PLACEHOLDER') && (
          <p className="mt-0.5 text-xs text-muted-text">{person.program}</p>
        )}

        {/* Research interest tags */}
        {person.researchInterests.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {person.researchInterests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="bg-accent-cyan/10 text-xs text-accent-cyan"
              >
                {interest}
              </Badge>
            ))}
          </div>
        )}

        {/* Scholar link */}
        {person.googleScholarUrl && (
          <div className="mt-auto pt-3">
            <span className="inline-flex items-center gap-1 text-xs text-muted-text transition-colors duration-150 group-hover:text-accent-cyan">
              <ExternalLink className="h-3 w-3" />
              Google Scholar
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
