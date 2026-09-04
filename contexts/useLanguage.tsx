import { createContext, useContext } from "react";

import LanguageDictionaryInterface, {
  AvailableLanguagesCodes,
} from "../types/language";

interface LanguageContextInterface {
  changeLanguage: (code: AvailableLanguagesCodes) => Promise<void>;
  textsList: LanguageDictionaryInterface;
}

export const LanguageContext = createContext<LanguageContextInterface>(
  {} as LanguageContextInterface,
);

export const useLanguage = () =>
  useContext<LanguageContextInterface>(LanguageContext);
