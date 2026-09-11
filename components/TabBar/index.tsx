import { BottomTabBarProps } from "expo-router/js-tabs";
import {
  Text,
  PlatformPressable,
  useLinkBuilder,
} from "expo-router/react-navigation";
import { cloneElement, JSX } from "react";
import { View } from "react-native";

import UserDimensions from "../../constants/dimensions";
import IconsType from "../../types/icons";
import TabsDataInterface from "../../types/tabs";
import styles from "./styles";

export default function TabBar({
  allTabsData,
  state,
  descriptors,
  navigation,
}: BottomTabBarProps & { allTabsData: TabsDataInterface[] }) {
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.mainView}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const iconClone: JSX.Element = cloneElement<IconsType>(
          allTabsData[index].icon,
          {
            color: isFocused ? "#14AE5C" : "#63AD5888",
            size: UserDimensions.imageMultiplier * 5.5,
          },
        );

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.routePlatformPressable}
          >
            {iconClone}
            <Text style={isFocused ? styles.focusedText : styles.unfocusedText}>
              {allTabsData[index].label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}
