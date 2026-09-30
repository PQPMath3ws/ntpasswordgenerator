import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import UserDimensions from "../../constants/dimensions";

interface StylesInterface {
  mainView: ViewStyle;
  mainContainer: ViewStyle;
  mainContainerLeftView: ViewStyle;
  contentText: TextStyle;
  mainContainerRightView: ViewStyle;
  dropdownScrollView: ViewStyle;
  dropdownItemTouchableOpacity: ViewStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    minWidth: "auto",
    maxWidth: "90%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 3,
  },
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    gap: UserDimensions.widthMultiplier * 1.5,
  },
  mainContainerLeftView: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    gap: UserDimensions.widthMultiplier * 1.5,
  },
  contentText: {
    fontSize: UserDimensions.textMultiplier * 3,
    color: "#DEDAD6",
  },
  mainContainerRightView: {
    width: "15%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dropdownScrollView: {
    position: "absolute",
    backgroundColor: "#303030",
  },
  dropdownItemTouchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    gap: UserDimensions.widthMultiplier * 1.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default styles;
