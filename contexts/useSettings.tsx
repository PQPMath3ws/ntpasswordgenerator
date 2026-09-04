import { createContext, useContext } from "react";

import SettingsValuesInterface from "../types/settings";

interface SettingsInterface {
  refreshSettings: () => Promise<void>;
  settings: SettingsValuesInterface | undefined;
}

export const SettingsContext = createContext<SettingsInterface>(
  {} as SettingsInterface,
);

export const useSettings = () => useContext<SettingsInterface>(SettingsContext);
