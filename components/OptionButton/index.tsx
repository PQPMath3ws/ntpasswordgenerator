import { Entypo } from "@expo/vector-icons";
import { cloneElement, JSX, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

import UserDimensions from "../../constants/dimensions";
import IconsType from "../../types/icons";
import Divider from "../Divider";
import styles from "./styles";

interface OptionButtonInterface {
  disabled?: boolean;
  type: "internal" | "external";
  icon?: IconsType;
  externalIcon?: IconsType;
  text: string;
  singleLine?: boolean;
  onPress?: () => void;
  isPro?: boolean;
  children?: JSX.Element;
}

export default function OptionButton({
  disabled,
  type,
  icon,
  externalIcon,
  text,
  singleLine,
  onPress,
  isPro,
  children,
}: OptionButtonInterface) {
  const [canShowCollapsedDiv, setCanShowCollapsedDiv] =
    useState<boolean>(false);
  const [collapsedDivHeight, setCollapsedDivHeight] = useState<number>(0);

  const [height] = useState(() => new Animated.Value(0));

  let iconClone: JSX.Element | undefined = undefined;
  let externalIconClone: JSX.Element | undefined = undefined;

  if (icon) {
    iconClone = cloneElement<IconsType>(icon, {
      color: "#63AD58",
      size: UserDimensions.imageMultiplier * 5,
    });
  }

  if (type === "external" && externalIcon) {
    externalIconClone = cloneElement<IconsType>(externalIcon, {
      color: "#63AD58",
      size: UserDimensions.imageMultiplier * 5,
    });
  }

  function animateHeightOfInternalOptionButton() {
    setCanShowCollapsedDiv(!canShowCollapsedDiv);
    Animated.timing(height, {
      toValue: !canShowCollapsedDiv ? collapsedDivHeight : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }

  if (type === "internal") {
    return (
      <>
        <TouchableOpacity
          disabled={disabled}
          onPress={animateHeightOfInternalOptionButton}
          style={
            disabled
              ? styles.mainDisabledTouchableOpacity
              : styles.mainTouchableOpacity
          }
        >
          <View style={styles.leftView}>
            {iconClone && iconClone}
            <Text style={styles.leftViewText}>{text}</Text>
            {isPro && <Text style={styles.proText}>[PRO]</Text>}
          </View>
          <View style={styles.rightView}>
            <Entypo
              name={canShowCollapsedDiv ? "chevron-up" : "chevron-down"}
              size={UserDimensions.imageMultiplier * 5}
              color="#63AD58"
            />
          </View>
        </TouchableOpacity>
        {children && (
          <>
            <Divider color="#3E6A3D" height={1} />
            <Animated.View style={[styles.internalContentView, { height }]}>
              <View
                style={styles.internalContentChildView}
                onLayout={(event) => {
                  const layoutHeight: number = event.nativeEvent.layout.height;

                  if (layoutHeight > 0 && layoutHeight !== collapsedDivHeight) {
                    setCollapsedDivHeight(layoutHeight);
                  }
                }}
              >
                {children}
              </View>
            </Animated.View>
          </>
        )}
      </>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={
        disabled
          ? styles.mainDisabledTouchableOpacity
          : styles.mainTouchableOpacity
      }
    >
      <View style={styles.leftView}>
        {iconClone && iconClone}
        {singleLine ? (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.leftViewText}
          >
            {text}
          </Text>
        ) : (
          <Text style={styles.leftViewText}>{text}</Text>
        )}
        {isPro && <Text style={styles.proText}>[PRO]</Text>}
      </View>
      <View style={styles.rightView}>
        {externalIconClone ? (
          externalIconClone
        ) : (
          <Entypo
            name="chevron-right"
            size={UserDimensions.imageMultiplier * 5}
            color="#63AD58"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
