import { getLocales, Locale } from "expo-localization";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

import DataKeys from "../constants/data_keys";
import { SettingsContext } from "../contexts/useSettings";
import StoreLocalSecureData from "../services/storeLocalSecureData";
import { AvailableLanguagesCodes, languages } from "../types/language";
import SettingsValuesInterface from "../types/settings";

export default function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<SettingsValuesInterface | undefined>(
    undefined,
  );

  const timeoutFunctionToCall = useRef<number>(0);

  async function checkUserHasTempPro() {
    const lastDatetimeTempProFeatures: string | undefined =
      await StoreLocalSecureData.getSecureData(
        DataKeys.last_datetime_temp_pro_features,
        "",
      );
    if (lastDatetimeTempProFeatures) {
      const now: Date = new Date();
      const diff = Number(lastDatetimeTempProFeatures) - now.getTime();
      if (diff >= 0) {
        StoreLocalSecureData.setSecureData(DataKeys.has_temp_full_version, "1");
        setSettings((prev) => ({
          ...prev!,
          has_temp_full_version: 1,
          last_datetime_temp_pro_features: lastDatetimeTempProFeatures,
        }));
      } else {
        StoreLocalSecureData.setSecureData(DataKeys.has_temp_full_version, "");
        StoreLocalSecureData.setSecureData(
          DataKeys.last_datetime_temp_pro_features,
          "",
        );
        setSettings((prev) => ({
          ...prev!,
          last_datetime_temp_pro_features: "",
          has_temp_full_version: undefined,
        }));
      }
    } else {
      StoreLocalSecureData.setSecureData(DataKeys.has_temp_full_version, "");
      StoreLocalSecureData.setSecureData(
        DataKeys.last_datetime_temp_pro_features,
        "",
      );
      setSettings((prev) => ({
        ...prev!,
        last_datetime_temp_pro_features: "",
        has_temp_full_version: undefined,
      }));
    }
    if (timeoutFunctionToCall.current) {
      clearTimeout(timeoutFunctionToCall.current);
    }
    timeoutFunctionToCall.current = setTimeout(() => {
      checkUserHasTempPro();
    }, 30000);
  }

  async function loadSettings() {
    const lastDatetimeTempProFeatures: string | undefined =
      await StoreLocalSecureData.getSecureData(
        DataKeys.last_datetime_temp_pro_features,
        "",
      );
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
    const hasTempFullVersion = await StoreLocalSecureData.getSecureData(
      DataKeys.has_temp_full_version,
      "",
    );
    const newSettings: SettingsValuesInterface = {
      last_datetime_temp_pro_features: lastDatetimeTempProFeatures,
      has_full_version: Number(userHasTheFullVersion) as 0 | 1,
      has_rated_the_app: Number(userHasRatedTheApp) as 0 | 1,
      language_code: userLanguageCode as AvailableLanguagesCodes,
      has_temp_full_version: hasTempFullVersion
        ? (Number(hasTempFullVersion) as 1)
        : undefined,
    };
    setSettings(newSettings);
    checkUserHasTempPro();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SettingsContext.Provider
      value={{ refreshSettings: loadSettings, settings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
