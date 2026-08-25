/**
 * Static people data — sourced from PRD.md §13.
 * Never fabricate bios, titles, or research interests (Rules.md §8).
 * Will be replaced by database reads in Phase 6+.
 */

export type PersonRole = 'faculty' | 'graduate' | 'undergraduate';

export interface Person {
  slug: string;
  name: string;
  role: PersonRole;
  designation?: string;
  department?: string;
  program?: string;
  batchOrYear?: string;
  bio?: string;
  researchInterests: string[];
  photoUrl?: string;
  email?: string;
  googleScholarUrl?: string;
  researchGateUrl?: string;
  linkedinUrl?: string;
}

export const people: Person[] = [
  // ── Faculty ──
  {
    slug: 'md-helal-an-nahiyan',
    name: 'Md. Helal-An-Nahiyan',
    role: 'faculty',
    designation: '[PLACEHOLDER: designation needed]',
    department: 'Mechanical Engineering, KUET',
    bio: '[PLACEHOLDER: faculty bio needed]',
    researchInterests: [
      'Robotics & Control',
      'Mechatronics',
      'Additive Manufacturing',
    ],
    googleScholarUrl:
      'https://scholar.google.com/citations?user=rkOGMxgAAAAJ&hl=en',
  },
  {
    slug: 'priyo-nath-roy',
    name: 'Priyo Nath Roy',
    role: 'faculty',
    designation: '[PLACEHOLDER: designation needed]',
    department: 'Mechatronics Engineering, KUET',
    bio: '[PLACEHOLDER: faculty bio needed]',
    researchInterests: [
      'Industrial Robot Control',
      'UAV/eVTOL Control',
      'IoT',
    ],
    googleScholarUrl:
      'https://scholar.google.com/citations?user=l8HwgY8AAAAJ&hl=en',
  },

  // ── Graduate Student Researchers ──
  {
    slug: 'mashrul',
    name: 'Mashrul',
    role: 'graduate',
    program: '[PLACEHOLDER: degree program needed]',
    bio: '[PLACEHOLDER: bio needed — confirm full name before publishing]',
    researchInterests: [],
  },

  // ── Undergraduate Student Researchers ──
  {
    slug: 'hafizur-rahman',
    name: 'Hafizur Rahman',
    role: 'undergraduate',
    batchOrYear: '[PLACEHOLDER: batch/year needed]',
    researchInterests: [],
  },
  {
    slug: 'gazi-foysal',
    name: 'Gazi Foysal',
    role: 'undergraduate',
    batchOrYear: '[PLACEHOLDER: batch/year needed]',
    researchInterests: [],
  },
  {
    slug: 'rahat',
    name: 'Rahat',
    role: 'undergraduate',
    batchOrYear: '[PLACEHOLDER: batch/year needed]',
    bio: '[PLACEHOLDER: confirm full name before publishing]',
    researchInterests: [],
  },
  {
    slug: 'sojib',
    name: 'Sojib',
    role: 'undergraduate',
    batchOrYear: '[PLACEHOLDER: batch/year needed]',
    bio: '[PLACEHOLDER: confirm full name before publishing]',
    researchInterests: [],
  },
];

export const faculty = people.filter((p) => p.role === 'faculty');
export const graduateStudents = people.filter((p) => p.role === 'graduate');
export const undergraduateStudents = people.filter(
  (p) => p.role === 'undergraduate'
);
