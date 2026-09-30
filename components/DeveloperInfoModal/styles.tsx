import { ImageStyle } from "expo-image";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  pressableView: ViewStyle;
  containerView: ViewStyle;
  containerAnimatedView: ViewStyle;
  headerView: ViewStyle;
  headerViewText: TextStyle;
  contentView: ViewStyle;
  contentCenterView: ViewStyle;
  logoImage: ImageStyle;
  socialMediaText: TextStyle;
  optionTouchableOpacity: ViewStyle;
  optionTouchableOpacityText: TextStyle;
  actionTouchableOpacity: ViewStyle;
  actionTouchableOpacityText: TextStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  pressableView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000000AF",
  },
  containerView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerAnimatedView: {
    width: "85%",
    backgroundColor: "#303030",
    borderRadius: UserDimensions.widthMultiplier * 4,
    paddingBottom: UserDimensions.widthMultiplier * 6,
    alignItems: "center",
    gap: UserDimensions.heightMultiplier * 3,
    zIndex: 10,
  },
  headerView: {
    width: "100%",
    backgroundColor: "#63AD58",
    borderTopLeftRadius: UserDimensions.widthMultiplier * 4,
    borderTopRightRadius: UserDimensions.widthMultiplier * 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: UserDimensions.widthMultiplier * 2.5,
    padding: UserDimensions.widthMultiplier * 3,
  },
  headerViewText: {
    color: "#DFDFDF",
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 4.8,
  },
  contentView: {
    width: "90%",
    gap: UserDimensions.heightMultiplier * 1.5,
  },
  contentCenterView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: UserDimensions.heightMultiplier * 2,
    marginBottom: UserDimensions.heightMultiplier * 2,
  },
  logoImage: {
    width: UserDimensions.imageMultiplier * 50,
    height: UserDimensions.imageMultiplier * 50,
  },
  socialMediaText: {
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 4.8,
    textAlign: "center",
    color: "#63AD58",
    marginBottom: UserDimensions.heightMultiplier * 2,
  },
  optionTouchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    gap: UserDimensions.widthMultiplier * 3,
    padding: UserDimensions.widthMultiplier * 3,
  },
  optionTouchableOpacityText: {
    color: "#DFDFDF",
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 4,
  },
  actionTouchableOpacity: {
    width: "100%",
    height: UserDimensions.heightMultiplier * 5,
    borderRadius: UserDimensions.heightMultiplier * 2,
    justifyContent: "center",
    backgroundColor: "#63AD58",
  },
  actionTouchableOpacityText: {
    fontFamily: "BagelFatOne_400Regular",
    fontSize: UserDimensions.textMultiplier * 4.8,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default styles;
