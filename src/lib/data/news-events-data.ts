/**
 * Static News & Events Data.
 * Types match Architecture.md §4 and PRD.md §7.6.
 */

export type EventType =
  | 'SEMINAR'
  | 'TALK'
  | 'WORKSHOP'
  | 'DEFENSE'
  | 'OTHER';

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  authorName: string;
  category: string;
  isPlaceholder?: boolean;
}

export interface EventItem {
  slug: string;
  title: string;
  type: EventType;
  description: string;
  startAt: string; // ISO date string or YYYY-MM-DD
  endAt?: string;
  location?: string;
  isOnline: boolean;
  isPlaceholder?: boolean;
}

export const eventTypeLabels: Record<EventType, string> = {
  SEMINAR: 'Seminar',
  TALK: 'Technical Talk',
  WORKSHOP: 'Hands-on Workshop',
  DEFENSE: 'Thesis Defense',
  OTHER: 'Event',
};

export const newsPosts: NewsPost[] = [
  {
    slug: 'cairrl-lab-established-kuet',
    title:
      'CAIRRL Lab Established at KUET to Advance Interdisciplinary Robotics & Mechatronics Research',
    excerpt:
      'The Centre for Advanced Intelligent Robotics Research Laboratory is officially formed, uniting faculty and students from Mechanical and Mechatronics Engineering.',
    body: `
      <p>We are proud to announce the establishment of the <strong>Centre for Advanced Intelligent Robotics Research Laboratory (CAIRRL)</strong> at Khulna University of Engineering & Technology (KUET).</p>
      
      <p>Bridging the Department of Mechanical Engineering and the Department of Mechatronics Engineering, CAIRRL Lab serves as a dedicated nexus for collaborative research in robotics, advanced control systems, autonomous unmanned aerial systems, and industrial automation.</p>

      <p>Under the leadership of founding faculty members <strong>Md. Helal-An-Nahiyan</strong> and <strong>Priyo Nath Roy</strong>, along with graduate and undergraduate research associates, the lab will pursue fundamental theoretical modeling alongside applied experimental validations.</p>

      <p>Prospective student researchers interested in thesis supervision or research assistantships are encouraged to visit our <a href="/join-us">Join Us</a> page or contact the lab coordinators.</p>
    `,
    publishedAt: '2026-08-26',
    authorName: 'CAIRRL Editorial Team',
    category: 'Milestone',
    isPlaceholder: false,
  },
  {
    slug: 'adaptive-control-robotic-arms-study',
    title:
      'New Investigation Launched on Non-Linear Adaptive Control for Robotic Manipulators',
    excerpt:
      'Student researchers begin initial benchmarking of Lyapunov-based control algorithms on multi-link robotic arms under variable payloads.',
    body: `
      <p>CAIRRL Lab researchers have initiated a comprehensive simulation and testbed study on adaptive sliding mode trajectory control for robotic manipulators with unknown payload variations.</p>
      
      <p>The study aims to establish robust stability bounds and minimize transient trajectory deviation when robots interact with unknown dynamic environments. Experimental testing is conducted using custom test setups developed in-house.</p>
    `,
    publishedAt: '2026-08-20',
    authorName: 'Robotics & Control Group',
    category: 'Research',
    isPlaceholder: false,
  },
  {
    slug: 'uav-aerodynamics-testbed-setup',
    title:
      'Autonomous UAV Flight Stabilization Test Platform Configured',
    excerpt:
      'Mechatronics researchers finalize multirotor experimental testbed for active disturbance rejection flight control testing.',
    body: `
      <p>The aerial robotics thrust within CAIRRL Lab has completed initial assembly of an experimental multirotor testing platform equipped with extended-state observer sensors.</p>
      
      <p>The platform will be utilized to validate novel disturbance rejection controllers against synthetic wind turbulence generated in a controlled indoor environment.</p>
    `,
    publishedAt: '2026-08-10',
    authorName: 'Aerial Robotics Group',
    category: 'Lab Setup',
    isPlaceholder: false,
  },
];

export const events: EventItem[] = [
  {
    slug: 'intro-to-robot-control-workshop',
    title: 'Hands-on Workshop: Fundamentals of Robot Kinematics and Control with MATLAB & ROS',
    type: 'WORKSHOP',
    description:
      'A practical introductory workshop for undergraduate students at KUET covering forward/inverse kinematics, trajectory generation, and simulation using ROS2 and MATLAB Robotics Toolbox.',
    startAt: '2026-09-15T10:00:00',
    endAt: '2026-09-15T16:00:00',
    location: 'Mechatronics Engineering Lab Room 204, KUET',
    isOnline: false,
    isPlaceholder: false,
  },
  {
    slug: 'seminar-advances-in-uav-control',
    title: 'Research Seminar: Modern Robust Control Techniques for Autonomous Aerial Vehicles',
    type: 'SEMINAR',
    description:
      'A technical seminar discussing recent breakthroughs in disturbance observers, sliding-mode control, and real-time obstacle avoidance algorithms for quadrotor UAVs.',
    startAt: '2026-09-28T14:30:00',
    endAt: '2026-09-28T16:00:00',
    location: 'Mechanical Engineering Seminar Hall, KUET & Online via Zoom',
    isOnline: true,
    isPlaceholder: false,
  },
  {
    slug: 'lab-orientation-2026',
    title: 'CAIRRL Lab Inaugural Orientation & Research Roadmap Presentation',
    type: 'OTHER',
    description:
      'Opening session introducing the lab facilities, active projects, and thesis topic allocation for the upcoming academic term.',
    startAt: '2026-08-20T11:00:00',
    endAt: '2026-08-20T13:00:00',
    location: 'KUET Campus',
    isOnline: false,
    isPlaceholder: false,
  },
];
