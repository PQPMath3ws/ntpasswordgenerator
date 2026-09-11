import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  passwordGeneratedText: TextStyle;
  infosView: ViewStyle;
  infosLeftView: ViewStyle;
  infosRightView: ViewStyle;
  passwordText: TextStyle;
  qrCodeTouchableOpacity: ViewStyle;
  qrCodeTouchableOpacityIcon: TextStyle;
  copyTouchableOpacity: ViewStyle;
  copyTouchableOpacityIcon: TextStyle;
  dividerView: ViewStyle;
  passwordStatusView: ViewStyle;
  insecurePasswordViewText: TextStyle;
  partialSecurePasswordViewText: TextStyle;
  securePasswordViewText: TextStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    width: "90%",
    paddingVertical: UserDimensions.heightMultiplier * 2,
    paddingHorizontal: UserDimensions.widthMultiplier * 5,
    borderColor: "#3E6A3D",
    borderWidth: 2,
    borderRadius: "6%",
    gap: UserDimensions.heightMultiplier * 1.3,
  },
  passwordGeneratedText: {
    fontFamily: "Quantico_700Bold",
    fontSize: UserDimensions.textMultiplier * 4,
    color: "#63AD58",
  },
  infosView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infosLeftView: {
    width: "65%",
  },
  infosRightView: {
    width: "35%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: UserDimensions.heightMultiplier * 1.5,
  },
  passwordText: {
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 5.5,
    color: "#FFFFFF",
  },
  qrCodeTouchableOpacity: {
    width: UserDimensions.widthMultiplier * 7.5,
    height: UserDimensions.widthMultiplier * 7.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20%",
    backgroundColor: "#5A61CF",
  },
  qrCodeTouchableOpacityIcon: {
    fontSize: UserDimensions.widthMultiplier * 3.75,
    color: "#FFFFFF",
  },
  copyTouchableOpacity: {
    width: UserDimensions.widthMultiplier * 7.5,
    height: UserDimensions.widthMultiplier * 7.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20%",
    backgroundColor: "#61CF5A",
  },
  copyTouchableOpacityIcon: {
    fontSize: UserDimensions.widthMultiplier * 3.75,
    color: "#080808",
  },
  dividerView: {
    marginTop: UserDimensions.heightMultiplier * 1,
  },
  passwordStatusView: {
    marginTop: UserDimensions.heightMultiplier * 1,
  },
  insecurePasswordViewText: {
    paddingVertical: UserDimensions.heightMultiplier * 0.7,
    paddingHorizontal: UserDimensions.widthMultiplier * 2,
    borderRadius: UserDimensions.heightMultiplier * 1,
    textAlign: "center",
    fontFamily: "Quantico_700Bold",
    fontSize: UserDimensions.textMultiplier * 3,
    backgroundColor: "#CE2929",
    color: "#FAEAEA",
  },
  partialSecurePasswordViewText: {
    paddingVertical: UserDimensions.heightMultiplier * 0.7,
    paddingHorizontal: UserDimensions.widthMultiplier * 2,
    borderRadius: UserDimensions.heightMultiplier * 1,
    textAlign: "center",
    fontFamily: "Quantico_700Bold",
    fontSize: UserDimensions.textMultiplier * 3,
    backgroundColor: "#F29E00",
    color: "#FCF6E1",
  },
  securePasswordViewText: {
    paddingVertical: UserDimensions.heightMultiplier * 0.7,
    paddingHorizontal: UserDimensions.widthMultiplier * 2,
    borderRadius: UserDimensions.heightMultiplier * 1,
    textAlign: "center",
    fontFamily: "Quantico_700Bold",
    fontSize: UserDimensions.textMultiplier * 3,
    backgroundColor: "#14AE5C",
    color: "#E7F7EF",
  },
});

export default styles;
