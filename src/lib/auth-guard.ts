import { redirect } from 'next/navigation';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR';
}

export interface Session {
  user: SessionUser;
}

/**
 * Mock session getter for local development and initial phase.
 * Ready for drop-in replacement with Better Auth / Auth.js in production.
 */
export async function getSession(): Promise<Session | null> {
  // Return mock admin session during Phase 7 development
  return {
    user: {
      id: 'usr_admin_01',
      name: 'CAIRRL Admin',
      email: 'cairrl@kuet.ac.bd',
      role: 'ADMIN',
    },
  };
}

/**
 * Server-side guard ensuring an authenticated session exists.
 * Redirects to /login if unauthenticated.
 */
export async function requireUser(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

/**
 * Server-side guard ensuring the authenticated user has ADMIN role.
 * Redirects to /dashboard if role is insufficient.
 */
export async function requireAdmin(): Promise<Session> {
  const session = await requireUser();
  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }
  return session;
}
