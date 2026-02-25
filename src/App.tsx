import { useState } from "react";

import { Sidebar, type SidebarTab, type TabId } from "./components/Sidebar";

const SIDEBAR_TABS: SidebarTab[] = [
  { id: "overview", label: "Overview" },
  { id: "components", label: "Components" },
  { id: "settings", label: "Settings" },
];

/**
 * Content shown for each tab. In a real app this could be separate components or routes.
 */
function TabContent({ tabId }: { tabId: TabId }) {
  switch (tabId) {
    case "overview":
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
          <p className="text-gray-600">
            Welcome to the overview. This content changes when you click a
            different tab in the sidebar.
          </p>
        </div>
      );
    case "components":
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Components</h2>
          <p className="text-gray-600">
            Component library content. Add or edit tabs in App to show more
            sections here.
          </p>
        </div>
      );
    case "settings":
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
          <p className="text-gray-600">
            Settings and preferences. Right-side content updates based on the
            selected sidebar tab.
          </p>
        </div>
      );
    default:
      return <p className="text-gray-500">Select a tab from the sidebar.</p>;
  }
}

function App() {
  const [activeTabId, setActiveTabId] = useState<TabId>(SIDEBAR_TABS[0].id);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        tabs={SIDEBAR_TABS}
        activeTabId={activeTabId}
        onTabClick={setActiveTabId}
        className="bg-black"
      />
      <main className="flex-1 overflow-auto p-6">
        <TabContent tabId={activeTabId} />
      </main>
    </div>
  );
}

export default App;
