import { ColorValue } from "react-native";

import IconsType from "./icons";

export default interface DialogPopupInterface {
  headerIcon?: IconsType;
  title: string;
  message: string;
  actionButtonColor: ColorValue;
  actionButtonText: string;
  actionButtonTextColor: ColorValue;
  actionButtonOnPress: (() => void) | (() => Promise<void>);
  userCanCloseModal?: boolean;
  userCloseModalButtonColor?: ColorValue;
  userCloseModalButtonText?: string;
  userCloseModalButtonTextColor?: ColorValue;
  onCloseModal?: (() => void) | (() => Promise<void>);
}
