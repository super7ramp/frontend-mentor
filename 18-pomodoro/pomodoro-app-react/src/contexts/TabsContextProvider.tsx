import { useState, type ReactNode } from "react";
import { DEFAULT_TAB, TabsContext } from "./TabsContext";

type TabsContextProviderProps = {
  children: ReactNode | ReactNode[];
};

const TabsContextProvider = ({ children }: TabsContextProviderProps) => {
  const tabsState = useState(DEFAULT_TAB);
  return <TabsContext value={tabsState}>{children}</TabsContext>;
};

export default TabsContextProvider;
