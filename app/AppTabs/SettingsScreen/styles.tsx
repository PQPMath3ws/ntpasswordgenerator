import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  containerScrollView: ViewStyle;
  containerContentScrollView: ViewStyle;
  categoryText: TextStyle;
  optionsView: ViewStyle;
  changeLanguageView: ViewStyle;
  changeLanguagePickerView: ViewStyle;
  changeLanguagePickerItem: TextStyle;
  changeLanguageTouchableOpacity: ViewStyle;
  changeLanguageTouchableOpacityText: TextStyle;
  appVersionText: TextStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    position: "relative",
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#080808",
    paddingTop: UserDimensions.heightMultiplier * 1,
    gap: UserDimensions.heightMultiplier * 2,
    paddingBottom: UserDimensions.heightMultiplier * 1,
  },
  containerScrollView: {
    width: "95%",
    height: "100%",
  },
  containerContentScrollView: {
    gap: UserDimensions.heightMultiplier * 2.5,
  },
  categoryText: {
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 4,
    color: "#63AD58",
  },
  optionsView: {
    gap: UserDimensions.heightMultiplier * 2.5,
  },
  changeLanguageView: {
    width: "100%",
    alignItems: "center",
    gap: UserDimensions.heightMultiplier * 2,
  },
  changeLanguagePickerView: {
    width: "50%",
    borderColor: "#3E6A3D",
    borderRadius: UserDimensions.heightMultiplier * 1.5,
    borderWidth: 2,
  },
  changeLanguagePickerItem: {
    fontFamily: "Quantico_400Regular",
    fontSize: UserDimensions.textMultiplier * 3.5,
    color: "#FFFFFF",
  },
  changeLanguageTouchableOpacity: {
    width: "60%",
    height: UserDimensions.heightMultiplier * 5,
    borderRadius: UserDimensions.heightMultiplier * 2,
    backgroundColor: "#3E6A3D",
    justifyContent: "center",
  },
  changeLanguageTouchableOpacityText: {
    color: "#FFFFFF",
    fontFamily: "Quantico_400Regular",
    fontSize: UserDimensions.textMultiplier * 4.5,
    textAlign: "center",
  },
  appVersionText: {
    color: "#63AD58",
    fontFamily: "Quantico_400Regular",
    fontSize: UserDimensions.textMultiplier * 3.5,
    marginLeft: UserDimensions.widthMultiplier * 4.5,
  },
});

export default styles;
