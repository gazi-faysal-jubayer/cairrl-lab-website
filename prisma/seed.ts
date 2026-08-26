/**
 * Prisma database seed script.
 * Sourced strictly from PRD.md §13 and initial lab datasets.
 * Never invent people or content (Rules.md §8).
 */

import { PrismaClient, UserRole, StudentLevel, ContentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding CAIRRL Lab database...');

  // 1. Initial Admin User for dashboard access
  const adminUser = await prisma.user.upsert({
    where: { email: 'cairrl@kuet.ac.bd' },
    update: {},
    create: {
      name: 'CAIRRL Admin',
      email: 'cairrl@kuet.ac.bd',
      role: UserRole.ADMIN,
    },
  });
  console.log('Created/Verified admin user:', adminUser.email);

  // 2. Site Setting Singleton
  await prisma.siteSetting.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      labFullName: 'Centre for Advanced Intelligent Robotics Research Laboratory',
      labShortName: 'CAIRRL Lab',
      tagline:
        'Advancing Robotics, Control, and Intelligent Systems at the Intersection of Mechanical and Mechatronics Engineering',
      missionStatement:
        'To advance the frontiers of robotics, control systems, and intelligent mechatronics through rigorous interdisciplinary research, fostering innovation that bridges theory and practice for real-world impact.',
      address: 'KUET, Khulna 9203, Bangladesh',
      contactEmail: 'cairrl@kuet.ac.bd',
      phone: '+880-41-769468',
      socialLinks: {
        googleScholar: 'https://scholar.google.com',
        researchGate: 'https://researchgate.net',
        linkedin: 'https://linkedin.com',
      },
    },
  });

  // 3. Research Areas
  const researchAreaData = [
    {
      slug: 'robotics-and-control',
      name: 'Robotics & Control',
      description:
        'Advanced kinematic, dynamic modeling, and modern nonlinear control algorithms for robotic manipulators and autonomous mobile platforms.',
    },
    {
      slug: 'mechatronics-systems',
      name: 'Mechatronics Systems',
      description:
        'Synergistic integration of precision mechanical engineering, sensors, actuators, and embedded microcontroller systems.',
    },
    {
      slug: 'additive-manufacturing',
      name: 'Additive Manufacturing',
      description:
        '3D printing processes, custom rapid-prototyping robotics, and material characterization for precision engineering.',
    },
    {
      slug: 'aerial-robotics-and-uav',
      name: 'Aerial Robotics / UAV Control',
      description:
        'Flight dynamics, autonomous navigation, and non-linear stabilization control for multirotors and eVTOL platforms.',
    },
    {
      slug: 'industrial-automation',
      name: 'Industrial Automation',
      description:
        'Smart manufacturing, PLC-based process automation, industrial manipulator programming, and digital twin systems.',
    },
    {
      slug: 'iot-and-embedded-systems',
      name: 'IoT & Embedded Systems',
      description:
        'Low-power microcontroller architectures, edge sensor networks, and wireless telemetry for intelligent cyber-physical systems.',
    },
  ];

  for (const area of researchAreaData) {
    await prisma.researchArea.upsert({
      where: { slug: area.slug },
      update: { name: area.name, description: area.description },
      create: area,
    });
  }

  // 4. Faculty Members (PRD.md §13)
  const facultyMembers = [
    {
      slug: 'md-helal-an-nahiyan',
      name: 'Md. Helal-An-Nahiyan',
      designation: 'Faculty Member',
      department: 'Mechanical Engineering, KUET',
      bio: '[PLACEHOLDER: faculty bio needed]',
      googleScholarUrl: 'https://scholar.google.com/citations?user=rkOGMxgAAAAJ&hl=en',
      order: 1,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: 'priyo-nath-roy',
      name: 'Priyo Nath Roy',
      designation: 'Faculty Member',
      department: 'Mechatronics Engineering, KUET',
      bio: '[PLACEHOLDER: faculty bio needed]',
      googleScholarUrl: 'https://scholar.google.com/citations?user=l8HwgY8AAAAJ&hl=en',
      order: 2,
      status: ContentStatus.PUBLISHED,
    },
  ];

  for (const fac of facultyMembers) {
    await prisma.facultyMember.upsert({
      where: { slug: fac.slug },
      update: fac,
      create: fac,
    });
  }

  // 5. Student Members (PRD.md §13)
  const studentMembers = [
    {
      slug: 'mashrul',
      name: 'Mashrul',
      level: StudentLevel.GRAD,
      program: 'Graduate Researcher',
      bio: '[PLACEHOLDER: bio needed — confirm full name before publishing]',
      order: 1,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: 'hafizur-rahman',
      name: 'Hafizur Rahman',
      level: StudentLevel.UNDERGRAD,
      program: 'Undergraduate Researcher',
      order: 2,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: 'gazi-foysal',
      name: 'Gazi Foysal',
      level: StudentLevel.UNDERGRAD,
      program: 'Undergraduate Researcher',
      order: 3,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: 'rahat',
      name: 'Rahat',
      level: StudentLevel.UNDERGRAD,
      program: 'Undergraduate Researcher',
      bio: '[PLACEHOLDER: confirm full name before publishing]',
      order: 4,
      status: ContentStatus.PUBLISHED,
    },
    {
      slug: 'sojib',
      name: 'Sojib',
      level: StudentLevel.UNDERGRAD,
      program: 'Undergraduate Researcher',
      bio: '[PLACEHOLDER: confirm full name before publishing]',
      order: 5,
      status: ContentStatus.PUBLISHED,
    },
  ];

  for (const stud of studentMembers) {
    await prisma.studentMember.upsert({
      where: { slug: stud.slug },
      update: stud,
      create: stud,
    });
  }

  console.log('Database seeded successfully with official seed roster!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
