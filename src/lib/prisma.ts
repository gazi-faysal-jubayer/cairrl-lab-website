/**
 * Prisma Client singleton for Next.js App Router per Architecture.md §3.
 * Gracefully provides client instance when database schema is generated.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
let prismaClientInstance: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('@prisma/client');
  const globalForPrisma = globalThis as unknown as {
    prisma: any;
  };

  prismaClientInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaClientInstance;
  }
} catch {
  prismaClientInstance = {} as any;
}

export const prisma = prismaClientInstance;
