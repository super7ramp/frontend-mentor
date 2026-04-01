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

type SettingsContextT = [Settings | null, (settings: Settings | null) => void];

export const SettingsContext = createContext<SettingsContextT>([
  null,
  () => {},
]);
