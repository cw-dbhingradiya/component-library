import { JSX } from 'react/jsx-runtime';
import * as React_2 from 'react';

/**
 * Base badge — plain label in a pill, color, or modern container.
 * All other badge variants compose this for consistent styling.
 */
export declare function Badge({ type, color, size, className, children, ...props }: BadgeProps): JSX.Element;

export declare interface BadgeBaseProps {
    type?: BadgeType;
    color?: BadgeColor;
    size?: BadgeSize;
    className?: string;
}

export declare type BadgeColor = keyof typeof pillColors;

export declare function BadgeIcon({ type, color, size, icon, className, ...props }: BadgeIconProps): JSX.Element;

export declare interface BadgeIconProps extends BadgeBaseProps, Omit<React_2.ComponentProps<"span">, "color" | "children"> {
    icon: React_2.ReactNode;
}

export declare interface BadgeProps extends BadgeBaseProps, Omit<React_2.ComponentProps<"span">, "color"> {
    children: React_2.ReactNode;
}

export declare type BadgeSize = keyof typeof badgeSizes;

declare const badgeSizes: {
    readonly sm: "h-5.5 gap-1 px-2 text-xs";
    readonly md: "h-6 gap-1 px-2.5 text-xs";
    readonly lg: "h-7 gap-1.5 px-3 text-sm";
};

export declare type BadgeType = keyof typeof colorMap;

export declare function BadgeWithButton({ type, color, size, onButtonClick, buttonLabel, className, children, ...props }: BadgeWithButtonProps): JSX.Element;

export declare interface BadgeWithButtonProps extends BadgeProps {
    /** Click handler for the close/remove button. */
    onButtonClick?: () => void;
    /** Accessible label for the close button. */
    buttonLabel?: string;
}

export declare function BadgeWithDot({ type, color, size, className, children, ...props }: BadgeWithDotProps): JSX.Element;

export declare type BadgeWithDotProps = BadgeProps;

export declare function BadgeWithIcon({ type, color, size, startIcon, endIcon, className, children, ...props }: BadgeWithIconProps): JSX.Element;

export declare interface BadgeWithIconProps extends BadgeProps {
    /** Icon element shown before the label. */
    startIcon?: React_2.ReactNode;
    /** Icon element shown after the label. */
    endIcon?: React_2.ReactNode;
}

export declare function BadgeWithImage({ type, color, size, imgSrc, imgAlt, className, children, ...props }: BadgeWithImageProps): JSX.Element;

export declare interface BadgeWithImageProps extends BadgeProps {
    /** Image source URL (avatar, flag, etc.). */
    imgSrc: string;
    imgAlt?: string;
}

/**
 * Hybrid button/link component styled like Untitled UI buttons.
 * Renders as <a> when href is provided, otherwise <button>.
 * Supports variants (primary, secondary, tertiary, link-*, destructive), sizes,
 * leading/trailing icons, loading state, and disabled state.
 */
export declare function Button({ variant, size, startIcon, endIcon, isLoading, showTextWhileLoading, isDisabled, href, className, children, disabled, type, ...props }: ButtonProps): JSX.Element;

export declare interface ButtonProps extends React_2.ComponentProps<"button"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Icon component or element (with data-icon) shown before label. */
    startIcon?: React_2.ReactNode;
    /** Icon component or element (with data-icon) shown after label. */
    endIcon?: React_2.ReactNode;
    isLoading?: boolean;
    /** When true, label stays visible next to spinner during loading. */
    showTextWhileLoading?: boolean;
    isDisabled?: boolean;
    /** When set, renders as <a> with button styling (link-style button). */
    href?: string;
    /** Optional class name merged with default styles. */
    className?: string;
}

export declare type ButtonSize = keyof typeof buttonSizes;

declare const buttonSizes: {
    readonly sm: "h-8 gap-1.5 rounded-lg px-3 text-sm [&_[data-icon]]:size-4";
    readonly md: "h-10 gap-2 rounded-lg px-4 text-sm [&_[data-icon]]:size-5";
    readonly lg: "h-11 gap-2 rounded-lg px-4.5 text-base [&_[data-icon]]:size-5";
    readonly xl: "h-12 gap-2.5 rounded-xl px-5 text-base [&_[data-icon]]:size-6";
};

export declare type ButtonVariant = keyof typeof buttonVariants;

declare const buttonVariants: {
    readonly primary: "bg-brand text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
    readonly secondary: "bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
    readonly tertiary: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
    readonly "link-color": "bg-transparent text-brand hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
    readonly "link-gray": "bg-transparent text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400";
    readonly "primary-destructive": "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";
    readonly "secondary-destructive": "bg-white text-red-700 ring-1 ring-red-300 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";
    readonly "tertiary-destructive": "bg-transparent text-red-700 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";
};

declare const colorMap: {
    readonly "pill-color": {
        readonly gray: "bg-gray-100 text-gray-700";
        readonly brand: "bg-brand/10 text-brand";
        readonly error: "bg-red-50 text-red-700";
        readonly warning: "bg-amber-50 text-amber-700";
        readonly success: "bg-green-50 text-green-700";
        readonly "gray-blue": "bg-slate-100 text-slate-700";
        readonly "blue-light": "bg-sky-50 text-sky-700";
        readonly blue: "bg-blue-50 text-blue-700";
        readonly indigo: "bg-indigo-50 text-indigo-700";
        readonly purple: "bg-purple-50 text-purple-700";
        readonly pink: "bg-pink-50 text-pink-700";
        readonly orange: "bg-orange-50 text-orange-700";
    };
    readonly "badge-color": {
        readonly gray: "bg-gray-100 text-gray-700 ring-1 ring-gray-200";
        readonly brand: "bg-brand/10 text-brand ring-1 ring-brand/20";
        readonly error: "bg-red-50 text-red-700 ring-1 ring-red-200";
        readonly warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
        readonly success: "bg-green-50 text-green-700 ring-1 ring-green-200";
        readonly "gray-blue": "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
        readonly "blue-light": "bg-sky-50 text-sky-700 ring-1 ring-sky-200";
        readonly blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
        readonly indigo: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200";
        readonly purple: "bg-purple-50 text-purple-700 ring-1 ring-purple-200";
        readonly pink: "bg-pink-50 text-pink-700 ring-1 ring-pink-200";
        readonly orange: "bg-orange-50 text-orange-700 ring-1 ring-orange-200";
    };
    readonly "badge-modern": {
        readonly gray: "bg-white text-gray-700 shadow-sm ring-1 ring-gray-300";
        readonly brand: "bg-white text-brand shadow-sm ring-1 ring-gray-300";
        readonly error: "bg-white text-red-700 shadow-sm ring-1 ring-gray-300";
        readonly warning: "bg-white text-amber-700 shadow-sm ring-1 ring-gray-300";
        readonly success: "bg-white text-green-700 shadow-sm ring-1 ring-gray-300";
        readonly "gray-blue": "bg-white text-slate-700 shadow-sm ring-1 ring-gray-300";
        readonly "blue-light": "bg-white text-sky-700 shadow-sm ring-1 ring-gray-300";
        readonly blue: "bg-white text-blue-700 shadow-sm ring-1 ring-gray-300";
        readonly indigo: "bg-white text-indigo-700 shadow-sm ring-1 ring-gray-300";
        readonly purple: "bg-white text-purple-700 shadow-sm ring-1 ring-gray-300";
        readonly pink: "bg-white text-pink-700 shadow-sm ring-1 ring-gray-300";
        readonly orange: "bg-white text-orange-700 shadow-sm ring-1 ring-gray-300";
    };
};

/**
 * Standalone input field styled like Untitled UI inputs.
 *
 * What: a label + input + optional hint with leading icon, keyboard-shortcut
 * badge, required indicator, disabled, and invalid states.
 *
 * Why standalone: covers the majority of form input use-cases without
 * needing the heavier InputGroup wrapper (leading text, dropdowns, etc.).
 */
export declare const Input: React_2.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React_2.RefAttributes<HTMLInputElement>>;

export declare function InputGroup({ label, hint, isRequired, isInvalid, size, disabled, leadingAddon, trailingAddon, inputProps, className, }: InputGroupProps): JSX.Element;

/**
 * InputGroup wraps an Input with leading/trailing add-ons: text, buttons,
 * or dropdowns — for composite inputs like currency amounts, URLs, or phone numbers.
 *
 * What: a horizontal group container that visually merges add-ons with the input.
 * Why: keeps each add-on as a separate React element while presenting a single
 * unified form control to the user.
 */
export declare interface InputGroupProps {
    /** Visible label above the group. */
    label?: string;
    /** Hint or error message below the group. */
    hint?: string;
    isRequired?: boolean;
    isInvalid?: boolean;
    size?: InputSize;
    disabled?: boolean;
    /** Element rendered at the leading edge (text, icon, dropdown, etc.). */
    leadingAddon?: React_2.ReactNode;
    /** Element rendered at the trailing edge (button, dropdown, etc.). */
    trailingAddon?: React_2.ReactNode;
    /** Props forwarded to the inner <input>. */
    inputProps?: Omit<React_2.ComponentProps<"input">, "size">;
    className?: string;
}

export declare interface InputProps extends Omit<React_2.ComponentProps<"input">, "size"> {
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
    icon?: React_2.ReactNode;
    /**
     * Keyboard shortcut badge shown at the trailing edge.
     * Pass `true` for default "⌘K" or a string for custom text.
     */
    shortcut?: boolean | string;
    /** Tooltip content — renders a help (?) icon next to the label. */
    tooltip?: string;
}

export declare type InputSize = keyof typeof inputSizes;

declare const inputSizes: {
    readonly sm: "h-10 px-3 py-2 text-sm";
    readonly md: "h-12 px-3.5 py-3 text-base";
};

/**
 * Badge color palettes keyed by [type][color].
 * Each badge type (pill-color, badge-color, badge-modern) uses a different
 * visual treatment — pill is fully rounded, color is slightly rounded,
 * modern uses a subtle ring + shadow.
 */
declare const pillColors: {
    readonly gray: "bg-gray-100 text-gray-700";
    readonly brand: "bg-brand/10 text-brand";
    readonly error: "bg-red-50 text-red-700";
    readonly warning: "bg-amber-50 text-amber-700";
    readonly success: "bg-green-50 text-green-700";
    readonly "gray-blue": "bg-slate-100 text-slate-700";
    readonly "blue-light": "bg-sky-50 text-sky-700";
    readonly blue: "bg-blue-50 text-blue-700";
    readonly indigo: "bg-indigo-50 text-indigo-700";
    readonly purple: "bg-purple-50 text-purple-700";
    readonly pink: "bg-pink-50 text-pink-700";
    readonly orange: "bg-orange-50 text-orange-700";
};

/**
 * Custom select dropdown styled like Untitled UI selects.
 *
 * What: a trigger button + floating listbox with optional search, avatars,
 * leading icons, status dots, and keyboard navigation.
 *
 * Why custom instead of native <select>: enables rich option rendering
 * (avatars, dots, descriptions) while keeping full keyboard & ARIA support.
 */
export declare function Select({ label, hint, isRequired, isInvalid, isDisabled, size, placeholder, icon, options, value: controlledValue, defaultValue, onChange, className, }: SelectProps): JSX.Element;

export declare interface SelectOption {
    /** Unique value submitted with the form. */
    value: string;
    /** Primary label shown in the trigger and dropdown. */
    label: string;
    /** Optional secondary text (e.g. @handle). */
    description?: string;
    /** URL for an avatar image rendered before the label. */
    avatar?: string;
    /** Leading icon element rendered before the label. */
    icon?: React_2.ReactNode;
    /** Dot color — any Tailwind bg-* class (e.g. "bg-green-500"). */
    dot?: string;
    disabled?: boolean;
}

export declare interface SelectProps {
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
    icon?: React_2.ReactNode;
    options: SelectOption[];
    /** Controlled value. */
    value?: string;
    /** Default value for uncontrolled usage. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export declare type SelectSize = keyof typeof triggerSizes;

/**
 * Select with a built-in search field inside the dropdown.
 *
 * What: extends Select with a text filter so users can narrow long lists.
 * Why separate: keeps the base Select lightweight; search adds extra state
 * and DOM that many use-cases don't need.
 */
export declare function SelectWithSearch({ label, hint, isRequired, isInvalid, isDisabled, size, placeholder, searchPlaceholder, icon, options, value: controlledValue, defaultValue, onChange, className, }: SelectWithSearchProps): JSX.Element;

export declare interface SelectWithSearchProps extends Omit<SelectProps, "placeholder"> {
    /** Placeholder for the search input. */
    searchPlaceholder?: string;
    placeholder?: string;
}

/**
 * Multi-select that renders selected values as removable tag badges.
 *
 * What: a trigger with tags + a searchable dropdown for picking multiple options.
 * Why: common pattern for assigning labels, team members, categories, etc.
 */
export declare function SelectWithTags({ label, hint, isRequired, isInvalid, isDisabled, placeholder, options, value: controlledValue, defaultValue, onChange, className, }: SelectWithTagsProps): JSX.Element;

export declare interface SelectWithTagsProps extends Omit<SelectProps, "value" | "defaultValue" | "onChange" | "placeholder" | "size"> {
    /** Controlled multi-select values. */
    value?: string[];
    defaultValue?: string[];
    onChange?: (values: string[]) => void;
    placeholder?: string;
}

/**
 * Sidebar with clickable tab items. Highlights the active tab and
 * calls onTabClick when a tab is selected so the parent can switch content.
 * Consumer className is merged so conflicting utilities (e.g. bg-*) override defaults.
 */
export declare function Sidebar({ tabs, activeTabId, onTabClick, className, }: SidebarProps): JSX.Element;

declare interface SidebarProps {
    tabs: SidebarTab[];
    activeTabId: TabId;
    onTabClick: (id: TabId) => void;
    /** Optional Tailwind classes applied to the sidebar container (e.g. for background). */
    className?: string;
}

export declare interface SidebarTab {
    id: TabId;
    label: string;
}

export declare type TabId = string;

declare const triggerSizes: {
    readonly sm: "h-10 px-3 py-2 text-sm";
    readonly md: "h-12 px-3.5 py-3 text-base";
};

export { }
