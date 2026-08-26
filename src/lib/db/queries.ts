/**
 * Centralized database query functions for both Public pages and Dashboard CMS.
 * Uses React cache() for request-level query deduplication.
 */
import { cache } from 'react';
import { prisma } from '@/lib/prisma';

// ─── Site Settings ───────────────────────────────────────────────────────────

export const getSiteSettings = cache(async () => {
  const settings = await prisma.siteSetting.findUnique({
    where: { id: 'singleton' },
  });
  return settings;
});

// ─── People (Public) ─────────────────────────────────────────────────────────

export const getFacultyMembers = cache(async () => {
  return prisma.facultyMember.findMany({
    where: { status: 'PUBLISHED' },
    include: { researchAreas: true },
    orderBy: { order: 'asc' },
  });
});

export const getStudentMembers = cache(async () => {
  return prisma.studentMember.findMany({
    where: { status: 'PUBLISHED' },
    include: { researchAreas: true },
    orderBy: { order: 'asc' },
  });
});

export const getFacultyBySlug = cache(async (slug: string) => {
  return prisma.facultyMember.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: { researchAreas: true },
  });
});

export const getStudentBySlug = cache(async (slug: string) => {
  return prisma.studentMember.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: { researchAreas: true },
  });
});

// ─── People (Dashboard - All records including Drafts) ────────────────────────

export const getAllDashboardPeople = cache(async () => {
  const [faculty, students] = await Promise.all([
    prisma.facultyMember.findMany({
      include: { researchAreas: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    }),
    prisma.studentMember.findMany({
      include: { researchAreas: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    }),
  ]);
  return { faculty, students };
});

// ─── Research Areas ──────────────────────────────────────────────────────────

export const getResearchAreas = cache(async () => {
  return prisma.researchArea.findMany({
    include: {
      faculty: { where: { status: 'PUBLISHED' }, select: { id: true, name: true, slug: true } },
      students: { where: { status: 'PUBLISHED' }, select: { id: true, name: true, slug: true } },
      projects: { where: { contentStatus: 'PUBLISHED' }, select: { id: true } },
      publications: { where: { status: 'PUBLISHED' }, select: { id: true } },
    },
    orderBy: { name: 'asc' },
  });
});

export const getResearchAreaBySlug = cache(async (slug: string) => {
  return prisma.researchArea.findUnique({
    where: { slug },
    include: {
      faculty: { where: { status: 'PUBLISHED' }, orderBy: { order: 'asc' } },
      students: { where: { status: 'PUBLISHED' }, orderBy: { order: 'asc' } },
      projects: { where: { contentStatus: 'PUBLISHED' } },
      publications: { where: { status: 'PUBLISHED' }, orderBy: { year: 'desc' } },
    },
  });
});

// ─── Projects ────────────────────────────────────────────────────────────────

export const getProjects = cache(async () => {
  return prisma.project.findMany({
    where: { contentStatus: 'PUBLISHED' },
    include: { researchAreas: true },
    orderBy: { createdAt: 'desc' },
  });
});

export const getAllDashboardProjects = cache(async () => {
  return prisma.project.findMany({
    include: { researchAreas: true },
    orderBy: { createdAt: 'desc' },
  });
});

export const getProjectBySlug = cache(async (slug: string) => {
  return prisma.project.findUnique({
    where: { slug, contentStatus: 'PUBLISHED' },
    include: {
      researchAreas: true,
      publications: { where: { status: 'PUBLISHED' } },
      galleryItems: true,
    },
  });
});

// ─── Publications ────────────────────────────────────────────────────────────

export const getPublications = cache(async () => {
  return prisma.publication.findMany({
    where: { status: 'PUBLISHED' },
    include: { researchAreas: true },
    orderBy: [{ year: 'desc' }, { title: 'asc' }],
  });
});

export const getAllDashboardPublications = cache(async () => {
  return prisma.publication.findMany({
    include: { researchAreas: true },
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
  });
});

export const getFeaturedPublications = cache(async () => {
  return prisma.publication.findMany({
    where: { status: 'PUBLISHED', featured: true },
    include: { researchAreas: true },
    orderBy: { year: 'desc' },
    take: 4,
  });
});

// ─── News ────────────────────────────────────────────────────────────────────

export const getNewsPosts = cache(async () => {
  return prisma.newsPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
  });
});

export const getAllDashboardNews = cache(async () => {
  return prisma.newsPost.findMany({
    orderBy: { createdAt: 'desc' },
  });
});

export const getLatestNews = cache(async (count = 3) => {
  return prisma.newsPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: count,
  });
});

export const getNewsPostBySlug = cache(async (slug: string) => {
  return prisma.newsPost.findUnique({
    where: { slug, status: 'PUBLISHED' },
  });
});

// ─── Events ──────────────────────────────────────────────────────────────────

export const getEvents = cache(async () => {
  return prisma.event.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { startAt: 'desc' },
  });
});

export const getAllDashboardEvents = cache(async () => {
  return prisma.event.findMany({
    orderBy: { startAt: 'desc' },
  });
});

export const getUpcomingEvents = cache(async (count = 3) => {
  return prisma.event.findMany({
    where: {
      status: 'PUBLISHED',
      startAt: { gte: new Date() },
    },
    orderBy: { startAt: 'asc' },
    take: count,
  });
});

export const getEventBySlug = cache(async (slug: string) => {
  return prisma.event.findUnique({
    where: { slug, status: 'PUBLISHED' },
  });
});

// ─── Gallery ─────────────────────────────────────────────────────────────────

export const getGalleryItems = cache(async () => {
  return prisma.galleryItem.findMany({
    include: { project: { select: { title: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });
});

// ─── Contact Messages ────────────────────────────────────────────────────────

export const getContactMessages = cache(async () => {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
});

export const getUnreadMessageCount = cache(async () => {
  return prisma.contactMessage.count({ where: { read: false } });
});

// ─── Aggregate Metrics for Dashboard & Public ────────────────────────────────

export const getQuickStats = cache(async () => {
  const [facultyCount, studentCount, researchAreaCount, projectCount, publicationCount] =
    await Promise.all([
      prisma.facultyMember.count({ where: { status: 'PUBLISHED' } }),
      prisma.studentMember.count({ where: { status: 'PUBLISHED' } }),
      prisma.researchArea.count(),
      prisma.project.count({ where: { contentStatus: 'PUBLISHED' } }),
      prisma.publication.count({ where: { status: 'PUBLISHED' } }),
    ]);

  return {
    faculty: facultyCount,
    members: facultyCount + studentCount,
    researchAreas: researchAreaCount,
    projects: projectCount,
    publications: publicationCount,
  };
});

export const getDashboardMetrics = cache(async () => {
  const [
    facultyCount,
    studentCount,
    researchAreaCount,
    projectCount,
    publicationCount,
    newsCount,
    eventCount,
    galleryCount,
    unreadMessageCount,
    recentMessages,
  ] = await Promise.all([
    prisma.facultyMember.count(),
    prisma.studentMember.count(),
    prisma.researchArea.count(),
    prisma.project.count(),
    prisma.publication.count(),
    prisma.newsPost.count(),
    prisma.event.count(),
    prisma.galleryItem.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.contactMessage.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ]);

  return {
    people: facultyCount + studentCount,
    faculty: facultyCount,
    students: studentCount,
    researchAreas: researchAreaCount,
    projects: projectCount,
    publications: publicationCount,
    news: newsCount,
    events: eventCount,
    gallery: galleryCount,
    unreadMessages: unreadMessageCount,
    recentMessages,
  };
});

// ─── All slugs (for generateStaticParams) ────────────────────────────────────

export const getAllPeopleSlugs = cache(async () => {
  const [faculty, students] = await Promise.all([
    prisma.facultyMember.findMany({ select: { slug: true } }),
    prisma.studentMember.findMany({ select: { slug: true } }),
  ]);
  return [...faculty, ...students].map((p) => p.slug);
});

export const getAllResearchAreaSlugs = cache(async () => {
  const areas = await prisma.researchArea.findMany({ select: { slug: true } });
  return areas.map((a) => a.slug);
});

export const getAllProjectSlugs = cache(async () => {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p) => p.slug);
});

export const getAllNewsSlugs = cache(async () => {
  const posts = await prisma.newsPost.findMany({ select: { slug: true } });
  return posts.map((p) => p.slug);
});

export const getAllEventSlugs = cache(async () => {
  const events = await prisma.event.findMany({ select: { slug: true } });
  return events.map((e) => e.slug);
});
