import { AvailableLanguagesCodes } from "./language";

export default interface SettingsValuesInterface {
  has_full_version: 0 | 1;
  has_rated_the_app: 0 | 1;
  has_temp_full_version?: 1;
  language_code: AvailableLanguagesCodes;
  last_datetime_temp_pro_features: string;
}
