import { StyleSheet, ViewStyle } from "react-native";

import UserDimensions from "../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  containerView: ViewStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  containerView: {
    width: "100%",
    height: "50%",
    paddingBottom: UserDimensions.heightMultiplier * 13,
    gap: UserDimensions.heightMultiplier * 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default styles;
