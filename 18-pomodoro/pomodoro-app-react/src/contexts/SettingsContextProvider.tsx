import { useState, type ReactNode } from "react";

import type { Settings } from "./SettingsContext";
import { SettingsContext } from "./SettingsContext";

type SettingsContextProviderProps = {
  children: ReactNode | ReactNode[];
};

const SettingsContextProvider = ({
  children,
}: SettingsContextProviderProps) => {
  const [settings, setSettings] = useState<Settings | null>({
    time: [
      {
        timer: "pomodoro",
        durationInSeconds: 25 * 60,
      },
      {
        timer: "short break",
        durationInSeconds: 5 * 60,
      },
      {
        timer: "long break",
        durationInSeconds: 15 * 60,
      },
    ],
    font: {
      fonts: ["font-1", "font-2", "font-3"],
      selected: "font-1",
    },
    color: {
      colors: ["color-1", "color-2", "color-3"],
      selected: "color-1",
    },
  });
  return (
    <SettingsContext value={[settings, setSettings]}>
      {children}
    </SettingsContext>
  );
};

export default SettingsContextProvider;
