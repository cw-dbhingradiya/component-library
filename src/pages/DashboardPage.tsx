import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Sidebar, type TabId, type SidebarTab } from "@/components/Sidebar";
import { setSessionUser } from "@/lib/utils/auth";
import LivingRoomPage from "./LivingRoomPage";

/**
 * What: Furniture category tabs for the dashboard sidebar.
 * Why: Organises the dashboard around product categories relevant
 *      to the Alder® furniture catalogue.
 */
const DASHBOARD_TABS: SidebarTab[] = [
  { id: "living-room", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining" },
  { id: "office", label: "Office" },
  { id: "outdoor", label: "Outdoor" },
  { id: "lighting", label: "Lighting" },
];

/**
 * What: Fade-slide wrapper that animates tab content on switch.
 * Why: Gives visual continuity when switching between sidebar tabs.
 */
function AnimatedTabContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}

/**
 * What: Full-screen dashboard layout with a persistent left sidebar.
 * Why: Provides a dedicated authenticated area where users can browse
 *      furniture categories and design furniture with AI tools.
 * What for: Rendered at /dashboard — reached from the profile dropdown.
 */
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("living-room");
  const navigate = useNavigate();

  const handleTabClick = useCallback((id: TabId) => {
    setActiveTab(id);
  }, []);

  const handleLogout = useCallback(() => {
    setSessionUser(null);
    navigate("/");
  }, [navigate]);

  const activeLabel =
    DASHBOARD_TABS.find((t) => t.id === activeTab)?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-white">
      {/* Left sidebar */}
      <Sidebar
        tabs={DASHBOARD_TABS}
        activeTabId={activeTab}
        onTabClick={handleTabClick}
        onLogout={handleLogout}
        className="border-r border-gray-200 bg-black"
      />

      {/* Main content area */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-200 bg-white px-8 py-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <h1 className="text-lg font-semibold text-gray-900">
            {activeLabel}
          </h1>
        </header>

        {/* Tab content — Living Room has its own page, others show placeholder */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <AnimatedTabContent key={activeTab}>
            {activeTab === "living-room" ? (
              <LivingRoomPage />
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Coming Soon
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    The{" "}
                    <span className="font-medium text-gray-700">
                      {activeLabel}
                    </span>{" "}
                    collection is on its way.
                  </p>
                </div>
              </div>
            )}
          </AnimatedTabContent>
        </div>
      </main>
    </div>
  );
}
