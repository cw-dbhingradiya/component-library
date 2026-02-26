import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* ────────────────────────────── Size maps ────────────────────────────── */

const triggerSizes = {
  sm: "h-10 px-3 py-2 text-sm",
  md: "h-12 px-3.5 py-3 text-base",
} as const;

/* ────────────────────────────── Types ────────────────────────────── */

export type SelectSize = keyof typeof triggerSizes;

export interface SelectOption {
  /** Unique value submitted with the form. */
  value: string;
  /** Primary label shown in the trigger and dropdown. */
  label: string;
  /** Optional secondary text (e.g. @handle). */
  description?: string;
  /** URL for an avatar image rendered before the label. */
  avatar?: string;
  /** Leading icon element rendered before the label. */
  icon?: React.ReactNode;
  /** Dot color — any Tailwind bg-* class (e.g. "bg-green-500"). */
  dot?: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Visible label above the trigger. */
  label?: string;
  /** Hint or error message below the trigger. */
  hint?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  size?: SelectSize;
  /** Placeholder text when no value is selected. */
  placeholder?: string;
  /** Leading icon rendered inside the trigger (to the left of the selected value). */
  icon?: React.ReactNode;
  options: SelectOption[];
  /** Controlled value. */
  value?: string;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * Custom select dropdown styled like Untitled UI selects.
 *
 * What: a trigger button + floating listbox with optional search, avatars,
 * leading icons, status dots, and keyboard navigation.
 *
 * Why custom instead of native <select>: enables rich option rendering
 * (avatars, dots, descriptions) while keeping full keyboard & ARIA support.
 */
function Select({
  label,
  hint,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  size = "sm",
  placeholder = "Select an option",
  icon,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
}: SelectProps) {
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const listboxId = `${id}-listbox`;

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = React.useState(false);
  const [highlightIdx, setHighlightIdx] = React.useState(-1);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const selectedOption = options.find((o) => o.value === selectedValue);

  /* ── Close on outside click ── */
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        listRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  /* ── Close on Escape ── */
  React.useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  /* ── Scroll highlighted option into view ── */
  React.useEffect(() => {
    if (!open || highlightIdx < 0) return;
    const el = listRef.current?.children[highlightIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, highlightIdx]);

  function handleSelect(opt: SelectOption) {
    if (opt.disabled) return;
    if (!isControlled) setInternalValue(opt.value);
    onChange?.(opt.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setHighlightIdx(0);
    }
  }

  function handleListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIdx((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIdx((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightIdx >= 0 && options[highlightIdx]) {
          handleSelect(options[highlightIdx]);
        }
        break;
      case "Escape":
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  }

  /* ── Render an option's leading decoration ── */
  function renderLeading(opt: SelectOption) {
    if (opt.avatar) {
      return (
        <img
          src={opt.avatar}
          alt=""
          className="size-6 shrink-0 rounded-full object-cover"
        />
      );
    }
    if (opt.icon) {
      return (
        <span className="shrink-0 text-gray-500 [&_svg]:size-5" aria-hidden>
          {opt.icon}
        </span>
      );
    }
    if (opt.dot) {
      return (
        <span
          className={cn("size-2 shrink-0 rounded-full", opt.dot)}
          aria-hidden
        />
      );
    }
    return null;
  }

  /* ── Chevron icon ── */
  const Chevron = (
    <svg
      className={cn(
        "size-5 shrink-0 text-gray-500 transition-transform",
        open && "rotate-180",
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );

  /* ── Checkmark icon ── */
  const Check = (
    <svg
      className="size-5 shrink-0 text-brand"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className={cn("relative flex flex-col gap-1.5", className)}>
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

      {/* ── Trigger ── */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-describedby={hintId}
        aria-invalid={isInvalid || undefined}
        disabled={isDisabled}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border bg-white shadow-xs transition-colors text-left",
          isInvalid
            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            : "border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10",
          isDisabled && "pointer-events-none bg-gray-50 opacity-50",
          triggerSizes[size],
        )}
      >
        {/* Leading icon on the trigger */}
        {icon && (
          <span className="shrink-0 text-gray-500 [&_svg]:size-5" aria-hidden>
            {icon}
          </span>
        )}

        {/* Selected value display */}
        {selectedOption ? (
          <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
            {renderLeading(selectedOption)}
            <span className="truncate text-gray-900">
              {selectedOption.label}
            </span>
          </span>
        ) : (
          <span className="flex-1 truncate text-gray-400">{placeholder}</span>
        )}

        {Chevron}
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className="absolute top-full z-50 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none"
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === selectedValue;
            const isHighlighted = idx === highlightIdx;

            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled || undefined}
                onMouseEnter={() => setHighlightIdx(idx)}
                onClick={() => handleSelect(opt)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                  isHighlighted && "bg-gray-50",
                  isSelected && "bg-gray-50",
                  opt.disabled && "pointer-events-none opacity-50",
                )}
              >
                {renderLeading(opt)}
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-gray-900">{opt.label}</span>
                  {opt.description && (
                    <span className="truncate text-xs text-gray-500">
                      {opt.description}
                    </span>
                  )}
                </span>
                {isSelected && Check}
              </li>
            );
          })}
        </ul>
      )}

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

/* ────────────────────────────── SelectWithSearch ────────────────────────────── */

export interface SelectWithSearchProps extends Omit<SelectProps, "placeholder"> {
  /** Placeholder for the search input. */
  searchPlaceholder?: string;
  placeholder?: string;
}

/**
 * Select with a built-in search field inside the dropdown.
 *
 * What: extends Select with a text filter so users can narrow long lists.
 * Why separate: keeps the base Select lightweight; search adds extra state
 * and DOM that many use-cases don't need.
 */
function SelectWithSearch({
  label,
  hint,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  size = "sm",
  placeholder = "Select an option",
  searchPlaceholder = "Search…",
  icon,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
}: SelectWithSearchProps) {
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const listboxId = `${id}-listbox`;

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [highlightIdx, setHighlightIdx] = React.useState(-1);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === selectedValue);

  const filtered = query
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          o.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  /* ── Focus search input when opening ── */
  React.useEffect(() => {
    if (open) {
      requestAnimationFrame(() => searchRef.current?.focus());
      setQuery("");
      setHighlightIdx(0);
    }
  }, [open]);

  /* ── Close on outside click ── */
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        listRef.current?.parentElement?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  /* ── Scroll highlighted into view ── */
  React.useEffect(() => {
    if (!open || highlightIdx < 0) return;
    const el = listRef.current?.children[highlightIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, highlightIdx]);

  function handleSelect(opt: SelectOption) {
    if (opt.disabled) return;
    if (!isControlled) setInternalValue(opt.value);
    onChange?.(opt.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleSearchKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIdx((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIdx >= 0 && filtered[highlightIdx]) {
          handleSelect(filtered[highlightIdx]);
        }
        break;
      case "Escape":
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  }

  /* ── Leading decoration renderer ── */
  function renderLeading(opt: SelectOption) {
    if (opt.avatar) {
      return (
        <img
          src={opt.avatar}
          alt=""
          className="size-6 shrink-0 rounded-full object-cover"
        />
      );
    }
    if (opt.icon) {
      return (
        <span className="shrink-0 text-gray-500 [&_svg]:size-5" aria-hidden>
          {opt.icon}
        </span>
      );
    }
    if (opt.dot) {
      return (
        <span
          className={cn("size-2 shrink-0 rounded-full", opt.dot)}
          aria-hidden
        />
      );
    }
    return null;
  }

  const Chevron = (
    <svg
      className={cn(
        "size-5 shrink-0 text-gray-500 transition-transform",
        open && "rotate-180",
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );

  const Check = (
    <svg
      className="size-5 shrink-0 text-brand"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className={cn("relative flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </label>
      )}

      {/* ── Trigger ── */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-describedby={hintId}
        aria-invalid={isInvalid || undefined}
        disabled={isDisabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border bg-white shadow-xs transition-colors text-left",
          isInvalid
            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            : "border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10",
          isDisabled && "pointer-events-none bg-gray-50 opacity-50",
          triggerSizes[size],
        )}
      >
        {icon && (
          <span className="shrink-0 text-gray-500 [&_svg]:size-5" aria-hidden>
            {icon}
          </span>
        )}
        {selectedOption ? (
          <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
            {renderLeading(selectedOption)}
            <span className="truncate text-gray-900">{selectedOption.label}</span>
          </span>
        ) : (
          <span className="flex-1 truncate text-gray-400">{placeholder}</span>
        )}
        {Chevron}
      </button>

      {/* ── Dropdown with search ── */}
      {open && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* Search field */}
          <div className="border-b border-gray-200 px-3 py-2">
            <div className="flex items-center gap-2">
              <svg
                className="size-4 shrink-0 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlightIdx(0);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            className="max-h-56 overflow-auto py-1 focus:outline-none"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-gray-500">
                No results found
              </li>
            )}
            {filtered.map((opt, idx) => {
              const isSelected = opt.value === selectedValue;
              const isHighlighted = idx === highlightIdx;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled || undefined}
                  onMouseEnter={() => setHighlightIdx(idx)}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                    isHighlighted && "bg-gray-50",
                    isSelected && "bg-gray-50",
                    opt.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  {renderLeading(opt)}
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-gray-900">{opt.label}</span>
                    {opt.description && (
                      <span className="truncate text-xs text-gray-500">
                        {opt.description}
                      </span>
                    )}
                  </span>
                  {isSelected && Check}
                </li>
              );
            })}
          </ul>
        </div>
      )}

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

/* ────────────────────────────── SelectWithTags ────────────────────────────── */

export interface SelectWithTagsProps
  extends Omit<SelectProps, "value" | "defaultValue" | "onChange" | "placeholder" | "size"> {
  /** Controlled multi-select values. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
}

/**
 * Multi-select that renders selected values as removable tag badges.
 *
 * What: a trigger with tags + a searchable dropdown for picking multiple options.
 * Why: common pattern for assigning labels, team members, categories, etc.
 */
function SelectWithTags({
  label,
  hint,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  placeholder = "Search…",
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
}: SelectWithTagsProps) {
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;

  const [internalValue, setInternalValue] = React.useState<string[]>(
    defaultValue ?? [],
  );
  const isControlled = controlledValue !== undefined;
  const selectedValues = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const filtered = query
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          o.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  /* ── Close on outside click ── */
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function toggleValue(val: string) {
    const next = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  function removeTag(val: string) {
    const next = selectedValues.filter((v) => v !== val);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  return (
    <div ref={wrapperRef} className={cn("relative flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </label>
      )}

      {/* ── Trigger area ── */}
      <div
        onClick={() => {
          if (isDisabled) return;
          setOpen(true);
          requestAnimationFrame(() => searchRef.current?.focus());
        }}
        className={cn(
          "flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border bg-white px-3 py-2 shadow-xs transition-colors",
          isInvalid
            ? "border-red-300 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100"
            : "border-gray-300 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10",
          isDisabled && "pointer-events-none bg-gray-50 opacity-50",
        )}
      >
        {/* Selected tags */}
        {selectedValues.map((val) => {
          const opt = options.find((o) => o.value === val);
          if (!opt) return null;
          return (
            <span
              key={val}
              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"
            >
              {opt.label}
              <button
                type="button"
                aria-label={`Remove ${opt.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(val);
                }}
                className="shrink-0 opacity-60 hover:opacity-100"
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
            </span>
          );
        })}

        {/* Inline search input */}
        <input
          ref={searchRef}
          id={id}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={selectedValues.length === 0 ? placeholder : ""}
          disabled={isDisabled}
          aria-describedby={hintId}
          className="min-w-16 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      {/* ── Dropdown ── */}
      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute top-full z-50 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 && (
            <li className="px-3 py-4 text-center text-sm text-gray-500">
              No results found
            </li>
          )}
          {filtered.map((opt) => {
            const isSelected = selectedValues.includes(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled || undefined}
                onClick={() => toggleValue(opt.value)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors hover:bg-gray-50",
                  isSelected && "bg-gray-50",
                  opt.disabled && "pointer-events-none opacity-50",
                )}
              >
                {/* Checkbox indicator */}
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border",
                    isSelected
                      ? "border-brand bg-brand text-white"
                      : "border-gray-300",
                  )}
                >
                  {isSelected && (
                    <svg
                      className="size-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-gray-900">{opt.label}</span>
                  {opt.description && (
                    <span className="truncate text-xs text-gray-500">
                      {opt.description}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}

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

export { Select, SelectWithSearch, SelectWithTags };
