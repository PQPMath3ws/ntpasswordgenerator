import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  containerView: ViewStyle;
  messageText: TextStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    maxWidth: "80%",
    paddingHorizontal: UserDimensions.widthMultiplier * 1.8,
    paddingVertical: UserDimensions.heightMultiplier * 1.2,
    borderRadius: UserDimensions.widthMultiplier * 1.5,
    backgroundColor: "#080808",
    borderColor: "#3E6A3D",
    borderWidth: 2,
  },
  containerView: {
    maxWidth: "95%",
    alignItems: "center",
    flexDirection: "row",
    gap: UserDimensions.widthMultiplier * 2.5,
    overflow: "hidden",
  },
  messageText: {
    maxWidth: "90%",
    fontFamily: "Quantico_700Bold",
    fontSize: UserDimensions.textMultiplier * 3.5,
    color: "#63AD58",
  },
});

export default styles;
