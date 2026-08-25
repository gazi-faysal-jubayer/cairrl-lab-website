/**
 * Static Gallery Data.
 * Types match Architecture.md §4 and PRD.md §7.7.
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hardware' | 'Robotics Testbed' | 'Events' | 'Team';
  caption: string;
  date: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
}

export const galleryCategories = [
  'All',
  'Hardware',
  'Robotics Testbed',
  'Events',
  'Team',
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Robotic Manipulator Arm Setup',
    category: 'Robotics Testbed',
    caption:
      'Multi-axis articulated robotic manipulator mounted on the precision workbench for trajectory control validation.',
    date: '2026-08',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-02',
    title: 'Custom Multirotor Aerial Testbed',
    category: 'Hardware',
    caption:
      'Quadrotor experimental prototype equipped with high-rate IMU telemetry and custom flight controller electronics.',
    date: '2026-08',
    aspectRatio: 'square',
  },
  {
    id: 'gal-03',
    title: 'Mechatronics Integration & Soldering Station',
    category: 'Hardware',
    caption:
      'Precision electronics workstation for microcontroller firmware programming, sensor signal conditioning, and PCB assembly.',
    date: '2026-08',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-04',
    title: 'Inaugural Lab Founding Meeting',
    category: 'Events',
    caption:
      'Faculty members and student researchers gathering to establish the initial research focus tracks and workspace layout.',
    date: '2026-08',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-05',
    title: 'Additive Manufacturing Station',
    category: 'Hardware',
    caption:
      'High-precision 3D printing equipment used for rapid prototyping of custom robotic joints and sensor brackets.',
    date: '2026-08',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-06',
    title: 'Student Researchers Collaboration Session',
    category: 'Team',
    caption:
      'Undergraduate researchers testing mathematical kinematic algorithms and reviewing experimental trajectory graphs.',
    date: '2026-08',
    aspectRatio: 'landscape',
  },
];
