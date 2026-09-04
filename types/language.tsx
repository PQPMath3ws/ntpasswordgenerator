import {
  EnglishTextsList,
  PortugueseTextsList,
  SpanishTextsList,
} from "../constants/languages";

export type AvailableLanguagesCodes = "en" | "es" | "pt";

export default interface LanguageDictionaryInterface {
  [key: string]: string;
}

export const languages: { [key: string]: LanguageDictionaryInterface } = {
  en: EnglishTextsList,
  es: SpanishTextsList,
  pt: PortugueseTextsList,
};
