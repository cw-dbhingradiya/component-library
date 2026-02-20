import { JSX } from 'react/jsx-runtime';

/**
 * Sidebar with clickable tab items. Highlights the active tab and
 * calls onTabClick when a tab is selected so the parent can switch content.
 * Consumer className is merged so conflicting utilities (e.g. bg-*) override defaults.
 */
export declare function Sidebar({ tabs, activeTabId, onTabClick, className }: SidebarProps): JSX.Element;

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
