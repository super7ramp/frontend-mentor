import { useState, type ReactNode } from "react";

import type { Settings } from "./SettingsContext";
import { DEFAULT_SETTINGS, SettingsContext } from "./SettingsContext";

type SettingsContextProviderProps = {
  children: ReactNode | ReactNode[];
};

const SettingsContextProvider = ({
  children,
}: SettingsContextProviderProps) => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  return (
    <SettingsContext value={[settings, setSettings]}>
      {children}
    </SettingsContext>
  );
};

export default SettingsContextProvider;
