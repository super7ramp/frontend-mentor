import { useState, type ReactNode } from "react";
import { TabsContext } from "./TabsContext";

type TabsContextProviderProps = {
  children: ReactNode | ReactNode[];
};

const TabsContextProvider = ({ children }: TabsContextProviderProps) => {
  const tabsState = useState("pomodoro");
  return <TabsContext value={tabsState}>{children}</TabsContext>;
};

export default TabsContextProvider;
