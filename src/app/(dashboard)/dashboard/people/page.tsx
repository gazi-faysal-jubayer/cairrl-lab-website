import { getAllDashboardPeople } from '@/lib/db/queries';
import { PeopleTable, type DashboardMemberRow } from '@/components/dashboard/people-table';

export const dynamic = 'force-dynamic';

export default async function DashboardPeoplePage() {
  const { faculty, students } = await getAllDashboardPeople();

  const formattedFaculty: DashboardMemberRow[] = faculty.map((f) => ({
    id: f.id,
    slug: f.slug,
    name: f.name,
    role: 'faculty',
    designation: f.designation,
    department: f.department,
    bio: f.bio,
    email: f.email,
    photoUrl: f.photoUrl,
    googleScholarUrl: f.googleScholarUrl,
    researchGateUrl: f.researchGateUrl,
    linkedinUrl: f.linkedinUrl,
    order: f.order,
    status: f.status as 'DRAFT' | 'PUBLISHED',
    researchAreas: f.researchAreas.map((a) => ({ id: a.id, name: a.name })),
  }));

  const formattedStudents: DashboardMemberRow[] = students.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    role: s.level === 'GRAD' ? 'graduate' : 'undergraduate',
    program: s.program,
    batchOrYear: s.batchOrYear,
    bio: s.bio,
    email: s.email,
    photoUrl: s.photoUrl,
    googleScholarUrl: s.googleScholarUrl,
    linkedinUrl: s.linkedinUrl,
    order: s.order,
    status: s.status as 'DRAFT' | 'PUBLISHED',
    researchAreas: s.researchAreas.map((a) => ({ id: a.id, name: a.name })),
  }));

  const allMembers = [...formattedFaculty, ...formattedStudents];

  return <PeopleTable initialMembers={allMembers} />;
}
