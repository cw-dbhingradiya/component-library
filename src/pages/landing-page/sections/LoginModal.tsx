import { useState, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ModalView = "login" | "signup" | "forgot";

export interface AuthUser {
  name: string;
  email: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

interface FormErrors {
  general?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

/* ─────────────────────── Shared sub-components ─────────────────────── */

function EmailIcon() {
  return (
    <svg
      className="size-5 shrink-0 text-neutral-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="size-5 shrink-0 text-neutral-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="size-5 shrink-0 text-neutral-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    );
  }
  return (
    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/**
 * Reusable dark-themed text input with leading icon and optional visibility toggle.
 *
 * What: A styled input row matching the modal's dark aesthetic.
 * Why: Avoids duplicating the same markup across login / signup / forgot views.
 */
function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  icon,
  error,
  showToggle,
  showPassword,
  onTogglePassword,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  autoComplete?: string;
  icon: React.ReactNode;
  error?: string;
  showToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-neutral-300">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-lg border bg-[#0A0A0A] px-3 py-2.5 transition-colors ${
          error
            ? "border-red-500/60 focus-within:border-red-500"
            : "border-neutral-700 focus-within:border-neutral-500"
        }`}
      >
        {icon}
        <input
          id={id}
          type={showToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-600"
        />
        {showToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="shrink-0 text-neutral-500 transition-colors hover:text-neutral-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <EyeIcon open={!!showPassword} />
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function SubmitButton({
  isSubmitting,
  label,
  loadingLabel,
}: {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50"
    >
      {isSubmitting && (
        <span className="size-4 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent" />
      )}
      {isSubmitting ? loadingLabel : label}
    </motion.button>
  );
}

/* ─────────────────────── View components ─────────────────────── */

/**
 * What: Sign-in form with email + password.
 * Why: Primary authentication entry point.
 */
function LoginView({
  onSwitch,
  onClose,
  onLoginSuccess,
}: {
  onSwitch: (v: ModalView) => void;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!EMAIL_REGEX.test(email.trim())) e.email = "Please enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  }, [email, password]);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setErrors({});
    setIsSubmitting(true);
    try {
      /**
       * Simulated auth — replace with a real API call.
       * Uses "password" as the demo-valid password; any other value
       * triggers the "incorrect password" error so the UI can be tested.
       */
      await new Promise((r) => setTimeout(r, 1500));

      if (password !== "password") {
        setErrors({ general: "Incorrect email or password. Please try again." });
        return;
      }

      const namePart = email.trim().split("@")[0];
      onLoginSuccess({ name: namePart, email: email.trim() });
      onClose();
    } catch {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = (field: keyof FormErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Welcome Back</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Sign in to your Alder<span className="align-super text-[8px]">®</span> account
        </p>
      </div>

      {/* Wrong-credentials / general error banner */}
      {errors.general && (
        <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
          <svg
            className="size-5 shrink-0 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-sm text-red-400">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="login-email"
          label="Email"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); clearError("email"); clearError("general"); }}
          placeholder="you@example.com"
          autoComplete="email"
          icon={<EmailIcon />}
          error={errors.email}
        />
        <FormField
          id="login-password"
          label="Password"
          value={password}
          onChange={(v) => { setPassword(v); clearError("password"); clearError("general"); }}
          placeholder="••••••••"
          autoComplete="current-password"
          icon={<LockIcon />}
          error={errors.password}
          showToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((p) => !p)}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onSwitch("forgot")}
            className="text-xs text-neutral-400 transition-colors hover:text-white"
          >
            Forgot password?
          </button>
        </div>

        <SubmitButton isSubmitting={isSubmitting} label="Sign In" loadingLabel="Signing in…" />
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => onSwitch("signup")}
          className="font-medium text-white transition-colors hover:text-neutral-300"
        >
          Create Account
        </button>
      </p>
    </>
  );
}

/**
 * What: Registration form with full name, email, password, and confirm password.
 * Why: Allows new users to create an account from the modal without a page redirect.
 */
function SignUpView({
  onSwitch,
  onClose,
  onLoginSuccess,
}: {
  onSwitch: (v: ModalView) => void;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!EMAIL_REGEX.test(email.trim())) e.email = "Please enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (!confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  }, [name, email, password, confirmPassword]);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setErrors({});
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      onLoginSuccess({ name: name.trim(), email: email.trim() });
      onClose();
    } catch {
      setErrors({ email: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = (field: keyof FormErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Create Account</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Join Alder<span className="align-super text-[8px]">®</span> today
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="signup-name"
          label="Full Name"
          value={name}
          onChange={(v) => { setName(v); clearError("name"); }}
          placeholder="John Doe"
          autoComplete="name"
          icon={<UserIcon />}
          error={errors.name}
        />
        <FormField
          id="signup-email"
          label="Email"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); clearError("email"); }}
          placeholder="you@example.com"
          autoComplete="email"
          icon={<EmailIcon />}
          error={errors.email}
        />
        <FormField
          id="signup-password"
          label="Password"
          value={password}
          onChange={(v) => { setPassword(v); clearError("password"); }}
          placeholder="Min. 6 characters"
          autoComplete="new-password"
          icon={<LockIcon />}
          error={errors.password}
          showToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((p) => !p)}
        />
        <FormField
          id="signup-confirm"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(v) => { setConfirmPassword(v); clearError("confirmPassword"); }}
          placeholder="Re-enter password"
          autoComplete="new-password"
          icon={<LockIcon />}
          error={errors.confirmPassword}
          showToggle
          showPassword={showConfirm}
          onTogglePassword={() => setShowConfirm((p) => !p)}
        />

        <SubmitButton isSubmitting={isSubmitting} label="Create Account" loadingLabel="Creating account…" />
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="font-medium text-white transition-colors hover:text-neutral-300"
        >
          Sign In
        </button>
      </p>
    </>
  );
}

/**
 * What: Forgot-password form that accepts an email and shows a success state.
 * Why: Lets users request a password reset without leaving the modal.
 */
function ForgotPasswordView({ onSwitch }: { onSwitch: (v: ModalView) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!email.trim()) { setError("Email is required"); return; }
    if (!EMAIL_REGEX.test(email.trim())) { setError("Please enter a valid email address"); return; }
    setError(undefined);
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
          <svg
            className="size-7 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-white">Check Your Email</h2>
        <p className="mt-2 max-w-xs text-sm text-neutral-400">
          We&apos;ve sent a password reset link to <span className="font-medium text-white">{email}</span>. Please check your inbox.
        </p>
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="mt-8 text-sm font-medium text-white transition-colors hover:text-neutral-300"
        >
          &larr; Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Forgot Password</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="forgot-email"
          label="Email"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); setError(undefined); }}
          placeholder="you@example.com"
          autoComplete="email"
          icon={<EmailIcon />}
          error={error}
        />

        <SubmitButton isSubmitting={isSubmitting} label="Send Reset Link" loadingLabel="Sending…" />
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Remember your password?{" "}
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="font-medium text-white transition-colors hover:text-neutral-300"
        >
          Sign In
        </button>
      </p>
    </>
  );
}

/* ─────────────────────── Main modal wrapper ─────────────────────── */

/**
 * Auth modal supporting login, sign-up, and forgot-password views.
 *
 * What: A dark-themed overlay modal with three swappable form views.
 * Why: Keeps all auth flows in a single modal so users never leave the page.
 * What for: Navbar Login button opens this; internal links switch views.
 */
export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [view, setView] = useState<ModalView>("login");

  useEffect(() => {
    if (!isOpen) setView("login");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={
              view === "login" ? "Login" : view === "signup" ? "Create Account" : "Forgot Password"
            }
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-neutral-800 bg-[#111111] p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-neutral-500 transition-colors hover:text-white"
              aria-label="Close"
            >
              <CloseIcon />
            </button>

            {/* Animate between views */}
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {view === "login" && <LoginView onSwitch={setView} onClose={onClose} onLoginSuccess={onLoginSuccess} />}
                {view === "signup" && <SignUpView onSwitch={setView} onClose={onClose} onLoginSuccess={onLoginSuccess} />}
                {view === "forgot" && <ForgotPasswordView onSwitch={setView} />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
