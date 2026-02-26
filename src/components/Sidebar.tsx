import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { LogOut } from "lucide-react";

export type TabId = string;

export interface SidebarTab {
  id: TabId;
  label: string;
}

interface SidebarProps {
  tabs: SidebarTab[];
  activeTabId: TabId;
  onTabClick: (id: TabId) => void;
  /** Optional callback – when provided a Logout button is rendered at the bottom. */
  onLogout?: () => void;
  /** Optional Tailwind classes applied to the sidebar container (e.g. for background). */
  className?: string;
}

/**
 * Sidebar with clickable tab items. Highlights the active tab and
 * calls onTabClick when a tab is selected so the parent can switch content.
 * When onLogout is provided a logout button is pinned to the sidebar bottom.
 * Consumer className is merged so conflicting utilities (e.g. bg-*) override defaults.
 */
export function Sidebar({
  tabs,
  activeTabId,
  onTabClick,
  onLogout,
  className,
}: SidebarProps) {
  return (
    <aside
      className={twMerge(
        "flex h-full w-56 shrink-0 flex-col border-r border-gray-200 bg-gray-50 p-4",
        className,
      )}
    >
      <nav className="flex flex-1 flex-col gap-1" aria-label="Sidebar navigation">
        {tabs.map((tab, i) => {
          const isActive = tab.id === activeTabId;
          return (
            <motion.button
              key={tab.id}
              type="button"
              onClick={() => onTabClick(tab.id)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-current={isActive ? "page" : undefined}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-black"
                  : "text-gray-200 hover:text-gray-800 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </motion.button>
          );
        })}
      </nav>

      {onLogout && (
        <motion.button
          type="button"
          onClick={onLogout}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 flex w-full items-center gap-2.5 rounded-lg border-t border-gray-700 px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="size-4" />
          Logout
        </motion.button>
      )}
    </aside>
  );
}
