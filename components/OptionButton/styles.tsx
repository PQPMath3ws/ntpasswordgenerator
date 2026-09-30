import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../constants/dimensions";

interface StylesInterface {
  mainTouchableOpacity: ViewStyle;
  mainDisabledTouchableOpacity: ViewStyle;
  leftView: ViewStyle;
  leftViewText: TextStyle;
  proText: TextStyle;
  rightView: ViewStyle;
  internalContentView: ViewStyle;
  internalContentChildView: ViewStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainTouchableOpacity: {
    width: "100%",
    height: UserDimensions.heightMultiplier * 5,
    flexDirection: "row",
  },
  mainDisabledTouchableOpacity: {
    width: "100%",
    height: UserDimensions.heightMultiplier * 5,
    flexDirection: "row",
    opacity: 0.5,
  },
  leftView: {
    width: "90%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    gap: UserDimensions.widthMultiplier * 3,
    paddingLeft: UserDimensions.widthMultiplier * 4.5,
    paddingRight: UserDimensions.widthMultiplier * 2,
  },
  leftViewText: {
    color: "#FFFFFF",
    fontFamily: "Quantico_400Regular",
    fontSize: UserDimensions.textMultiplier * 3.8,
  },
  proText: {
    color: "#FFFFFF",
    fontFamily: "Quantico_400Regular",
    fontSize: UserDimensions.textMultiplier * 3.8,
  },
  rightView: {
    width: "10%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: UserDimensions.widthMultiplier * 4.5,
  },
  internalContentView: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  internalContentChildView: {
    width: "100%",
    position: "absolute",
    paddingVertical: UserDimensions.heightMultiplier * 2,
  },
});

export default styles;
