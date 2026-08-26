'use client';

import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { events, eventTypeLabels } from '@/lib/data/news-events-data';

export default function DashboardEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Events & Seminars Management
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Schedule academic seminars, workshops, and thesis defense presentations.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={() => alert('New Event modal')}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Schedule Event
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
            <tr>
              <th className="px-5 py-3.5">Event Title</th>
              <th className="px-5 py-3.5">Type</th>
              <th className="px-5 py-3.5">Date & Time</th>
              <th className="px-5 py-3.5">Venue / Mode</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((evt) => (
              <tr key={evt.slug} className="hover:bg-surface-muted/30">
                <td className="max-w-md px-5 py-4 font-semibold text-ink">
                  <div>
                    <span>{evt.title}</span>
                    <p className="font-mono text-[10px] text-muted-text">/events/{evt.slug}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge variant="secondary" className="bg-brand-navy/10 text-[10px] text-brand-navy">
                    {eventTypeLabels[evt.type]}
                  </Badge>
                </td>
                <td className="px-5 py-4 font-mono text-accent-cyan">
                  {evt.startAt.slice(0, 10)}
                </td>
                <td className="px-5 py-4 text-muted-text">
                  {evt.isOnline ? 'Online / Zoom' : evt.location || 'KUET Campus'}
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
    </div>
  );
}
