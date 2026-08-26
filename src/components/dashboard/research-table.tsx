'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ResearchAreaDialog,
  type EditableResearchArea,
} from '@/components/dashboard/research-area-dialog';
import {
  ProjectDialog,
  type EditableProject,
} from '@/components/dashboard/project-dialog';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import {
  deleteResearchArea,
  deleteProject,
} from '@/lib/actions/research-actions';
import { cn } from '@/lib/utils';

export type DashboardAreaRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  coverImageUrl?: string | null;
  researcherCount: number;
  projectCount: number;
  publicationCount: number;
};

export type DashboardProjectRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: 'PLANNED' | 'ONGOING' | 'COMPLETED';
  coverImageUrl?: string | null;
  contentStatus: 'DRAFT' | 'PUBLISHED';
  researchAreas: { id: string; name: string }[];
};

type ResearchTableProps = {
  initialAreas: DashboardAreaRow[];
  initialProjects: DashboardProjectRow[];
};

export function ResearchTable({
  initialAreas,
  initialProjects,
}: ResearchTableProps) {
  const [tab, setTab] = useState<'areas' | 'projects'>('areas');
  const [areas, setAreas] = useState<DashboardAreaRow[]>(initialAreas);
  const [projects, setProjects] = useState<DashboardProjectRow[]>(initialProjects);

  // Area Dialog states
  const [areaDialogOpen, setAreaDialogOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<EditableResearchArea | null>(null);

  // Project Dialog states
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<EditableProject | null>(null);

  // Delete states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'area' | 'project';
    id: string;
    name: string;
  } | null>(null);

  const handleAddClick = () => {
    if (tab === 'areas') {
      setEditingArea(null);
      setAreaDialogOpen(true);
    } else {
      setEditingProject(null);
      setProjectDialogOpen(true);
    }
  };

  const handleEditArea = (area: DashboardAreaRow) => {
    setEditingArea(area);
    setAreaDialogOpen(true);
  };

  const handleEditProject = (project: DashboardProjectRow) => {
    setEditingProject(project);
    setProjectDialogOpen(true);
  };

  const handleDeleteClick = (type: 'area' | 'project', id: string, name: string) => {
    setItemToDelete({ type, id, name });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === 'area') {
      await deleteResearchArea(itemToDelete.id);
      setAreas((prev) => prev.filter((a) => a.id !== itemToDelete.id));
    } else {
      await deleteProject(itemToDelete.id);
      setProjects((prev) => prev.filter((p) => p.id !== itemToDelete.id));
    }
    setItemToDelete(null);
  };

  return (
    <div className="space-y-6">
      <ResearchAreaDialog
        isOpen={areaDialogOpen}
        area={editingArea}
        onClose={() => setAreaDialogOpen(false)}
        onSuccess={() => window.location.reload()}
      />

      <ProjectDialog
        isOpen={projectDialogOpen}
        project={editingProject}
        onClose={() => setProjectDialogOpen(false)}
        onSuccess={() => window.location.reload()}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        title={`Delete ${itemToDelete?.type === 'area' ? 'Research Area' : 'Project'}?`}
        description={`Are you sure you want to delete "${itemToDelete?.name}"? This action will remove its page and references immediately.`}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Research &amp; Projects Management
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Configure laboratory research thrust areas and experimental projects in Neon Postgres.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={handleAddClick}
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
          Research Areas ({areas.length})
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
                <th className="px-5 py-3.5">Description</th>
                <th className="px-5 py-3.5">Counts</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {areas.map((area) => (
                <tr key={area.id} className="transition-colors hover:bg-surface-muted/30">
                  <td className="px-5 py-4 font-semibold text-ink">
                    <div>
                      <span>{area.name}</span>
                      <p className="font-mono text-[10px] text-muted-text">
                        /research/{area.slug}
                      </p>
                    </div>
                  </td>
                  <td className="max-w-md px-5 py-4 text-muted-text line-clamp-2">
                    {area.description}
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-muted-text">
                    <span className="text-accent-cyan font-bold">{area.researcherCount}</span> researchers •{' '}
                    <span className="text-accent-green font-bold">{area.projectCount}</span> projects
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-ink"
                        onClick={() => handleEditArea(area)}
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-destructive"
                        onClick={() => handleDeleteClick('area', area.id, area.name)}
                        title="Delete"
                      >
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
                <th className="px-5 py-3.5">Summary</th>
                <th className="px-5 py-3.5">Research Areas</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((proj) => (
                <tr key={proj.id} className="transition-colors hover:bg-surface-muted/30">
                  <td className="px-5 py-4 font-semibold text-ink">
                    <div>
                      <span>{proj.title}</span>
                      <p className="font-mono text-[10px] text-muted-text">
                        /research/projects/{proj.slug}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant="secondary"
                      className={cn(
                        'text-[10px]',
                        proj.status === 'ONGOING'
                          ? 'bg-accent-green/10 text-accent-green'
                          : proj.status === 'COMPLETED'
                            ? 'bg-muted text-muted-text'
                            : 'bg-amber-500/10 text-amber-600'
                      )}
                    >
                      {proj.status}
                    </Badge>
                  </td>
                  <td className="max-w-xs px-5 py-4 text-muted-text line-clamp-2">
                    {proj.summary}
                  </td>
                  <td className="px-5 py-4 text-muted-text">
                    <div className="flex flex-wrap gap-1">
                      {proj.researchAreas.map((a) => (
                        <span
                          key={a.id}
                          className="rounded bg-surface-muted px-1.5 py-0.5 text-[10px] text-muted-text"
                        >
                          {a.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-ink"
                        onClick={() => handleEditProject(proj)}
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-destructive"
                        onClick={() => handleDeleteClick('project', proj.id, proj.title)}
                        title="Delete"
                      >
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
