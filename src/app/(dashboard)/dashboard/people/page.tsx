'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { people } from '@/lib/data/people-data';
import { cn } from '@/lib/utils';

export default function DashboardPeoplePage() {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');

  const filteredMembers = people.filter((m) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!m.name.toLowerCase().includes(q) && !(m.department && m.department.toLowerCase().includes(q))) {
        return false;
      }
    }
    if (selectedRole !== 'ALL' && m.role !== selectedRole) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* ─── Header ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Lab Members Management
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Manage faculty profiles, graduate researchers, and undergraduate team members.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-brand-navy text-white hover:bg-brand-navy-hover"
          onClick={() => alert('Add Member modal will connect to server actions in Phase 8.')}
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
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-ink shadow-sm"
          >
            <option value="ALL">All Roles</option>
            <option value="faculty">Faculty</option>
            <option value="graduate">Graduate Students</option>
            <option value="undergraduate">Undergraduate Students</option>
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
                <th className="px-5 py-3.5">Research Interests</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMembers.map((member) => (
                <tr key={member.slug} className="transition-colors hover:bg-surface-muted/30">
                  <td className="px-5 py-4 font-semibold text-ink">
                    <div>
                      <span>{member.name}</span>
                      <p className="font-mono text-[10px] text-muted-text">/people/{member.slug}</p>
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
                    {member.department || member.program || 'KUET'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {member.researchInterests.length > 0 ? (
                        member.researchInterests.map((interest) => (
                          <span
                            key={interest}
                            className="rounded bg-surface-muted px-1.5 py-0.5 text-[10px] text-muted-text"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] italic text-muted-text/50">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-ink"
                        onClick={() => alert(`Editing ${member.name}`)}
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-text hover:text-destructive"
                        onClick={() => alert(`Delete confirmation for ${member.name}`)}
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
