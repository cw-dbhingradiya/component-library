import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* ────────────────────────────── Style maps ────────────────────────────── */

/**
 * Badge color palettes keyed by [type][color].
 * Each badge type (pill-color, badge-color, badge-modern) uses a different
 * visual treatment — pill is fully rounded, color is slightly rounded,
 * modern uses a subtle ring + shadow.
 */

const pillColors = {
  gray: "bg-gray-100 text-gray-700",
  brand: "bg-brand/10 text-brand",
  error: "bg-red-50 text-red-700",
  warning: "bg-amber-50 text-amber-700",
  success: "bg-green-50 text-green-700",
  "gray-blue": "bg-slate-100 text-slate-700",
  "blue-light": "bg-sky-50 text-sky-700",
  blue: "bg-blue-50 text-blue-700",
  indigo: "bg-indigo-50 text-indigo-700",
  purple: "bg-purple-50 text-purple-700",
  pink: "bg-pink-50 text-pink-700",
  orange: "bg-orange-50 text-orange-700",
} as const;

const badgeColors = {
  gray: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
  brand: "bg-brand/10 text-brand ring-1 ring-brand/20",
  error: "bg-red-50 text-red-700 ring-1 ring-red-200",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  success: "bg-green-50 text-green-700 ring-1 ring-green-200",
  "gray-blue": "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  "blue-light": "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  indigo: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  purple: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  pink: "bg-pink-50 text-pink-700 ring-1 ring-pink-200",
  orange: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
} as const;

const modernColors = {
  gray: "bg-white text-gray-700 shadow-sm ring-1 ring-gray-300",
  brand: "bg-white text-brand shadow-sm ring-1 ring-gray-300",
  error: "bg-white text-red-700 shadow-sm ring-1 ring-gray-300",
  warning: "bg-white text-amber-700 shadow-sm ring-1 ring-gray-300",
  success: "bg-white text-green-700 shadow-sm ring-1 ring-gray-300",
  "gray-blue": "bg-white text-slate-700 shadow-sm ring-1 ring-gray-300",
  "blue-light": "bg-white text-sky-700 shadow-sm ring-1 ring-gray-300",
  blue: "bg-white text-blue-700 shadow-sm ring-1 ring-gray-300",
  indigo: "bg-white text-indigo-700 shadow-sm ring-1 ring-gray-300",
  purple: "bg-white text-purple-700 shadow-sm ring-1 ring-gray-300",
  pink: "bg-white text-pink-700 shadow-sm ring-1 ring-gray-300",
  orange: "bg-white text-orange-700 shadow-sm ring-1 ring-gray-300",
} as const;

const colorMap = {
  "pill-color": pillColors,
  "badge-color": badgeColors,
  "badge-modern": modernColors,
} as const;

const dotColors = {
  gray: "bg-gray-500",
  brand: "bg-brand",
  error: "bg-red-500",
  warning: "bg-amber-500",
  success: "bg-green-500",
  "gray-blue": "bg-slate-500",
  "blue-light": "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500",
} as const;

const badgeSizes = {
  sm: "h-5.5 gap-1 px-2 text-xs",
  md: "h-6 gap-1 px-2.5 text-xs",
  lg: "h-7 gap-1.5 px-3 text-sm",
} as const;

const iconOnlySizes = {
  sm: "size-5.5 p-0",
  md: "size-6 p-0",
  lg: "size-7 p-0",
} as const;

const shapeMap = {
  "pill-color": "rounded-full",
  "badge-color": "rounded-md",
  "badge-modern": "rounded-md",
} as const;

/* ────────────────────────────── Types ────────────────────────────── */

export type BadgeType = keyof typeof colorMap;
export type BadgeColor = keyof typeof pillColors;
export type BadgeSize = keyof typeof badgeSizes;

export interface BadgeBaseProps {
  type?: BadgeType;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
}

/* ────────────────────────────── Badge (plain label) ────────────────────────────── */

export interface BadgeProps
  extends BadgeBaseProps, Omit<React.ComponentProps<"span">, "color"> {
  children: React.ReactNode;
}

/**
 * Base badge — plain label in a pill, color, or modern container.
 * All other badge variants compose this for consistent styling.
 */
function Badge({
  type = "pill-color",
  color = "gray",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium whitespace-nowrap",
        shapeMap[type],
        colorMap[type][color],
        badgeSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* ────────────────────────────── BadgeWithDot ────────────────────────────── */

export type BadgeWithDotProps = BadgeProps;

function BadgeWithDot({
  type = "pill-color",
  color = "gray",
  size = "md",
  className,
  children,
  ...props
}: BadgeWithDotProps) {
  return (
    <Badge
      type={type}
      color={color}
      size={size}
      className={className}
      {...props}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", dotColors[color])}
        aria-hidden
      />
      {children}
    </Badge>
  );
}

/* ────────────────────────────── BadgeWithIcon ────────────────────────────── */

export interface BadgeWithIconProps extends BadgeProps {
  /** Icon element shown before the label. */
    startIcon?: React.ReactNode;
  /** Icon element shown after the label. */
  endIcon?: React.ReactNode;
}

function BadgeWithIcon({
  type = "pill-color",
  color = "gray",
  size = "md",
  startIcon,
  endIcon,
  className,
  children,
  ...props
}: BadgeWithIconProps) {
  return (
    <Badge
      type={type}
      color={color}
      size={size}
      className={className}
      {...props}
    >
      {startIcon && (
        <span className="shrink-0 [&_svg]:size-3" aria-hidden>
          {startIcon}
        </span>
      )}
      {children}
      {endIcon && (
        <span className="shrink-0 [&_svg]:size-3" aria-hidden>
          {endIcon}
        </span>
      )}
    </Badge>
  );
}

/* ────────────────────────────── BadgeIcon (icon-only) ────────────────────────────── */

export interface BadgeIconProps
  extends
    BadgeBaseProps,
    Omit<React.ComponentProps<"span">, "color" | "children"> {
  icon: React.ReactNode;
}

function BadgeIcon({
  type = "pill-color",
  color = "gray",
  size = "md",
  icon,
  className,
  ...props
}: BadgeIconProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center [&_svg]:size-3",
        shapeMap[type],
        colorMap[type][color],
        iconOnlySizes[size],
        className,
      )}
      {...props}
    >
      {icon}
    </span>
  );
}

/* ────────────────────────────── BadgeWithButton (close X) ────────────────────────────── */

export interface BadgeWithButtonProps extends BadgeProps {
  /** Click handler for the close/remove button. */
  onButtonClick?: () => void;
  /** Accessible label for the close button. */
  buttonLabel?: string;
}

function BadgeWithButton({
  type = "pill-color",
  color = "gray",
  size = "md",
  onButtonClick,
  buttonLabel = "Remove",
  className,
  children,
  ...props
}: BadgeWithButtonProps) {
  return (
    <Badge
      type={type}
      color={color}
      size={size}
      className={className}
      {...props}
    >
      {children}
      <button
        type="button"
        onClick={onButtonClick}
        aria-label={buttonLabel}
        className="shrink-0 rounded-sm opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current"
      >
        <svg
          className="size-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </Badge>
  );
}

/* ────────────────────────────── BadgeWithImage (avatar / flag) ────────────────────────────── */

export interface BadgeWithImageProps extends BadgeProps {
  /** Image source URL (avatar, flag, etc.). */
  imgSrc: string;
  imgAlt?: string;
}

function BadgeWithImage({
  type = "pill-color",
  color = "gray",
  size = "md",
  imgSrc,
  imgAlt = "",
  className,
  children,
  ...props
}: BadgeWithImageProps) {
  const imgSize = size === "lg" ? "size-4" : "size-3.5";

  return (
    <Badge
      type={type}
      color={color}
      size={size}
      className={className}
      {...props}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        className={cn("shrink-0 rounded-full object-cover", imgSize)}
      />
      {children}
    </Badge>
  );
}

/* ────────────────────────────── Exports ────────────────────────────── */

export {
  Badge,
  BadgeWithDot,
  BadgeWithIcon,
  BadgeIcon,
  BadgeWithButton,
  BadgeWithImage,
};
