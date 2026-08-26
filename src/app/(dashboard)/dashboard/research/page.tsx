'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { researchAreas, projects } from '@/lib/data/research-data';
import { cn } from '@/lib/utils';

export default function DashboardResearchPage() {
  const [tab, setTab] = useState<'areas' | 'projects'>('areas');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Research & Projects Management
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Configure laboratory research thrust areas and experimental projects.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={() => alert(`Add new ${tab === 'areas' ? 'Research Area' : 'Project'}`)}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add {tab === 'areas' ? 'Research Area' : 'Project'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-3">
        <button
          type="button"
          onClick={() => setTab('areas')}
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
            tab === 'areas'
              ? 'bg-brand-navy text-white'
              : 'bg-surface text-muted-text hover:bg-surface-muted hover:text-ink'
          )}
        >
          Research Areas ({researchAreas.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('projects')}
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
            tab === 'projects'
              ? 'bg-brand-navy text-white'
              : 'bg-surface text-muted-text hover:bg-surface-muted hover:text-ink'
          )}
        >
          Projects ({projects.length})
        </button>
      </div>

      {/* Content */}
      {tab === 'areas' ? (
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
              <tr>
                <th className="px-5 py-3.5">Area Title</th>
                <th className="px-5 py-3.5">Short Summary</th>
                <th className="px-5 py-3.5">Lead Faculty</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {researchAreas.map((area) => (
                <tr key={area.slug} className="hover:bg-surface-muted/30">
                  <td className="px-5 py-4 font-semibold text-ink">
                    <div>
                      <span>{area.name}</span>
                      <p className="font-mono text-[10px] text-muted-text">/research/{area.slug}</p>
                    </div>
                  </td>
                  <td className="max-w-md px-5 py-4 text-muted-text">
                    {area.shortDescription}
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-muted-text">
                    {area.facultySlugs.join(', ')}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
              <tr>
                <th className="px-5 py-3.5">Project Title</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Start Date</th>
                <th className="px-5 py-3.5">Areas</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((proj) => (
                <tr key={proj.slug} className="hover:bg-surface-muted/30">
                  <td className="px-5 py-4 font-semibold text-ink">
                    <div>
                      <span>{proj.title}</span>
                      <p className="font-mono text-[10px] text-muted-text">/research/projects/{proj.slug}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant="secondary"
                      className={cn(
                        'text-[10px]',
                        proj.status === 'ONGOING'
                          ? 'bg-accent-green/10 text-accent-green'
                          : 'bg-muted text-muted-text'
                      )}
                    >
                      {proj.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 font-mono text-muted-text">
                    {proj.startDate}
                  </td>
                  <td className="px-5 py-4 text-muted-text">
                    {proj.researchAreaSlugs.join(', ')}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
