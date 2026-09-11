import { ColorValue, DimensionValue, View, ViewStyle } from "react-native";

interface DividerInterface {
  color: ColorValue;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ViewStyle;
  horizontal?: boolean;
}

export default function Divider({
  color,
  width = "100%",
  height = 1,
  style = {},
  horizontal = false,
}: DividerInterface) {
  if (horizontal) {
    return (
      <View
        style={[
          style,
          {
            width: height,
            height: width,
            borderColor: color,
            backgroundColor: color,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        style,
        { width, height, borderColor: color, backgroundColor: color },
      ]}
    />
  );
}
