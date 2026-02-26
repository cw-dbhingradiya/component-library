import { useState, useCallback, type FormEvent } from "react";
import {
  type AuthUser,
  type FormErrors,
  EMAIL_REGEX,
  findUserByEmail,
  setSessionUser,
} from "../../../lib/utils/auth";

/**
 * What: Encapsulates login form state, validation, and submission.
 * Why: Keeps the LoginView component free of business logic so the
 *      UI layer only handles rendering and event wiring.
 * What for: Used by LoginView inside LoginModal.
 */
export function useLoginForm(
  onLoginSuccess: (user: AuthUser) => void,
  onClose: () => void,
) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!EMAIL_REGEX.test(email.trim()))
      e.email = "Please enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  }, [email, password]);

  const clearError = useCallback(
    (field: keyof FormErrors) =>
      setErrors((prev) => ({ ...prev, [field]: undefined })),
    [],
  );

  const handleSubmit = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault();
      const v = validate();
      if (Object.keys(v).length > 0) {
        setErrors(v);
        return;
      }
      setErrors({});
      setIsSubmitting(true);
      try {
        await new Promise((r) => setTimeout(r, 1500));

        const storedUser = findUserByEmail(email.trim());
        if (!storedUser) {
          setErrors({
            general:
              "No account found with this email. Please create an account first.",
          });
          return;
        }
        if (storedUser.password !== password) {
          setErrors({ general: "Incorrect password. Please try again." });
          return;
        }

        const authUser: AuthUser = {
          name: storedUser.name,
          email: storedUser.email,
        };
        setSessionUser(authUser);
        onLoginSuccess(authUser);
        onClose();
      } catch {
        setErrors({ general: "Login failed. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, email, password, onLoginSuccess, onClose],
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
    handleSubmit,
    clearError,
  };
}
