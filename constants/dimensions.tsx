import { Dimensions, PixelRatio } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const deviceProportion = deviceHeight / deviceWidth;
const deviceProportionScale = 1.9 / deviceProportion;
const deviceFontScale = PixelRatio.getFontScale();
const deviceScaleFactor =
  (0.9 / Math.sqrt(deviceFontScale)) * deviceProportionScale;

class UserDimensions {
  public static heightMultiplier: number = deviceHeight / 100;
  public static imageMultiplier = deviceScaleFactor * 5.5;
  public static textMultiplier: number =
    (deviceWidth / 100) * deviceScaleFactor;
  public static widthMultiplier: number = deviceWidth / 100;
}

export default UserDimensions;
