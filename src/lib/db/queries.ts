/**
 * Centralized database query functions for all public pages.
 * Every public Server Component should import from here rather than
 * using raw Prisma queries directly, so caching and revalidation
 * are consistent across the site.
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

// ─── People ──────────────────────────────────────────────────────────────────

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

export const getUnreadMessageCount = cache(async () => {
  return prisma.contactMessage.count({ where: { read: false } });
});

// ─── Aggregate Stats (for homepage) ──────────────────────────────────────────

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
