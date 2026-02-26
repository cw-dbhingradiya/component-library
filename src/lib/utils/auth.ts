const STORAGE_KEY = "alder_registered_users";
const SESSION_KEY = "alder_current_user";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface AuthUser {
  name: string;
  email: string;
}

export interface FormErrors {
  general?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

/**
 * What: Helpers to manage registered users in localStorage.
 * Why: Enables sign-up credentials to persist across sessions so
 *      the same email + password can be used to log in later.
 * What for: Used by LoginModal (signup stores, login validates)
 *           and Navbar (session restore / logout).
 */

export function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUser(user: StoredUser): void {
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.email === user.email);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return getStoredUsers().find((u) => u.email === email);
}

export function getSessionUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSessionUser(user: AuthUser | null): void {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}
