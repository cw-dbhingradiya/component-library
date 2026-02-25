import { JSX } from 'react/jsx-runtime';
import * as React_2 from 'react';

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

export { }
