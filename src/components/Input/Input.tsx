import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { HelpCircle, AlertCircle } from "lucide-react";

/* ────────────────────────────── Size maps ────────────────────────────── */

const inputSizes = {
  sm: "h-10 px-3 py-2 text-sm",
  md: "h-12 px-3.5 py-3 text-base",
} as const;

const iconSizes = {
  sm: "[&_svg]:size-5",
  md: "[&_svg]:size-5",
} as const;

/* ────────────────────────────── Theme maps ────────────────────────────── */

/**
 * What: Color tokens for light and dark theme variants.
 * Why: Lets the same Input component work in light pages and dark modals
 *      without any external style overrides.
 */
const themeMap = {
  light: {
    label: "text-gray-700",
    wrapper: "border-gray-300 bg-white shadow-xs",
    wrapperFocus:
      "focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10",
    wrapperInvalid:
      "border-red-300 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100",
    wrapperDisabled: "bg-gray-50",
    icon: "text-gray-500",
    input: "placeholder:text-gray-400",
    invalidIcon: "text-red-500",
    hint: "text-gray-500",
    hintInvalid: "text-red-600",
    tooltipIcon: "text-gray-400",
    shortcut:
      "border-gray-200 bg-gray-50 text-gray-500",
  },
  dark: {
    label: "text-neutral-300",
    wrapper: "border-neutral-700 bg-[#0A0A0A]",
    wrapperFocus: "focus-within:border-neutral-500",
    wrapperInvalid:
      "border-red-500/60 focus-within:border-red-500",
    wrapperDisabled: "bg-neutral-900",
    icon: "text-neutral-500",
    input: "text-white placeholder:text-neutral-600",
    invalidIcon: "text-red-400",
    hint: "text-neutral-500",
    hintInvalid: "text-red-400",
    tooltipIcon: "text-neutral-500",
    shortcut:
      "border-neutral-700 bg-neutral-800 text-neutral-400",
  },
} as const;

export type InputTheme = keyof typeof themeMap;

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
  /** Color theme — use "dark" inside dark-themed containers like modals. */
  theme?: InputTheme;
  /** Icon component rendered at the leading edge of the input. */
  icon?: React.ReactNode;
  /** Interactive element rendered at the trailing edge (e.g. password toggle). */
  trailingAction?: React.ReactNode;
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
    theme = "light",
    icon,
    trailingAction,
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
  const t = themeMap[theme];

  return (
    <div className="flex flex-col gap-1.5">
      {/* ── Label row ── */}
      {label && (
        <div className="flex items-center gap-1">
          <label
            htmlFor={id}
            className={cn("text-sm font-medium", t.label)}
          >
            {label}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
          {tooltip && (
            <span className="group relative">
              <HelpCircle className={cn("size-4", t.tooltipIcon)} />
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
          "flex items-center gap-2 rounded-lg border transition-colors",
          isInvalid ? t.wrapperInvalid : cn(t.wrapper, t.wrapperFocus),
          disabled && cn("pointer-events-none opacity-50", t.wrapperDisabled),
          inputSizes[size],
        )}
      >
        {/* Leading icon */}
        {icon && (
          <span
            className={cn("shrink-0", t.icon, iconSizes[size])}
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
            "w-full bg-transparent outline-none",
            t.input,
            className,
          )}
          {...props}
        />

        {/* Trailing action (e.g. password visibility toggle) */}
        {trailingAction}

        {/* Invalid icon */}
        {isInvalid && !trailingAction && (
          <AlertCircle
            className={cn("size-4 shrink-0", t.invalidIcon)}
            aria-hidden
          />
        )}

        {/* Shortcut badge */}
        {shortcut && (
          <kbd
            className={cn(
              "shrink-0 rounded border px-1.5 py-0.5 text-xs font-medium",
              t.shortcut,
            )}
          >
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
            isInvalid ? t.hintInvalid : t.hint,
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
