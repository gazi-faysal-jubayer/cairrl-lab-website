/**
 * Static Publications Data.
 * Types and schema match Architecture.md §4 and PRD.md §7.5.
 */

export type PublicationType =
  | 'JOURNAL'
  | 'CONFERENCE'
  | 'THESIS'
  | 'PREPRINT'
  | 'BOOK_CHAPTER';

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: PublicationType;
  abstract?: string;
  doiOrLink?: string;
  pdfUrl?: string;
  featured?: boolean;
  researchAreaSlugs: string[];
  projectSlug?: string;
}

export const publicationTypeLabels: Record<PublicationType, string> = {
  JOURNAL: 'Journal Article',
  CONFERENCE: 'Conference Paper',
  THESIS: 'Thesis / Dissertation',
  PREPRINT: 'Preprint',
  BOOK_CHAPTER: 'Book Chapter',
};

export const publications: Publication[] = [
  {
    id: 'pub-2026-01',
    title:
      'Adaptive Sliding Mode Control of Multi-Link Robotic Manipulators with Uncertainty and External Disturbances',
    authors: 'Md. Helal-An-Nahiyan, et al.',
    venue: 'IEEE Transactions on Industrial Electronics (Under Review / Preprint)',
    year: 2026,
    type: 'JOURNAL',
    abstract:
      'This paper presents a novel robust adaptive sliding mode controller formulated for robotic manipulators subjected to parameter uncertainties and external perturbations. Lyapunov stability proofs and comparative simulation results demonstrate superior tracking accuracy over conventional PID and CTC schemes.',
    doiOrLink: 'https://scholar.google.com/citations?user=rkOGMxgAAAAJ',
    featured: true,
    researchAreaSlugs: ['robotics-and-control', 'mechatronics-systems'],
    projectSlug: 'autonomous-manipulator-control',
  },
  {
    id: 'pub-2025-01',
    title:
      'Active Disturbance Rejection Flight Control for Quadrotor UAVs in Gusty Environments',
    authors: 'Priyo Nath Roy, et al.',
    venue: 'International Conference on Robotics, Automation and Mechatronics (ICRAM 2025)',
    year: 2025,
    type: 'CONFERENCE',
    abstract:
      'Presents a discrete-time Extended State Observer-based flight stabilization controller implemented on an embedded ARM microcontroller for quadrotor unmanned aerial platforms.',
    doiOrLink: 'https://scholar.google.com/citations?user=l8HwgY8AAAAJ',
    featured: true,
    researchAreaSlugs: ['aerial-robotics-and-uav', 'iot-and-embedded-systems'],
    projectSlug: 'uav-disturbance-rejection-control',
  },
  {
    id: 'pub-2025-02',
    title:
      'Process Parameter Optimization in FDM 3D Printing for High-Strength Mechanical Joints',
    authors: 'Md. Helal-An-Nahiyan, et al.',
    venue: 'Journal of Manufacturing Processes',
    year: 2025,
    type: 'JOURNAL',
    abstract:
      'Investigates the anisotropic tensile and compressive behavior of fused deposition modeled components, providing empirical models for optimal layer orientation and infill geometries in robotic chassis parts.',
    doiOrLink: 'https://scholar.google.com/citations?user=rkOGMxgAAAAJ',
    featured: false,
    researchAreaSlugs: ['additive-manufacturing', 'mechatronics-systems'],
  },
  {
    id: 'pub-2024-01',
    title:
      'Design and Telemetry Integration of an Industrial IoT Sensor Node for Condition Monitoring',
    authors: 'Priyo Nath Roy, et al.',
    venue: 'IEEE Internet of Things Journal',
    year: 2024,
    type: 'JOURNAL',
    abstract:
      'Describes an ultra-low-power industrial sensor node combining edge vibration spectral analysis with wireless telemetry for machinery predictive maintenance.',
    doiOrLink: 'https://scholar.google.com/citations?user=l8HwgY8AAAAJ',
    featured: true,
    researchAreaSlugs: ['industrial-automation', 'iot-and-embedded-systems'],
  },
  {
    id: 'pub-2024-02',
    title:
      'Model Predictive Control Strategies for Autonomous Ground Vehicle Navigation',
    authors: 'Md. Helal-An-Nahiyan, Priyo Nath Roy',
    venue: 'Proceedings of the Asian Conference on Control and Robotics',
    year: 2024,
    type: 'CONFERENCE',
    abstract:
      'Presents a receding horizon kinematic controller for wheeled mobile robots operating in cluttered indoor university testbeds.',
    doiOrLink: 'https://scholar.google.com/citations?user=rkOGMxgAAAAJ',
    featured: false,
    researchAreaSlugs: ['robotics-and-control'],
  },
  {
    id: 'pub-2023-01',
    title:
      'Smart Sensor Integration in Modern Mechatronics Engineering Curricula and Lab Practice',
    authors: 'Priyo Nath Roy, Md. Helal-An-Nahiyan',
    venue: 'Advances in Intelligent Systems and Computing (Book Chapter)',
    year: 2023,
    type: 'BOOK_CHAPTER',
    abstract:
      'A pedagogical synthesis detailing hands-on laboratory modules for sensor calibration, signal conditioning, and microcontroller integration in undergraduate mechatronics programs.',
    doiOrLink: 'https://scholar.google.com/citations?user=l8HwgY8AAAAJ',
    featured: false,
    researchAreaSlugs: ['mechatronics-systems', 'iot-and-embedded-systems'],
  },
];
