/**
 * Static site data — hardcoded for Phases 2-5.
 * Will be replaced by database reads in Phase 6+.
 */

export const siteConfig = {
  name: 'CAIRRL Lab',
  fullName: 'Centre for Advanced Intelligent Robotics Research Laboratory',
  tagline:
    'Advancing Robotics, Control, and Intelligent Systems at the Intersection of Mechanical and Mechatronics Engineering',
  institution: 'Khulna University of Engineering & Technology (KUET)',
  departments: [
    'Department of Mechanical Engineering',
    'Department of Mechatronics Engineering',
  ],
  address: 'KUET, Khulna 9203, Bangladesh',
  contactEmail: 'cairrl@kuet.ac.bd',
  mission:
    'To advance the frontiers of robotics, control systems, and intelligent mechatronics through rigorous interdisciplinary research, fostering innovation that bridges theory and practice for real-world impact.',
  vision:
    'To become a leading interdisciplinary research hub in Bangladesh for robotics, automation, and intelligent systems — nurturing the next generation of engineers and researchers who will shape the future of technology.',
  foundingYear: 2026,
  socialLinks: {
    googleScholar: '#',
    researchGate: '#',
    linkedin: '#',
  },
} as const;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'People', href: '/people' },
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'News & Events', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Join Us', href: '/join-us' },
  { label: 'Contact', href: '/contact' },
] as const;

export const quickStats = [
  { label: 'Faculty', value: 2 },
  { label: 'Members', value: 7 },
  { label: 'Research Areas', value: 6 },
  { label: 'Active Projects', value: 0 },
] as const;
