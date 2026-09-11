import { StyleSheet, ViewStyle } from "react-native";

interface StylesInterface {
  mainView: ViewStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  mainView: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#080808",
  },
});

export default styles;
