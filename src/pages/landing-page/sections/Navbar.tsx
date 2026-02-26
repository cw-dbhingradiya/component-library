import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import LoginModal, { type AuthUser } from "./LoginModal";

const NAV_LINKS = ["Home", "Collection", "About", "Contact"];
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * What: Extracts up to two initials from a full name / email prefix.
 * Why: Used for the profile avatar when no image is available.
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/**
 * What: Profile avatar button with an animated dropdown containing user info and logout.
 * Why: Replaces the Login button once the user is authenticated.
 */
function ProfileDropdown({
  user,
  onLogout,
}: {
  user: AuthUser;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex size-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-neutral-200"
        aria-label="Profile menu"
      >
        {getInitials(user.name)}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl"
          >
            {/* User info */}
            <div className="border-b border-neutral-800 px-4 py-3">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-neutral-400">{user.email}</p>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const openLogin = useCallback(() => {
    setLoginOpen(true);
    setMobileOpen(false);
  }, []);

  const handleLoginSuccess = useCallback((loggedInUser: AuthUser) => {
    setUser(loggedInUser);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/50 bg-[#0A0A0A]/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.a
            href="#"
            className="text-xl font-bold tracking-tight text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Alder<span className="align-super text-[10px]">®</span>
          </motion.a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.1 }}
                className="text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
              >
                {link}
              </motion.a>
            ))}

            {/* Desktop: Login button or profile avatar */}
            {user ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.8 }}
              >
                <ProfileDropdown user={user} onLogout={handleLogout} />
              </motion.div>
            ) : (
              <motion.button
                type="button"
                onClick={openLogin}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg border border-neutral-700 bg-white px-5 py-1.5 text-sm font-medium text-[#0A0A0A] transition-colors duration-300 hover:bg-neutral-200"
              >
                Login
              </motion.button>
            )}
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile: Login button or profile avatar */}
            {user ? (
              <ProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <button
                type="button"
                onClick={openLogin}
                className="rounded-lg border border-neutral-700 bg-white px-4 py-1.5 text-sm font-medium text-[#0A0A0A] transition-colors duration-300 hover:bg-neutral-200"
              >
                Login
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="overflow-hidden border-t border-neutral-800/50 bg-[#0A0A0A] md:hidden"
        >
          <nav className="px-6 py-6">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-neutral-300 transition-colors duration-300 hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
        </motion.div>
      </motion.header>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
