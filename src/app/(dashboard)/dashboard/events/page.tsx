import { getAllDashboardEvents } from '@/lib/db/queries';
import { EventsTable, type DashboardEventRow } from '@/components/dashboard/events-table';

export const dynamic = 'force-dynamic';

export default async function DashboardEventsPage() {
  const rawEvents = await getAllDashboardEvents();

  const formattedEvents: DashboardEventRow[] = rawEvents.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    type: e.type,
    description: e.description,
    startAt: e.startAt.toISOString(),
    endAt: e.endAt ? e.endAt.toISOString() : null,
    location: e.location,
    isOnline: e.isOnline,
    coverImageUrl: e.coverImageUrl,
    status: e.status,
  }));

  return <EventsTable initialEvents={formattedEvents} />;
}
