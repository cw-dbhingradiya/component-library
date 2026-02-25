import { useState } from "react";

import { Sidebar, type SidebarTab, type TabId } from "./components/Sidebar";
import { TAB_CONTENT_MAP } from "./pages";

/**
 * Derive sidebar tabs from TAB_CONTENT_MAP so adding a new component page
 * only requires a new file in src/pages and a single entry in the map.
 */
const SIDEBAR_TABS: SidebarTab[] = Object.entries(TAB_CONTENT_MAP).map(
  ([id, { title }]) => ({ id, label: title }),
);

function App() {
  const [activeTabId, setActiveTabId] = useState<TabId>(SIDEBAR_TABS[0].id);

  const activeEntry = TAB_CONTENT_MAP[activeTabId];
  const PageComponent = activeEntry?.component;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        tabs={SIDEBAR_TABS}
        activeTabId={activeTabId}
        onTabClick={setActiveTabId}
        className="bg-black"
      />
      <main className="flex-1 overflow-auto p-8 h-[calc(100vh-0px)]">
        {PageComponent ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {activeEntry.title}
            </h2>
            <PageComponent />
          </div>
        ) : (
          <p className="text-gray-500">Select a component from the sidebar.</p>
        )}
      </main>
    </div>
  );
}

export default App;
