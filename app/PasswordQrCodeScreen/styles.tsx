import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  containerScrollView: ViewStyle;
  contentContainerScrollView: ViewStyle;
  fullWidthView: ViewStyle;
  headerView: ViewStyle;
  qrCodePasswordInfoView: ViewStyle;
  qrCodePasswordInfoViewTextsView: ViewStyle;
  qrCodePasswordInfoViewWithoutEncryption: ViewStyle;
  qrCodePasswordInfoViewWithEncryption: ViewStyle;
  qrCodePasswordInfoViewTitleText: TextStyle;
  qrCodePasswordInfoViewMessageText: TextStyle;
  qrCodePasswordInfoViewTextWithoutEncryption: TextStyle;
  qrCodePasswordInfoViewTextWithEncryption: TextStyle;
  encryptPasswordInfoView: ViewStyle;
  encryptPasswordInfoViewTextsView: ViewStyle;
  encryptPasswordInfoViewTitleText: TextStyle;
  encryptPasswordInfoViewMessageText: TextStyle;
  encryptPasswordInfoViewSwitch: ViewStyle;
  passwordHashKeyInfoView: ViewStyle;
  flexDirectionRowView: ViewStyle;
  passwordHashKeyInfoViewHeaderView: ViewStyle;
  passwordHashKeyInfoViewHeaderViewText: TextStyle;
  passwordHashKeyInfoViewContentViewText: TextStyle;
  copyHashKeyTouchableOpacity: ViewStyle;
  copyHashKeyTouchableOpacityText: TextStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingTop: UserDimensions.heightMultiplier * 1,
    backgroundColor: "#080808",
    alignItems: "center",
  },
  containerScrollView: {
    width: "90%",
  },
  contentContainerScrollView: {
    alignItems: "center",
    gap: UserDimensions.heightMultiplier * 3,
    paddingBottom: UserDimensions.heightMultiplier * 3,
  },
  fullWidthView: {
    width: "100%",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qrCodePasswordInfoView: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    gap: UserDimensions.widthMultiplier * 3,
    borderWidth: 1,
    borderRadius: UserDimensions.widthMultiplier * 2,
    paddingVertical: UserDimensions.heightMultiplier * 1.5,
    paddingHorizontal: UserDimensions.widthMultiplier * 3.5,
  },
  qrCodePasswordInfoViewTextsView: {
    flex: 1,
  },
  qrCodePasswordInfoViewWithoutEncryption: {
    borderColor: "#CE2929",
  },
  qrCodePasswordInfoViewWithEncryption: {
    borderColor: "#63AD58",
  },
  qrCodePasswordInfoViewTitleText: {
    fontSize: UserDimensions.textMultiplier * 4.1,
    fontFamily: "Quantico_700Bold",
  },
  qrCodePasswordInfoViewMessageText: {
    fontSize: UserDimensions.textMultiplier * 3.9,
    fontFamily: "Quantico_400Regular",
  },
  qrCodePasswordInfoViewTextWithoutEncryption: {
    color: "#CE2929",
  },
  qrCodePasswordInfoViewTextWithEncryption: {
    color: "#63AD58",
  },
  encryptPasswordInfoView: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    gap: UserDimensions.widthMultiplier * 3,
    borderWidth: 1,
    borderRadius: UserDimensions.widthMultiplier * 2,
    paddingVertical: UserDimensions.heightMultiplier * 1.5,
    paddingHorizontal: UserDimensions.widthMultiplier * 3.5,
    borderColor: "#5A61CF",
  },
  encryptPasswordInfoViewTextsView: {
    flex: 1,
  },
  encryptPasswordInfoViewTitleText: {
    fontSize: UserDimensions.textMultiplier * 4.1,
    fontFamily: "Quantico_700Bold",
    color: "#5A61CF",
  },
  encryptPasswordInfoViewMessageText: {
    fontSize: UserDimensions.textMultiplier * 3.9,
    fontFamily: "Quantico_400Regular",
    color: "#5A61CF",
  },
  encryptPasswordInfoViewSwitch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.1 }],
  },
  passwordHashKeyInfoView: {
    width: "90%",
    gap: UserDimensions.widthMultiplier * 3,
    borderWidth: 1,
    borderRadius: UserDimensions.widthMultiplier * 2,
    paddingVertical: UserDimensions.heightMultiplier * 1.5,
    paddingHorizontal: UserDimensions.widthMultiplier * 3.5,
    borderColor: "#63AD58",
  },
  flexDirectionRowView: {
    flexDirection: "row",
  },
  passwordHashKeyInfoViewHeaderView: {
    gap: UserDimensions.widthMultiplier * 3,
  },
  passwordHashKeyInfoViewHeaderViewText: {
    fontSize: UserDimensions.textMultiplier * 4.1,
    fontFamily: "Quantico_700Bold",
    color: "#63AD58",
  },
  passwordHashKeyInfoViewContentViewText: {
    fontSize: UserDimensions.textMultiplier * 3.9,
    fontFamily: "Quantico_400Regular",
    color: "#63AD58",
  },
  copyHashKeyTouchableOpacity: {
    flexDirection: "row",
    backgroundColor: "#63AD58",
    padding: UserDimensions.widthMultiplier * 2,
    borderRadius: UserDimensions.widthMultiplier * 2,
    justifyContent: "center",
    alignItems: "center",
    gap: UserDimensions.widthMultiplier * 2,
  },
  copyHashKeyTouchableOpacityText: {
    color: "#080808",
    fontSize: UserDimensions.textMultiplier * 4.1,
    fontFamily: "Quantico_700Bold",
  },
});

export default styles;
