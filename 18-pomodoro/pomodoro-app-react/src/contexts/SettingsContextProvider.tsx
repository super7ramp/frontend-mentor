import { useState, type ReactNode } from "react";

import type { Settings } from "./SettingsContext";
import { DEFAULT_SETTINGS, SettingsContext } from "./SettingsContext";

type SettingsContextProviderProps = {
  children: ReactNode | ReactNode[];
};

const SettingsContextProvider = ({
  children,
}: SettingsContextProviderProps) => {
  const context = useState<Settings>(DEFAULT_SETTINGS);
  return (
    <SettingsContext value={context}>
      {children}
    </SettingsContext>
  );
};

export default SettingsContextProvider;
