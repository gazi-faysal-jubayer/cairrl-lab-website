import { getResearchAreas, getAllDashboardProjects } from '@/lib/db/queries';
import {
  ResearchTable,
  type DashboardAreaRow,
  type DashboardProjectRow,
} from '@/components/dashboard/research-table';

export const dynamic = 'force-dynamic';

export default async function DashboardResearchPage() {
  const [rawAreas, rawProjects] = await Promise.all([
    getResearchAreas(),
    getAllDashboardProjects(),
  ]);

  const formattedAreas: DashboardAreaRow[] = rawAreas.map((a) => ({
    id: a.id,
    slug: a.slug,
    name: a.name,
    description: a.description,
    coverImageUrl: a.coverImageUrl,
    researcherCount: a.faculty.length + a.students.length,
    projectCount: a.projects.length,
    publicationCount: a.publications.length,
  }));

  const formattedProjects: DashboardProjectRow[] = rawProjects.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    description: p.description,
    status: p.status,
    coverImageUrl: p.coverImageUrl,
    contentStatus: p.contentStatus,
    researchAreas: p.researchAreas.map((a) => ({ id: a.id, name: a.name })),
  }));

  return (
    <ResearchTable
      initialAreas={formattedAreas}
      initialProjects={formattedProjects}
    />
  );
}
