import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* ────────────────────────────── Size maps ────────────────────────────── */

const inputSizes = {
  sm: "h-10 px-3 py-2 text-sm",
  md: "h-12 px-3.5 py-3 text-base",
} as const;

const iconSizes = {
  sm: "[&_svg]:size-5",
  md: "[&_svg]:size-5",
} as const;

/* ────────────────────────────── Types ────────────────────────────── */

export type InputSize = keyof typeof inputSizes;

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  /** Visible label above the input. */
  label?: string;
  /** Hint or error message below the input. */
  hint?: string;
  /** Marks the field as required (shows * after label). */
  isRequired?: boolean;
  /** Marks the field as invalid — applies error ring and shows hint in red. */
  isInvalid?: boolean;
  /** Input size. */
  size?: InputSize;
  /** Icon component rendered at the leading edge of the input. */
  icon?: React.ReactNode;
  /**
   * Keyboard shortcut badge shown at the trailing edge.
   * Pass `true` for default "⌘K" or a string for custom text.
   */
  shortcut?: boolean | string;
  /** Tooltip content — renders a help (?) icon next to the label. */
  tooltip?: string;
}

/**
 * Standalone input field styled like Untitled UI inputs.
 *
 * What: a label + input + optional hint with leading icon, keyboard-shortcut
 * badge, required indicator, disabled, and invalid states.
 *
 * Why standalone: covers the majority of form input use-cases without
 * needing the heavier InputGroup wrapper (leading text, dropdowns, etc.).
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    isRequired = false,
    isInvalid = false,
    size = "sm",
    icon,
    shortcut,
    tooltip,
    disabled,
    className,
    id: idProp,
    ...props
  },
  ref,
) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {/* ── Label row ── */}
      {label && (
        <div className="flex items-center gap-1">
          <label
            htmlFor={id}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
          {tooltip && (
            <span className="group relative">
              <svg
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {tooltip}
              </span>
            </span>
          )}
        </div>
      )}

      {/* ── Input wrapper ── */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-white shadow-xs transition-colors",
          isInvalid
            ? "border-red-300 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100"
            : "border-gray-300 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10",
          disabled && "pointer-events-none bg-gray-50 opacity-50",
          inputSizes[size],
        )}
      >
        {/* Leading icon */}
        {icon && (
          <span
            className={cn("shrink-0 text-gray-500", iconSizes[size])}
            aria-hidden
          >
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          aria-describedby={hintId}
          className={cn(
            "w-full bg-transparent outline-none placeholder:text-gray-400",
            className,
          )}
          {...props}
        />

        {/* Invalid icon */}
        {isInvalid && (
          <svg
            className="size-4 shrink-0 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
        )}

        {/* Shortcut badge */}
        {shortcut && (
          <kbd className="shrink-0 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-500">
            {shortcut === true ? "⌘K" : shortcut}
          </kbd>
        )}
      </div>

      {/* ── Hint / error text ── */}
      {hint && (
        <p
          id={hintId}
          className={cn(
            "text-sm",
            isInvalid ? "text-red-600" : "text-gray-500",
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
});

/* ────────────────────────────── InputGroup ────────────────────────────── */

/**
 * InputGroup wraps an Input with leading/trailing add-ons: text, buttons,
 * or dropdowns — for composite inputs like currency amounts, URLs, or phone numbers.
 *
 * What: a horizontal group container that visually merges add-ons with the input.
 * Why: keeps each add-on as a separate React element while presenting a single
 * unified form control to the user.
 */

export interface InputGroupProps {
  /** Visible label above the group. */
  label?: string;
  /** Hint or error message below the group. */
  hint?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  size?: InputSize;
  disabled?: boolean;
  /** Element rendered at the leading edge (text, icon, dropdown, etc.). */
  leadingAddon?: React.ReactNode;
  /** Element rendered at the trailing edge (button, dropdown, etc.). */
  trailingAddon?: React.ReactNode;
  /** Props forwarded to the inner <input>. */
  inputProps?: Omit<React.ComponentProps<"input">, "size">;
  className?: string;
}

function InputGroup({
  label,
  hint,
  isRequired = false,
  isInvalid = false,
  size = "sm",
  disabled = false,
  leadingAddon,
  trailingAddon,
  inputProps = {},
  className,
}: InputGroupProps) {
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {/* ── Label ── */}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </label>
      )}

      {/* ── Group row ── */}
      <div
        className={cn(
          "flex items-stretch rounded-lg border bg-white shadow-xs transition-colors",
          isInvalid
            ? "border-red-300 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100"
            : "border-gray-300 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10",
          disabled && "pointer-events-none bg-gray-50 opacity-50",
        )}
      >
        {/* Leading add-on */}
        {leadingAddon && (
          <div className="flex items-center border-r border-gray-300 px-3 text-sm text-gray-500">
            {leadingAddon}
          </div>
        )}

        <input
          id={id}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          aria-describedby={hintId}
          className={cn(
            "w-full bg-transparent outline-none placeholder:text-gray-400",
            inputSizes[size],
            !leadingAddon && "rounded-l-lg",
            !trailingAddon && "rounded-r-lg",
          )}
          {...inputProps}
        />

        {/* Trailing add-on */}
        {trailingAddon && (
          <div className="flex items-center border-l border-gray-300 px-3 text-sm text-gray-500">
            {trailingAddon}
          </div>
        )}
      </div>

      {/* ── Hint / error ── */}
      {hint && (
        <p
          id={hintId}
          className={cn(
            "text-sm",
            isInvalid ? "text-red-600" : "text-gray-500",
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

/* ────────────────────────────── Exports ────────────────────────────── */

export { Input, InputGroup };
