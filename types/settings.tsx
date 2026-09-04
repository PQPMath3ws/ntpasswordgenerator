import { AvailableLanguagesCodes } from "./language";

export default interface SettingsValuesInterface {
  language_code: AvailableLanguagesCodes;
  has_full_version: 0 | 1;
  has_rated_the_app: 0 | 1;
}
