import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { openURL } from "expo-linking";
import { ActionDispatch, useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Easing,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import UserDimensions from "../../constants/dimensions";
import { useLanguage } from "../../contexts/useLanguage";
import styles from "./styles";

const nerdtechWithoutBg = require("../../assets/images/nerdtech_without_bg.png");

interface DeveloperInfoModalInterface {
  visible: boolean;
  dismiss: ActionDispatch<[]>;
}

export default function DeveloperInfoModal({
  visible,
  dismiss,
}: DeveloperInfoModalInterface) {
  const { textsList } = useLanguage();

  const canInteractWithModal = useRef<boolean>(false);
  const [mainViewOpacityAnimationValue] = useState(() => new Animated.Value(0));
  const [internalViewScaleAnimationValue] = useState(
    () => new Animated.Value(0),
  );

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

  const timeoutAnimation: number = 500;

  function animateDeveloperInfoModal(isReverse: boolean): void {
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
      animateDeveloperInfoModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const backHandlerSub = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          animateDeveloperInfoModal(true);
          setTimeout(() => {
            dismiss();
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
      <Pressable
        accessible={false}
        onPress={() => {
          if (canInteractWithModal.current) {
            animateDeveloperInfoModal(true);
            setTimeout(() => {
              dismiss();
            }, timeoutAnimation);
          }
        }}
        style={styles.pressableView}
      />
      <View style={styles.containerView}>
        <Animated.View
          style={[
            styles.containerAnimatedView,
            { transform: [{ scale: internalViewScaleAnimationInterpolate }] },
          ]}
        >
          <View style={styles.headerView}>
            <Entypo
              name="info-with-circle"
              size={UserDimensions.imageMultiplier * 4.5}
              color="white"
            />
            <Text style={styles.headerViewText}>
              {textsList["aboutDeveloperText"]}
            </Text>
          </View>
          <View style={styles.contentView}>
            <View style={styles.contentCenterView}>
              <Image
                contentFit="contain"
                source={nerdtechWithoutBg}
                style={styles.logoImage}
              />
              <Text style={styles.socialMediaText}>
                {textsList["socialMediaText"]}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  if (canInteractWithModal.current) {
                    await openURL("https://www.facebook.com/NerdTechDEV/");
                  }
                }}
                style={styles.optionTouchableOpacity}
              >
                <FontAwesome
                  name="facebook-official"
                  size={UserDimensions.imageMultiplier * 5}
                  color="white"
                />
                <Text style={styles.optionTouchableOpacityText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  if (canInteractWithModal.current) {
                    await openURL("https://www.instagram.com/nerdtechdev/");
                  }
                }}
                style={styles.optionTouchableOpacity}
              >
                <FontAwesome
                  name="instagram"
                  size={UserDimensions.imageMultiplier * 5}
                  color="white"
                />
                <Text style={styles.optionTouchableOpacityText}>Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  if (canInteractWithModal.current) {
                    await openURL(
                      "https://play.google.com/store/apps/dev?id=4987509923825337634",
                    );
                  }
                }}
                style={styles.optionTouchableOpacity}
              >
                <FontAwesome5
                  name="google-play"
                  size={UserDimensions.imageMultiplier * 5}
                  color="white"
                />
                <Text style={styles.optionTouchableOpacityText}>
                  Play Store
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  if (canInteractWithModal.current) {
                    await openURL("https://x.com/NerdTechDEV");
                  }
                }}
                style={styles.optionTouchableOpacity}
              >
                <FontAwesome6
                  name="square-x-twitter"
                  size={UserDimensions.imageMultiplier * 5}
                  color="white"
                />
                <Text style={styles.optionTouchableOpacityText}>X</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.actionTouchableOpacity}
              onPress={() => {
                if (canInteractWithModal.current) {
                  animateDeveloperInfoModal(true);
                  setTimeout(() => {
                    dismiss();
                  }, timeoutAnimation);
                }
              }}
            >
              <Text style={styles.actionTouchableOpacityText}>
                {textsList["closeText"]}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
