import { cloneElement, JSX, useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  ColorValue,
  Easing,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import UserDimensions from "../../constants/dimensions";
import IconsType from "../../types/icons";
import styles from "./styles";

interface DialogPopupInterface {
  visible: boolean;
  headerColor: ColorValue;
  headerIcon: IconsType;
  title: string;
  message: string;
  actionButtonColor: ColorValue;
  actionButtonText: string;
  actionButtonTextColor: ColorValue;
  actionButtonOnPress: () => void;
  userCanCloseModal?: boolean;
  userCloseModalButtonColor?: ColorValue;
  userCloseModalButtonText?: string;
  userCloseModalButtonTextColor?: ColorValue;
  onCloseModal?: () => void;
}

export default function DialogPopup({
  visible,
  headerColor,
  headerIcon,
  title,
  message,
  actionButtonColor,
  actionButtonText,
  actionButtonTextColor,
  actionButtonOnPress,
  userCanCloseModal,
  userCloseModalButtonColor,
  userCloseModalButtonText,
  userCloseModalButtonTextColor,
  onCloseModal,
}: DialogPopupInterface) {
  const [mainViewOpacityAnimationValue] = useState(() => new Animated.Value(0));
  const [internalViewScaleAnimationValue] = useState(
    () => new Animated.Value(0),
  );

  const canInteractWithModal = useRef<boolean>(false);

  const mainViewOpacityAnimationInterpolate: Animated.AnimatedInterpolation<
    string | number
  > = mainViewOpacityAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const internalViewScaleAnimationInterpolate: Animated.AnimatedInterpolation<
    string | number
  > = internalViewScaleAnimationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 1.2],
  });

  const headerIconClone: JSX.Element = cloneElement<IconsType>(headerIcon, {
    size: UserDimensions.imageMultiplier * 12,
  });

  const timeoutAnimation: number = 500;

  function animateDialogPopup(isReverse: boolean): void {
    canInteractWithModal.current = false;
    const animation: Animated.CompositeAnimation[] = isReverse
      ? [
          Animated.timing(internalViewScaleAnimationValue, {
            toValue: 1,
            duration: timeoutAnimation / 3,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(internalViewScaleAnimationValue, {
            toValue: 0,
            duration: timeoutAnimation / 3,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(mainViewOpacityAnimationValue, {
            toValue: 0,
            duration: timeoutAnimation / 3,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]
      : [
          Animated.timing(mainViewOpacityAnimationValue, {
            toValue: 1,
            duration: timeoutAnimation / 3,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(internalViewScaleAnimationValue, {
            toValue: 1,
            duration: timeoutAnimation / 3,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(internalViewScaleAnimationValue, {
            toValue: 0.5,
            duration: timeoutAnimation / 3,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ];
    Animated.sequence(animation).start();
    if (!isReverse) {
      setTimeout(() => {
        canInteractWithModal.current = true;
      }, timeoutAnimation);
    }
  }

  useEffect(() => {
    if (visible) {
      animateDialogPopup(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const backHandlerSub = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          animateDialogPopup(true);
          setTimeout(() => {
            onCloseModal?.();
          }, timeoutAnimation);
          return true;
        },
      );

      return () => {
        backHandlerSub.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.mainView,
        { opacity: mainViewOpacityAnimationInterpolate },
      ]}
    >
      <Animated.View
        style={[
          styles.containerView,
          { transform: [{ scale: internalViewScaleAnimationInterpolate }] },
        ]}
      >
        <View style={[styles.headerView, { backgroundColor: headerColor }]}>
          {headerIconClone}
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        <View style={styles.actionsView}>
          <TouchableOpacity
            style={[
              styles.actionTouchableOpacity,
              { backgroundColor: actionButtonColor },
            ]}
            onPress={() => {
              if (canInteractWithModal.current) {
                animateDialogPopup(true);
                setTimeout(() => {
                  actionButtonOnPress();
                }, timeoutAnimation);
              }
            }}
          >
            <Text
              style={[
                styles.actionTouchableOpacityText,
                { color: actionButtonTextColor },
              ]}
            >
              {actionButtonText}
            </Text>
          </TouchableOpacity>
          {userCanCloseModal && (
            <TouchableOpacity
              style={[
                styles.actionTouchableOpacity,
                {
                  backgroundColor: userCloseModalButtonColor
                    ? userCloseModalButtonColor
                    : headerColor,
                },
              ]}
              onPress={() => {
                if (canInteractWithModal.current) {
                  animateDialogPopup(true);
                  setTimeout(() => {
                    onCloseModal?.();
                  }, timeoutAnimation);
                }
              }}
            >
              <Text
                style={[
                  styles.actionTouchableOpacityText,
                  {
                    color: userCloseModalButtonTextColor
                      ? userCloseModalButtonTextColor
                      : headerIconClone.props.color,
                  },
                ]}
              >
                {userCloseModalButtonText ? userCloseModalButtonText : "Fechar"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
}
