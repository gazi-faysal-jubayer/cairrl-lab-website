'use client';

import { useState } from 'react';
import { Mail, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MockMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const mockMessages: MockMessage[] = [
  {
    id: 'msg-01',
    name: 'Dr. A. Rahman',
    email: 'arahman@university.edu',
    subject: 'Potential Joint Research on Robotic Manipulation',
    message:
      'Dear CAIRRL Team, We noticed your recent work in nonlinear adaptive control and would like to explore collaborative research on robotic harvesting mechanisms.',
    date: '2026-08-25',
    read: false,
  },
  {
    id: 'msg-02',
    name: 'Tanvir Hossain',
    email: 'tanvir@student.kuet.ac.bd',
    subject: 'Undergraduate Thesis Supervision Inquiry for 2026',
    message:
      'Respected Faculty, I am a 4th-year Mechatronics student interested in working on UAV attitude control under external wind gusts.',
    date: '2026-08-24',
    read: true,
  },
];

export default function DashboardMessagesPage() {
  const [messages] = useState<MockMessage[]>(mockMessages);
  const [activeMessage, setActiveMessage] = useState<MockMessage | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Contact Form Submissions
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Inquiries received through the public contact form.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
            <tr>
              <th className="px-5 py-3.5">Sender</th>
              <th className="px-5 py-3.5">Subject</th>
              <th className="px-5 py-3.5">Date</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-surface-muted/30">
                <td className="px-5 py-4 font-semibold text-ink">
                  <div>
                    <span>{msg.name}</span>
                    <p className="font-mono text-[10px] text-muted-text">{msg.email}</p>
                  </div>
                </td>
                <td className="max-w-xs px-5 py-4 text-ink">
                  <p className="font-medium">{msg.subject}</p>
                  <p className="line-clamp-1 text-[11px] text-muted-text">{msg.message}</p>
                </td>
                <td className="px-5 py-4 font-mono text-muted-text">
                  {msg.date}
                </td>
                <td className="px-5 py-4">
                  <Badge
                    variant="secondary"
                    className={
                      msg.read
                        ? 'bg-surface-muted text-muted-text'
                        : 'bg-accent-cyan/10 text-accent-cyan font-bold'
                    }
                  >
                    {msg.read ? 'Read' : '● New'}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-accent-cyan"
                      onClick={() => setActiveMessage(msg)}
                      title="View Message"
                    >
                      <Eye className="h-3.5 w-3.5" />
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

      {/* Detail Dialog */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-surface p-6 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-ink">{activeMessage.subject}</h3>
            <p className="mt-1 text-xs text-muted-text">
              From: <strong className="text-ink">{activeMessage.name}</strong> ({activeMessage.email}) on {activeMessage.date}
            </p>

            <div className="mt-4 rounded-lg bg-surface-muted p-4 text-xs leading-relaxed text-ink">
              {activeMessage.message}
            </div>

            <div className="mt-6 flex justify-between">
              <a
                href={`mailto:${activeMessage.email}?subject=Re: ${activeMessage.subject}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                Reply via Email
              </a>
              <Button size="sm" variant="outline" onClick={() => setActiveMessage(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
