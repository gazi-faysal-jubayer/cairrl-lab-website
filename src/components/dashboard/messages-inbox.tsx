'use client';

import { useState } from 'react';
import { Mail, MailOpen, Trash2, X, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import { markMessageRead, deleteMessage } from '@/lib/actions/message-actions';

export type DashboardMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

type MessagesInboxProps = {
  initialMessages: DashboardMessage[];
};

export function MessagesInbox({ initialMessages }: MessagesInboxProps) {
  const [messages, setMessages] = useState<DashboardMessage[]>(initialMessages);
  const [selectedMsg, setSelectedMsg] = useState<DashboardMessage | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [msgToDelete, setMsgToDelete] = useState<DashboardMessage | null>(null);

  const handleOpenMessage = async (msg: DashboardMessage) => {
    setSelectedMsg(msg);
    if (!msg.read) {
      await markMessageRead(msg.id, true);
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
    }
  };

  const handleToggleRead = async (msg: DashboardMessage) => {
    const nextRead = !msg.read;
    await markMessageRead(msg.id, nextRead);
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, read: nextRead } : m))
    );
  };

  const handleDeleteClick = (msg: DashboardMessage) => {
    setMsgToDelete(msg);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!msgToDelete) return;
    await deleteMessage(msgToDelete.id);
    setMessages((prev) => prev.filter((m) => m.id !== msgToDelete.id));
    if (selectedMsg?.id === msgToDelete.id) {
      setSelectedMsg(null);
    }
    setMsgToDelete(null);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Inquiry Message?"
        description="Are you sure you want to remove this message from the contact inbox?"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Contact Inquiries Inbox
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Review inquiries submitted through the public Contact page in Neon Postgres.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={
              unreadCount > 0
                ? 'bg-accent-cyan text-white'
                : 'bg-surface-muted text-muted-text'
            }
          >
            {unreadCount} Unread
          </Badge>
          <span className="font-mono text-xs text-muted-text">
            Total: {messages.length}
          </span>
        </div>
      </div>

      {/* Table & Viewer */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* List */}
        <div className={selectedMsg ? 'lg:col-span-7' : 'lg:col-span-12'}>
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
                  <tr>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Sender</th>
                    <th className="px-4 py-3.5">Subject</th>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {messages.map((msg) => (
                    <tr
                      key={msg.id}
                      onClick={() => handleOpenMessage(msg)}
                      className={`cursor-pointer transition-colors ${
                        !msg.read ? 'bg-accent-cyan/5 font-semibold text-ink' : 'text-muted-text hover:bg-surface-muted/30'
                      } ${selectedMsg?.id === msg.id ? 'bg-surface-muted' : ''}`}
                    >
                      <td className="px-4 py-3.5">
                        {msg.read ? (
                          <MailOpen className="h-4 w-4 text-muted-text/40" />
                        ) : (
                          <Mail className="h-4 w-4 text-accent-cyan" />
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div>
                          <span className="text-ink">{msg.name}</span>
                          <p className="font-mono text-[10px] text-muted-text">{msg.email}</p>
                        </div>
                      </td>
                      <td className="max-w-xs px-4 py-3.5 line-clamp-1">
                        {msg.subject || '(No Subject)'}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[10px] text-muted-text whitespace-nowrap">
                        {new Date(msg.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-text hover:text-ink"
                            onClick={() => handleToggleRead(msg)}
                            title={msg.read ? 'Mark as unread' : 'Mark as read'}
                          >
                            {msg.read ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-text hover:text-destructive"
                            onClick={() => handleDeleteClick(msg)}
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-xs text-muted-text">
                        No contact messages in inbox.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Message Viewer Drawer / Modal */}
        {selectedMsg && (
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-heading text-base font-bold text-ink">
                  {selectedMsg.subject || '(No Subject)'}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedMsg(null)}
                  className="rounded p-1 text-muted-text hover:bg-surface-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-text">
                  <User className="h-3.5 w-3.5 text-accent-cyan" />
                  <strong className="text-ink">{selectedMsg.name}</strong> &lt;{selectedMsg.email}&gt;
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-text">
                  <Calendar className="h-3.5 w-3.5 text-accent-cyan" />
                  <span>{new Date(selectedMsg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-surface-muted/50 p-4 text-xs leading-relaxed text-ink whitespace-pre-wrap">
                {selectedMsg.message}
              </div>

              <div className="mt-6 flex justify-between border-t border-border pt-4">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject || 'CAIRRL Lab Inquiry')}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-navy-hover"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Reply via Email
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleDeleteClick(selectedMsg)}
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
