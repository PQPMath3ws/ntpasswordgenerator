import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  containerView: ViewStyle;
  headerView: ViewStyle;
  titleView: ViewStyle;
  titleText: TextStyle;
  messageText: TextStyle;
  actionsView: ViewStyle;
  actionTouchableOpacity: ViewStyle;
  actionTouchableOpacityText: TextStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000009F",
    zIndex: 10,
  },
  containerView: {
    position: "relative",
    width: "85%",
    backgroundColor: "#5A61CF",
    borderRadius: UserDimensions.widthMultiplier * 4,
    padding: UserDimensions.widthMultiplier * 6,
    alignItems: "center",
    gap: UserDimensions.heightMultiplier * 2.5,
  },
  headerView: {
    position: "absolute",
    width: UserDimensions.widthMultiplier * 18,
    height: UserDimensions.widthMultiplier * 18,
    borderRadius: UserDimensions.widthMultiplier * 10,
    marginTop: -UserDimensions.widthMultiplier * 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleView: {
    marginTop: UserDimensions.widthMultiplier * 7,
  },
  titleText: {
    color: "#DFDFDF",
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 4.8,
    textAlign: "center",
  },
  messageText: {
    color: "#DFDFDF",
    fontFamily: "Quantico_400Regular",
    fontSize: UserDimensions.textMultiplier * 4.2,
    textAlign: "center",
  },
  actionsView: {
    width: "100%",
    marginTop: 6,
    gap: UserDimensions.heightMultiplier * 2.5,
  },
  actionTouchableOpacity: {
    width: "100%",
    height: UserDimensions.heightMultiplier * 5,
    borderRadius: UserDimensions.heightMultiplier * 2,
    justifyContent: "center",
  },
  actionTouchableOpacityText: {
    fontFamily: "Quantico_400Regular",
    fontSize: UserDimensions.textMultiplier * 4.8,
    textAlign: "center",
  },
});

export default styles;
