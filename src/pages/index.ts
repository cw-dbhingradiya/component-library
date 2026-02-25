import type { ComponentType } from "react";
import ButtonPage from "./ButtonPage";
import BadgePage from "./BadgePage";

export interface TabPageEntry {
  title: string;
  component: ComponentType;
}

/**
 * Central registry for sidebar tabs.
 * Each key becomes the tab id, title is used as the sidebar label,
 * and component is the page rendered when the tab is active.
 * To add a new component tab, just add an entry here and create its page file.
 */
export const TAB_CONTENT_MAP: Record<string, TabPageEntry> = {
  button: { title: "Button", component: ButtonPage },
  badge: { title: "Badge", component: BadgePage },
};
