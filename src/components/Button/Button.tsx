import * as React from "react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = {
  primary:
    "bg-brand text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  secondary:
    "bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  tertiary:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  "link-color":
    "bg-transparent text-brand hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  "link-gray":
    "bg-transparent text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400",
  "primary-dark":
    "bg-white text-[#0A0A0A] shadow-sm hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  "primary-destructive":
    "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
  "secondary-destructive":
    "bg-white text-red-700 ring-1 ring-red-300 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
  "tertiary-destructive":
    "bg-transparent text-red-700 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
} as const;

const buttonSizes = {
  sm: "h-8 gap-1.5 rounded-lg px-3 text-sm [&_[data-icon]]:size-4",
  md: "h-10 gap-2 rounded-lg px-4 text-sm [&_[data-icon]]:size-5",
  lg: "h-11 gap-2 rounded-lg px-4.5 text-base [&_[data-icon]]:size-5",
  xl: "h-12 gap-2.5 rounded-xl px-5 text-base [&_[data-icon]]:size-6",
} as const;

const iconOnlyMinWidth = {
  sm: "min-w-8",
  md: "min-w-10",
  lg: "min-w-11",
  xl: "min-w-12",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon component or element (with data-icon) shown before label. */
  startIcon?: React.ReactNode;
  /** Icon component or element (with data-icon) shown after label. */
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  /** When true, label stays visible next to spinner during loading. */
  showTextWhileLoading?: boolean;
  isDisabled?: boolean;
  /** When set, renders as <a> with button styling (link-style button). */
  href?: string;
  /** Optional class name merged with default styles. */
  className?: string;
}

/**
 * Hybrid button/link component styled like Untitled UI buttons.
 * Renders as <a> when href is provided, otherwise <button>.
 * Supports variants (primary, secondary, tertiary, link-*, destructive), sizes,
 * leading/trailing icons, loading state, and disabled state.
 */
function Button({
  variant = "primary",
  size = "sm",
  startIcon,
  endIcon,
  isLoading = false,
  showTextWhileLoading = false,
  isDisabled = false,
  href,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const disabledState = isDisabled || disabled || isLoading;
  const base =
    "cursor-pointer inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

  const content = (
    <>
      {isLoading && (
        <span
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      {!isLoading && startIcon && (
        <span data-icon className="shrink-0">
          {startIcon}
        </span>
      )}
      {(showTextWhileLoading || !isLoading) && children != null && (
        <span>{children}</span>
      )}
      {!isLoading && endIcon && (
        <span data-icon className="shrink-0">
          {endIcon}
        </span>
      )}
    </>
  );

  const needsMinWidth =
    isLoading ||
    ((children == null || children === "") && (!!startIcon || !!endIcon));

  const classes = cn(
    base,
    buttonVariants[variant],
    buttonSizes[size],
    needsMinWidth && iconOnlyMinWidth[size],
    className,
  );

  if (href != null && !disabledState) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={undefined}
        {...(props as React.ComponentProps<"a">)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabledState}
      aria-busy={isLoading}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
