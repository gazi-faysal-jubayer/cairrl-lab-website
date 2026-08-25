/**
 * Static Research Areas and Projects Data.
 * Grounded in founding faculty's actual research interests (Rules.md §8, PRD.md §7.4, Memory.md §5).
 */

export interface ResearchArea {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  iconName: 'bot' | 'cog' | 'layers' | 'plane' | 'factory' | 'cpu';
  facultySlugs: string[];
}

export interface Project {
  slug: string;
  title: string;
  status: 'ONGOING' | 'COMPLETED' | 'PLANNED';
  summary: string;
  description: string;
  researchAreaSlugs: string[];
  teamSlugs: string[];
  startDate: string;
  endDate?: string;
  isPlaceholder?: boolean;
}

export const researchAreas: ResearchArea[] = [
  {
    slug: 'robotics-and-control',
    name: 'Robotics & Control',
    shortDescription:
      'Advanced kinematic, dynamic modeling, and modern nonlinear control algorithms for robotic manipulators and autonomous mobile platforms.',
    description:
      'The Robotics & Control research track focuses on the theoretical design and experimental validation of intelligent control architectures for multi-degree-of-freedom robotic arms, mobile robots, and autonomous ground vehicles. Topics include adaptive control, robust trajectory tracking, impedance control, and real-time motion planning under physical constraints.',
    iconName: 'bot',
    facultySlugs: ['md-helal-an-nahiyan', 'priyo-nath-roy'],
  },
  {
    slug: 'mechatronics-systems',
    name: 'Mechatronics Systems',
    shortDescription:
      'Synergistic integration of precision mechanical engineering, sensors, actuators, and embedded microcontroller systems.',
    description:
      'Our mechatronics research bridges mechanical hardware with intelligent digital electronic subsystems. We investigate precision servo-mechanisms, hardware-in-the-loop (HIL) simulation, smart actuator design, sensor fusion algorithms (IMU, optical, force-torque), and multi-domain physical system modeling.',
    iconName: 'cog',
    facultySlugs: ['md-helal-an-nahiyan'],
  },
  {
    slug: 'additive-manufacturing',
    name: 'Additive Manufacturing',
    shortDescription:
      '3D printing processes, custom rapid-prototyping robotics, and material characterization for precision engineering.',
    description:
      'Research in Additive Manufacturing explores custom 3D printing equipment design, process optimization for polymeric and composite materials, topology optimization for lightweight robotic structural components, and automated toolpath generation for high-precision fabrication.',
    iconName: 'layers',
    facultySlugs: ['md-helal-an-nahiyan'],
  },
  {
    slug: 'aerial-robotics-and-uav',
    name: 'Aerial Robotics / UAV Control',
    shortDescription:
      'Flight dynamics, autonomous navigation, and non-linear stabilization control for multirotors and eVTOL platforms.',
    description:
      'Focusing on autonomous aerial vehicles, this area develops resilient attitude and position controllers for quadrotors, hexacotors, and hybrid eVTOL vehicles operating in disturbed environments. Key thrusts include fault-tolerant flight control, visual odometry, payload stabilization, and cooperative multi-agent aerial coordination.',
    iconName: 'plane',
    facultySlugs: ['priyo-nath-roy'],
  },
  {
    slug: 'industrial-automation',
    name: 'Industrial Automation',
    shortDescription:
      'Smart manufacturing, PLC-based process automation, industrial manipulator programming, and digital twin systems.',
    description:
      'This group investigates the modernization of manufacturing and processing lines through robotic workcells, PLC-SCADA architectures, machine safety systems, digital twin modeling, and industrial Internet-of-Things (IIoT) telemetry for predictive maintenance and quality assurance.',
    iconName: 'factory',
    facultySlugs: ['priyo-nath-roy'],
  },
  {
    slug: 'iot-and-embedded-systems',
    name: 'IoT & Embedded Systems',
    shortDescription:
      'Low-power microcontroller architectures, edge sensor networks, and wireless telemetry for intelligent cyber-physical systems.',
    description:
      'Investigating the embedded computing foundation of autonomous systems: high-speed embedded firmware, real-time operating systems (RTOS), wireless mesh telemetry (LoRa, BLE, WiFi), edge AI inference for sensory processing, and distributed sensor networks.',
    iconName: 'cpu',
    facultySlugs: ['priyo-nath-roy'],
  },
];

export const projects: Project[] = [
  {
    slug: 'autonomous-manipulator-control',
    title: 'Precision Trajectory Tracking for Multi-DoF Robotic Manipulators',
    status: 'ONGOING',
    summary:
      'Development of non-linear adaptive controllers for high-accuracy trajectory following in robotic manipulators with unknown payload dynamics.',
    description:
      'This research investigates advanced control strategies for robotic arm manipulation where end-effector payloads vary dynamically during pick-and-place operations. The methodology integrates Lyapunov-based adaptive control with real-time joint-torque sensing to minimize tracking error and vibration.',
    researchAreaSlugs: ['robotics-and-control', 'mechatronics-systems'],
    teamSlugs: ['md-helal-an-nahiyan', 'hafizur-rahman', 'gazi-foysal'],
    startDate: '2026-01-15',
    isPlaceholder: false,
  },
  {
    slug: 'uav-disturbance-rejection-control',
    title: 'Robust Attitude Control for Multirotor UAVs under External Wind Gusts',
    status: 'ONGOING',
    summary:
      'Design of active disturbance rejection control (ADRC) algorithms for quadrotor UAV flight stability in adverse aerodynamic conditions.',
    description:
      'Unmanned Aerial Vehicles frequently encounter turbulence and localized wind shears during outdoor deployment. This project proposes an Extended State Observer (ESO) coupled with sliding-mode attitude control to estimate and reject unmodeled disturbance forces in real-time.',
    researchAreaSlugs: ['aerial-robotics-and-uav', 'iot-and-embedded-systems'],
    teamSlugs: ['priyo-nath-roy', 'mashrul', 'rahat'],
    startDate: '2026-02-01',
    isPlaceholder: false,
  },
  {
    slug: 'additive-manufacturing-toolpath-optimization',
    title: 'Automated Toolpath Planning for Lightweight Robotic Structure Fabrication',
    status: 'PLANNED',
    summary:
      'Geometric path optimization algorithms for continuous fiber-reinforced 3D printing of custom robotic links.',
    description:
      'A planned research initiative focusing on the algorithmic generation of non-planar toolpaths for 3D printing custom robotic links with optimized stress distributions and minimal weight.',
    researchAreaSlugs: ['additive-manufacturing', 'robotics-and-control'],
    teamSlugs: ['md-helal-an-nahiyan', 'sojib'],
    startDate: '2026-06-01',
    isPlaceholder: true,
  },
];
