import { getAllDashboardPublications } from '@/lib/db/queries';
import {
  PublicationsTable,
  type DashboardPublicationRow,
} from '@/components/dashboard/publications-table';

export const dynamic = 'force-dynamic';

export default async function DashboardPublicationsPage() {
  const rawPublications = await getAllDashboardPublications();

  const formattedPubs: DashboardPublicationRow[] = rawPublications.map((p) => ({
    id: p.id,
    title: p.title,
    authors: p.authors,
    venue: p.venue,
    year: p.year,
    type: p.type,
    abstract: p.abstract,
    doiOrLink: p.doiOrLink,
    pdfUrl: p.pdfUrl,
    featured: p.featured,
    status: p.status,
    researchAreas: p.researchAreas.map((a) => ({ id: a.id, name: a.name })),
  }));

  return <PublicationsTable initialPublications={formattedPubs} />;
}
