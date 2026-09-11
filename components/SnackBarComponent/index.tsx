import { cloneElement, JSX, useEffect, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";

import UserDimensions from "../../constants/dimensions";
import IconsType from "../../types/icons";
import SnackBarComponentInterface from "../../types/snackbar";
import styles from "./styles";

interface SnackBarComponentWithCallbackInterface extends SnackBarComponentInterface {
  callback: (() => void) | (() => Promise<void>);
}

export default function SnackBarComponent({
  icon,
  message,
  callback,
}: SnackBarComponentWithCallbackInterface) {
  const [mainViewOpacityAnimationValue] = useState(() => new Animated.Value(0));

  const iconClone: JSX.Element = cloneElement<IconsType>(icon, {
    color: "#63AD58",
    size: UserDimensions.imageMultiplier * 5,
  });

  const mainViewOpacityAnimationInterpolate: Animated.AnimatedInterpolation<
    string | number
  > = mainViewOpacityAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  function animateSnackBarComponent() {
    Animated.timing(mainViewOpacityAnimationValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(mainViewOpacityAnimationValue, {
        toValue: 0,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        callback();
      }, 400);
    }, 2000);
  }

  useEffect(() => {
    animateSnackBarComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        styles.mainView,
        { opacity: mainViewOpacityAnimationInterpolate },
      ]}
    >
      <View style={styles.containerView}>
        {iconClone}
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </Animated.View>
  );
}
