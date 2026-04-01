import { useContext } from "react";
import { TabsContext } from "../contexts/TabsContext";

const useTabs = () => {
  return useContext(TabsContext);
};

export default useTabs;
