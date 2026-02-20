import { twMerge } from 'tailwind-merge';

export type TabId = string;

export interface SidebarTab {
  id: TabId;
  label: string;
}

interface SidebarProps {
  tabs: SidebarTab[];
  activeTabId: TabId;
  onTabClick: (id: TabId) => void;
  /** Optional Tailwind classes applied to the sidebar container (e.g. for background). */
  className?: string;
}

/**
 * Sidebar with clickable tab items. Highlights the active tab and
 * calls onTabClick when a tab is selected so the parent can switch content.
 * Consumer className is merged so conflicting utilities (e.g. bg-*) override defaults.
 */
export function Sidebar({ tabs, activeTabId, onTabClick, className }: SidebarProps) {
  return (
    <aside
      className={twMerge(
        'w-56 shrink-0 border-r border-gray-200 bg-gray-50 p-4',
        className
      )}
    >
      <nav className="flex flex-col gap-1" aria-label="Sidebar navigation">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabClick(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
