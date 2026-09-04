import { getLocales, Locale } from "expo-localization";
import { PropsWithChildren, useEffect, useState } from "react";

import DataKeys from "../constants/data_keys";
import { SettingsContext } from "../contexts/useSettings";
import StoreLocalSecureData from "../services/storeLocalSecureData";
import { AvailableLanguagesCodes, languages } from "../types/language";
import SettingsValuesInterface from "../types/settings";

export default function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<SettingsValuesInterface | undefined>(
    undefined,
  );

  async function loadSettings() {
    const userHasTheFullVersion: string =
      await StoreLocalSecureData.getSecureData(DataKeys.has_full_version, "0");
    const userHasRatedTheApp: string = await StoreLocalSecureData.getSecureData(
      DataKeys.has_rated_the_app,
      "0",
    );
    const deviceLocale: Locale[] = getLocales();
    const availableLanguages: string[] = Object.keys(languages);
    const userLanguageCode: string = await StoreLocalSecureData.getSecureData(
      DataKeys.language_code,
      deviceLocale[0].languageCode &&
        availableLanguages.includes(deviceLocale[0].languageCode)
        ? deviceLocale[0].languageCode
        : "en",
    );
    const newSettings: SettingsValuesInterface = {
      has_full_version: Number(userHasTheFullVersion) as 0 | 1,
      has_rated_the_app: Number(userHasRatedTheApp) as 0 | 1,
      language_code: userLanguageCode as AvailableLanguagesCodes,
    };
    setSettings(newSettings);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{ refreshSettings: loadSettings, settings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
