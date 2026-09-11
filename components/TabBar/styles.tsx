import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  routePlatformPressable: ViewStyle;
  focusedText: TextStyle;
  unfocusedText: TextStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    width: "100%",
    height: UserDimensions.heightMultiplier * 10,
    flexDirection: "row",
    backgroundColor: "#080808",
    borderTopColor: "#3E6A3D",
    borderTopWidth: 2,
  },
  routePlatformPressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: UserDimensions.heightMultiplier * 1,
  },
  focusedText: {
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 4,
    color: "#14AE5C",
  },
  unfocusedText: {
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 4,
    color: "#63AD5888",
  },
});

export default styles;
