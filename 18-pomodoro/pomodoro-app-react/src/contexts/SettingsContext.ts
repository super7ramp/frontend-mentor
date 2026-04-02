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
    fonts: ["font-1", "font-2", "font-3"],
    selected: "font-1",
  },
  color: {
    colors: ["color-1", "color-2", "color-3"],
    selected: "color-1",
  },
};

export const SettingsContext = createContext<SettingsContextT>([
  DEFAULT_SETTINGS,
  () => {},
]);
