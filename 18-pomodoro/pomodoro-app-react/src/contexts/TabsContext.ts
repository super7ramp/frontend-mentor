import { createContext } from "react";

type TabsContextT = [string, (selectedTab: string) => void];

export const TabsContext = createContext<TabsContextT>(["pomodoro", () => {}]);
