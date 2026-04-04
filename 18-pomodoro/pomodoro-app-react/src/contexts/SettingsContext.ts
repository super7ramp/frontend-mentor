import { createContext } from "react";

type TimeSettings = {
  timer: string;
  durationInSeconds: number;
};

type FontSettings = {
  fonts: string[];
  selected: string;
};

type ColorSettings = {
  colors: string[];
  selected: string;
};

export type Settings = {
  time: TimeSettings[];
  font: FontSettings;
  color: ColorSettings;
};

type SettingsContextT = [Settings, (settings: Settings) => void];

export const DEFAULT_SETTINGS = {
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
    fonts: ["sans", "serif", "mono"],
    selected: "sans",
  },
  color: {
    colors: ["red", "cyan", "purple"],
    selected: "red",
  },
};

export const SettingsContext = createContext<SettingsContextT>([
  DEFAULT_SETTINGS,
  () => {},
]);
