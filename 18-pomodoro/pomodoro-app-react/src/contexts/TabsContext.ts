import { createContext } from "react";

type TabsContextT = [string, (selectedTab: string) => void];

export const DEFAULT_TAB = "pomodoro";

export const TabsContext = createContext<TabsContextT>([DEFAULT_TAB, () => {}]);
