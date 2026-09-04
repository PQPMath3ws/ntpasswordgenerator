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
    backgroundColor: "#9147FF",
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
    color: "#FFFFFF",
  },
  unfocusedText: {
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 4,
    color: "#DEDEDEAA",
  },
});

export default styles;
