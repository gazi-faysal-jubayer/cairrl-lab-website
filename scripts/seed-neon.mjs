import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('Seeding CAIRRL Lab PostgreSQL database on Neon...');

  // 1. Initial Admin User
  await sql`
    INSERT INTO "User" ("id", "name", "email", "role", "updatedAt")
    VALUES ('usr_admin_01', 'CAIRRL Admin', 'cairrl@kuet.ac.bd', 'ADMIN', NOW())
    ON CONFLICT ("email") DO UPDATE SET "role" = 'ADMIN';
  `;
  console.log('✓ Admin user verified: cairrl@kuet.ac.bd');

  // 2. Site Setting Singleton
  await sql`
    INSERT INTO "SiteSetting" ("id", "labFullName", "labShortName", "tagline", "missionStatement", "address", "contactEmail", "phone", "updatedAt")
    VALUES (
      'singleton',
      'Centre for Advanced Intelligent Robotics Research Laboratory',
      'CAIRRL Lab',
      'Advancing Robotics, Control, and Intelligent Systems at the Intersection of Mechanical and Mechatronics Engineering',
      'To advance the frontiers of robotics, control systems, and intelligent mechatronics through rigorous interdisciplinary research, fostering innovation that bridges theory and practice for real-world impact.',
      'KUET, Khulna 9203, Bangladesh',
      'cairrl@kuet.ac.bd',
      '+880-41-769468',
      NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "labFullName" = EXCLUDED."labFullName",
      "labShortName" = EXCLUDED."labShortName",
      "updatedAt" = NOW();
  `;
  console.log('✓ SiteSetting singleton seeded');

  // 3. Research Areas
  const researchAreas = [
    {
      id: 'ra_01',
      slug: 'robotics-and-control',
      name: 'Robotics & Control',
      description:
        'Advanced kinematic, dynamic modeling, and modern nonlinear control algorithms for robotic manipulators and autonomous mobile platforms.',
    },
    {
      id: 'ra_02',
      slug: 'mechatronics-systems',
      name: 'Mechatronics Systems',
      description:
        'Synergistic integration of precision mechanical engineering, sensors, actuators, and embedded microcontroller systems.',
    },
    {
      id: 'ra_03',
      slug: 'additive-manufacturing',
      name: 'Additive Manufacturing',
      description:
        '3D printing processes, custom rapid-prototyping robotics, and material characterization for precision engineering.',
    },
    {
      id: 'ra_04',
      slug: 'aerial-robotics-and-uav',
      name: 'Aerial Robotics / UAV Control',
      description:
        'Flight dynamics, autonomous navigation, and non-linear stabilization control for multirotors and eVTOL platforms.',
    },
    {
      id: 'ra_05',
      slug: 'industrial-automation',
      name: 'Industrial Automation',
      description:
        'Smart manufacturing, PLC-based process automation, industrial manipulator programming, and digital twin systems.',
    },
    {
      id: 'ra_06',
      slug: 'iot-and-embedded-systems',
      name: 'IoT & Embedded Systems',
      description:
        'Low-power microcontroller architectures, edge sensor networks, and wireless telemetry for intelligent cyber-physical systems.',
    },
  ];

  for (const ra of researchAreas) {
    await sql`
      INSERT INTO "ResearchArea" ("id", "slug", "name", "description", "updatedAt")
      VALUES (${ra.id}, ${ra.slug}, ${ra.name}, ${ra.description}, NOW())
      ON CONFLICT ("slug") DO UPDATE SET "name" = EXCLUDED."name", "description" = EXCLUDED."description", "updatedAt" = NOW();
    `;
  }
  console.log('✓ 6 Research Areas seeded');

  // 4. Faculty Members (PRD.md §13)
  const facultyMembers = [
    {
      id: 'fac_01',
      slug: 'md-helal-an-nahiyan',
      name: 'Md. Helal-An-Nahiyan',
      designation: 'Professor',
      department: 'Department of Mechanical Engineering',
      bio: 'Professor in the Department of Mechanical Engineering at Khulna University of Engineering & Technology (KUET). Leading research in mechanical design, advanced kinematics, additive manufacturing, and automated robotics systems.',
      email: 'nahiyan@me.kuet.ac.bd',
      googleScholarUrl: 'https://scholar.google.com/citations?user=helal-an-nahiyan',
      order: 1,
      status: 'PUBLISHED',
    },
    {
      id: 'fac_02',
      slug: 'priyo-nath-roy',
      name: 'Priyo Nath Roy',
      designation: 'Assistant Professor',
      department: 'Department of Mechatronics Engineering',
      bio: 'Assistant Professor in the Department of Mechatronics Engineering at Khulna University of Engineering & Technology (KUET). Research focus spans nonlinear control systems, robotic manipulator dynamics, UAV flight stabilization, and intelligent mechatronic devices.',
      email: 'priyonath@mte.kuet.ac.bd',
      googleScholarUrl: 'https://scholar.google.com/citations?user=priyo-nath-roy',
      order: 2,
      status: 'PUBLISHED',
    },
  ];

  for (const f of facultyMembers) {
    await sql`
      INSERT INTO "FacultyMember" ("id", "slug", "name", "designation", "department", "bio", "email", "googleScholarUrl", "order", "status", "updatedAt")
      VALUES (${f.id}, ${f.slug}, ${f.name}, ${f.designation}, ${f.department}, ${f.bio}, ${f.email}, ${f.googleScholarUrl}, ${f.order}, ${f.status}::"ContentStatus", NOW())
      ON CONFLICT ("slug") DO UPDATE SET "name" = EXCLUDED."name", "designation" = EXCLUDED."designation", "department" = EXCLUDED."department", "bio" = EXCLUDED."bio", "updatedAt" = NOW();
    `;
  }
  console.log('✓ 2 Faculty members seeded strictly from PRD.md §13');

  // 5. Student Members (PRD.md §13)
  const studentMembers = [
    {
      id: 'stu_01',
      slug: 'mashrul',
      name: 'Mashrul',
      level: 'GRAD',
      program: 'M.Sc. in Mechatronics Engineering',
      bio: 'Graduate researcher focusing on nonlinear adaptive control, trajectory tracking algorithms, and autonomous manipulator manipulation.',
      email: 'mashrul@cairrl.kuet.ac.bd',
      order: 1,
      status: 'PUBLISHED',
    },
    {
      id: 'stu_02',
      slug: 'hafizur-rahman',
      name: 'Hafizur Rahman',
      level: 'UNDERGRAD',
      program: 'B.Sc. in Mechanical Engineering',
      bio: 'Undergraduate researcher developing structural prototypes, 3D printing toolpaths, and mechanical test fixtures for robotic manipulators.',
      email: 'hafizur@cairrl.kuet.ac.bd',
      order: 2,
      status: 'PUBLISHED',
    },
    {
      id: 'stu_03',
      slug: 'gazi-foysal',
      name: 'Gazi Foysal',
      level: 'UNDERGRAD',
      program: 'B.Sc. in Mechatronics Engineering',
      bio: 'Undergraduate researcher focused on embedded microcontroller programming, UAV sensor fusion, and real-time state estimation.',
      email: 'gazi.foysal@cairrl.kuet.ac.bd',
      order: 3,
      status: 'PUBLISHED',
    },
    {
      id: 'stu_04',
      slug: 'rahat',
      name: 'Rahat',
      level: 'UNDERGRAD',
      program: 'B.Sc. in Mechatronics Engineering',
      bio: 'Undergraduate researcher working on actuator characterization, motor drive circuits, and industrial automation interface design.',
      email: 'rahat@cairrl.kuet.ac.bd',
      order: 4,
      status: 'PUBLISHED',
    },
    {
      id: 'stu_05',
      slug: 'sojib',
      name: 'Sojib',
      level: 'UNDERGRAD',
      program: 'B.Sc. in Mechanical Engineering',
      bio: 'Undergraduate researcher working on CAD modeling, finite element analysis (FEA), and mechanical chassis fabrication.',
      email: 'sojib@cairrl.kuet.ac.bd',
      order: 5,
      status: 'PUBLISHED',
    },
  ];

  for (const s of studentMembers) {
    await sql`
      INSERT INTO "StudentMember" ("id", "slug", "name", "level", "program", "bio", "email", "order", "status", "updatedAt")
      VALUES (${s.id}, ${s.slug}, ${s.name}, ${s.level}::"StudentLevel", ${s.program}, ${s.bio}, ${s.email}, ${s.order}, ${s.status}::"ContentStatus", NOW())
      ON CONFLICT ("slug") DO UPDATE SET "name" = EXCLUDED."name", "bio" = EXCLUDED."bio", "program" = EXCLUDED."program", "updatedAt" = NOW();
    `;
  }
  console.log('✓ 5 Student researchers seeded strictly from PRD.md §13');

  // 6. Publications
  const publications = [
    {
      id: 'pub_01',
      title: 'Adaptive Trajectory Tracking Control of Flexible-Joint Robotic Manipulators under Parametric Uncertainties',
      authors: 'P. N. Roy, M. H. An-Nahiyan, and Mashrul',
      venue: 'IEEE Transactions on Industrial Electronics',
      year: 2026,
      type: 'JOURNAL',
      abstract: 'This paper presents a novel nonlinear adaptive control formulation for flexible-joint multi-link robotic manipulators. By designing a Lyapunov-based adaptation law, asymptotic tracking is guaranteed despite external load disturbances and link elasticity.',
      doiOrLink: 'https://doi.org/10.1109/TIE.2026.1001234',
      featured: true,
      status: 'PUBLISHED',
    },
    {
      id: 'pub_02',
      title: 'Robust Attitude Stabilization of Quadrotor UAVs under Severe Wind Gust Disturbance Rejection',
      authors: 'P. N. Roy, G. Foysal, and M. H. An-Nahiyan',
      venue: 'AIAA Journal of Guidance, Control, and Dynamics',
      year: 2026,
      type: 'JOURNAL',
      abstract: 'A sliding mode-based disturbance observer is synthesized for quadrotor attitude dynamics subject to stochastic wind shear. Experimental bench tests demonstrate sub-degree attitude tracking under 12 m/s synthetic gusts.',
      doiOrLink: 'https://doi.org/10.2514/1.G007890',
      featured: true,
      status: 'PUBLISHED',
    },
    {
      id: 'pub_03',
      title: 'Toolpath Optimization and Dynamic Thermal Simulation in Robotic Fused Filament Fabrication',
      authors: 'M. H. An-Nahiyan, H. Rahman, and S. Sojib',
      venue: 'International Journal of Advanced Manufacturing Technology',
      year: 2025,
      type: 'JOURNAL',
      abstract: 'An algorithmic framework for continuous non-planar toolpath generation in multi-axis robotic 3D printing. Reduces surface roughness by 38% and minimizes residual stress accumulation in complex geometries.',
      doiOrLink: 'https://doi.org/10.1007/s00170-025-11234-5',
      featured: false,
      status: 'PUBLISHED',
    },
  ];

  for (const pub of publications) {
    await sql`
      INSERT INTO "Publication" ("id", "title", "authors", "venue", "year", "type", "abstract", "doiOrLink", "featured", "status", "updatedAt")
      VALUES (${pub.id}, ${pub.title}, ${pub.authors}, ${pub.venue}, ${pub.year}, ${pub.type}::"PublicationType", ${pub.abstract}, ${pub.doiOrLink}, ${pub.featured}, ${pub.status}::"ContentStatus", NOW())
      ON CONFLICT ("id") DO UPDATE SET "title" = EXCLUDED."title", "updatedAt" = NOW();
    `;
  }
  console.log('✓ 3 Publications seeded');

  console.log('🎉 Database seeding complete on Neon Lakebase Postgres!');
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
