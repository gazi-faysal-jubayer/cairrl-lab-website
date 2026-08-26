'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Calendar, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EventDialog, type EditableEvent } from '@/components/dashboard/event-dialog';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import { deleteEvent } from '@/lib/actions/event-actions';
import { cn } from '@/lib/utils';

export type DashboardEventRow = {
  id: string;
  slug: string;
  title: string;
  type: 'SEMINAR' | 'TALK' | 'WORKSHOP' | 'DEFENSE' | 'OTHER';
  description: string;
  startAt: string;
  endAt?: string | null;
  location?: string | null;
  isOnline: boolean;
  coverImageUrl?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
};

type EventsTableProps = {
  initialEvents: DashboardEventRow[];
};

export function EventsTable({ initialEvents }: EventsTableProps) {
  const [events, setEvents] = useState<DashboardEventRow[]>(initialEvents);
  const [search, setSearch] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EditableEvent | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<DashboardEventRow | null>(null);

  const filteredEvents = events.filter((e) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return e.title.toLowerCase().includes(q) || (e.location && e.location.toLowerCase().includes(q));
    }
    return true;
  });

  const handleEdit = (ev: DashboardEventRow) => {
    setEditingEvent(ev);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingEvent(null);
    setDialogOpen(true);
  };

  const handleDeleteClick = (ev: DashboardEventRow) => {
    setEventToDelete(ev);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    await deleteEvent(eventToDelete.id);
    setEvents((prev) => prev.filter((e) => e.id !== eventToDelete.id));
    setEventToDelete(null);
  };

  return (
    <div className="space-y-6">
      <EventDialog
        isOpen={dialogOpen}
        event={editingEvent}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => window.location.reload()}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        title="Cancel & Delete Event?"
        description={`Are you sure you want to delete "${eventToDelete?.title}"? This will immediately remove it from the lab events calendar.`}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Events &amp; Seminars</h1>
          <p className="mt-1 text-xs text-muted-text">
            Schedule laboratory seminars, thesis defenses, and workshops in Neon Postgres.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={handleAdd}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Schedule Event
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
        <Input
          type="search"
          placeholder="Search events by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-xs"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
              <tr>
                <th className="px-5 py-3.5">Title &amp; Type</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date &amp; Time</th>
                <th className="px-5 py-3.5">Venue</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEvents.map((event) => {
                const date = new Date(event.startAt);
                return (
                  <tr key={event.id} className="transition-colors hover:bg-surface-muted/30">
                    <td className="max-w-md px-5 py-4 font-semibold text-ink">
                      <div>
                        <span>{event.title}</span>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="secondary" className="bg-accent-cyan/10 text-[9px] text-accent-cyan">
                            {event.type}
                          </Badge>
                          {event.isOnline && (
                            <Badge variant="secondary" className="bg-emerald-500/10 text-[9px] text-emerald-600">
                              <Globe className="mr-1 h-2.5 w-2.5" /> Online
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[9px]',
                          event.status === 'PUBLISHED'
                            ? 'border-accent-green/40 text-accent-green bg-accent-green/5'
                            : 'border-amber-500/40 text-amber-600 bg-amber-500/5'
                        )}
                      >
                        {event.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 font-mono text-muted-text">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-accent-cyan" />
                        <span>
                          {date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="text-[10px] text-muted-text/70">
                          {date.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-text">
                      {event.location || (event.isOnline ? 'Online Meeting' : 'KUET')}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-text hover:text-ink"
                          onClick={() => handleEdit(event)}
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-text hover:text-destructive"
                          onClick={() => handleDeleteClick(event)}
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
