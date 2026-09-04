import { PropsWithChildren, useEffect, useState } from "react";

import DataKeys from "../constants/data_keys";
import { EnglishTextsList } from "../constants/languages";
import { LanguageContext } from "../contexts/useLanguage";
import { useSettings } from "../contexts/useSettings";
import StoreLocalSecureData from "../services/storeLocalSecureData";
import LanguageDictionaryInterface, {
  AvailableLanguagesCodes,
  languages,
} from "../types/language";

export default function LanguageProvider({ children }: PropsWithChildren) {
  const { refreshSettings, settings } = useSettings();

  const [textsList, setTextsList] = useState<LanguageDictionaryInterface>({});

  async function changeLanguage(code: AvailableLanguagesCodes) {
    if (languages[code]) {
      await StoreLocalSecureData.setSecureData(DataKeys.language_code, code);
      setTextsList(languages[code]);
      await refreshSettings();
    }
  }

  function detectLanguageAndLoadTexts(): void {
    if (settings) {
      setTextsList(languages[settings.language_code]);
      return;
    }

    setTextsList(EnglishTextsList);
  }

  useEffect(() => {
    if (settings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      detectLanguageAndLoadTexts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <LanguageContext.Provider value={{ changeLanguage, textsList }}>
      {children}
    </LanguageContext.Provider>
  );
}
