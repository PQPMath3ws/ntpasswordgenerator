import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  contentContainerScrollView: ViewStyle;
  generatePasswordTouchableOpacity: ViewStyle;
  generatePasswordTouchableOpacityIcon: TextStyle;
  generatePasswordTouchableOpacityText: TextStyle;
  contentContainerBoxView: ViewStyle;
  contentContainerBoxViewTitleText: TextStyle;
  contentContainerBoxViewContentText: TextStyle;
  contentContainerBoxPasswordSizeView: ViewStyle;
  contentContainerBoxPasswordSizeRequirementViewText: TextStyle;
  contentContainerBoxPasswordSizeViewText: TextStyle;
  rowView: ViewStyle;
  extra0_5HeightGap: ViewStyle;
  contentContainerBoxLeftView: ViewStyle;
  contentContainerBoxRightView: ViewStyle;
  contentContainerBoxRightViewSwitch: ViewStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingTop: UserDimensions.heightMultiplier * 1,
    backgroundColor: "#080808",
  },
  contentContainerScrollView: {
    alignItems: "center",
    gap: UserDimensions.heightMultiplier * 2.5,
  },
  generatePasswordTouchableOpacity: {
    flexDirection: "row",
    width: "90%",
    height: UserDimensions.heightMultiplier * 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#63AD58",
    borderRadius: UserDimensions.heightMultiplier * 2,
    gap: UserDimensions.heightMultiplier * 1,
  },
  generatePasswordTouchableOpacityIcon: {
    fontSize: UserDimensions.heightMultiplier * 2,
    color: "#080808",
  },
  generatePasswordTouchableOpacityText: {
    fontFamily: "Quantico_700Bold",
    fontSize: UserDimensions.textMultiplier * 3.5,
    color: "#080808",
  },
  contentContainerBoxView: {
    width: "90%",
    paddingVertical: UserDimensions.heightMultiplier * 2,
    paddingHorizontal: UserDimensions.widthMultiplier * 5,
    borderColor: "#3E6A3D",
    borderWidth: 2,
    borderRadius: "6%",
    gap: UserDimensions.heightMultiplier * 2,
  },
  contentContainerBoxViewTitleText: {
    fontFamily: "Quantico_700Bold",
    fontSize: UserDimensions.textMultiplier * 4,
    color: "#63AD58",
  },
  contentContainerBoxViewContentText: {
    fontFamily: "Quantico_400Regular",
    fontSize: UserDimensions.textMultiplier * 3,
    color: "#63AD58",
  },
  contentContainerBoxPasswordSizeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainerBoxPasswordSizeRequirementViewText: {
    fontFamily: "Quantico_400Regular",
    fontSize: UserDimensions.textMultiplier * 3.5,
    color: "#63AD58",
  },
  contentContainerBoxPasswordSizeViewText: {
    fontFamily: "Quantico_700Regular",
    fontSize: UserDimensions.textMultiplier * 3.5,
    color: "#63AD58",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  extra0_5HeightGap: {
    gap: UserDimensions.heightMultiplier * 0.5,
  },
  contentContainerBoxLeftView: {
    width: "70%",
  },
  contentContainerBoxRightView: {
    width: "30%",
    paddingRight: UserDimensions.widthMultiplier * 3.5,
  },
  contentContainerBoxRightViewSwitch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.1 }],
  },
});

export default styles;
