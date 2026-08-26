'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MemberDialog, type EditableMember } from '@/components/dashboard/member-dialog';
import { DeleteConfirmDialog } from '@/components/dashboard/delete-confirm-dialog';
import { deleteFacultyMember, deleteStudentMember } from '@/lib/actions/people-actions';
import { cn } from '@/lib/utils';

export type DashboardMemberRow = {
  id: string;
  slug: string;
  name: string;
  role: 'faculty' | 'graduate' | 'undergraduate';
  designation?: string | null;
  department?: string | null;
  program?: string | null;
  batchOrYear?: string | null;
  bio?: string | null;
  email?: string | null;
  photoUrl?: string | null;
  googleScholarUrl?: string | null;
  researchGateUrl?: string | null;
  linkedinUrl?: string | null;
  order: number;
  status: 'DRAFT' | 'PUBLISHED';
  researchAreas: { id: string; name: string }[];
};

type PeopleTableProps = {
  initialMembers: DashboardMemberRow[];
};

export function PeopleTable({ initialMembers }: PeopleTableProps) {
  const [members, setMembers] = useState<DashboardMemberRow[]>(initialMembers);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<EditableMember | null>(null);

  // Delete states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<DashboardMemberRow | null>(null);

  const filteredMembers = members.filter((m) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        m.name.toLowerCase().includes(q) ||
        (m.department && m.department.toLowerCase().includes(q)) ||
        (m.program && m.program.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedRole !== 'ALL' && m.role !== selectedRole) {
      return false;
    }
    return true;
  });

  const handleEdit = (member: DashboardMemberRow) => {
    setEditingMember(member);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingMember(null);
    setDialogOpen(true);
  };

  const handleDeleteClick = (member: DashboardMemberRow) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;
    if (memberToDelete.role === 'faculty') {
      await deleteFacultyMember(memberToDelete.id);
    } else {
      await deleteStudentMember(memberToDelete.id);
    }
    setMembers((prev) => prev.filter((m) => m.id !== memberToDelete.id));
    setMemberToDelete(null);
  };

  return (
    <div className="space-y-6">
      <MemberDialog
        isOpen={dialogOpen}
        member={editingMember}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          // Trigger full server-side refresh
          window.location.reload();
        }}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        title={`Remove ${memberToDelete?.name}?`}
        description="Are you sure you want to delete this lab member profile? This action will immediately remove their profile page and unassign their publications."
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* ─── Header ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Lab Members Management
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Manage faculty profiles, graduate researchers, and undergraduate team members in Neon Postgres.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={handleAdd}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* ─── Filters & Search ─── */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
          <Input
            type="search"
            placeholder="Search members by name or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-text">Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-ink shadow-sm focus:border-accent-cyan focus:outline-none"
          >
            <option value="ALL">All Roles ({members.length})</option>
            <option value="faculty">Faculty ({members.filter((m) => m.role === 'faculty').length})</option>
            <option value="graduate">Graduate ({members.filter((m) => m.role === 'graduate').length})</option>
            <option value="undergraduate">Undergraduate ({members.filter((m) => m.role === 'undergraduate').length})</option>
          </select>
        </div>
      </div>

      {/* ─── Table ─── */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-surface-muted/50 font-mono font-semibold uppercase tracking-wider text-muted-text">
              <tr>
                <th className="px-5 py-3.5">Member Name</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Department / Program</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="transition-colors hover:bg-surface-muted/30">
                  <td className="px-5 py-4 font-semibold text-ink">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-brand-navy/10">
                        {member.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={member.photoUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-text">
                            <User className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span>{member.name}</span>
                        <p className="font-mono text-[10px] text-muted-text">/people/{member.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant="secondary"
                      className={cn(
                        'text-[10px]',
                        member.role === 'faculty'
                          ? 'bg-brand-navy/10 text-brand-navy'
                          : member.role === 'graduate'
                            ? 'bg-accent-cyan/10 text-accent-cyan'
                            : 'bg-muted text-muted-text'
                      )}
                    >
                      {member.role.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-muted-text">
                    {member.designation || member.program || member.department || 'KUET'}
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-[9px]',
                        member.status === 'PUBLISHED'
                          ? 'border-accent-green/40 text-accent-green bg-accent-green/5'
                          : 'border-amber-500/40 text-amber-600 bg-amber-500/5'
                      )}
                    >
                      {member.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-ink"
                        onClick={() => handleEdit(member)}
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-destructive"
                        onClick={() => handleDeleteClick(member)}
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
      </div>
    </div>
  );
}
