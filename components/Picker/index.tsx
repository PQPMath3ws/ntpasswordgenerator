import { AntDesign } from "@expo/vector-icons";
import { cloneElement, JSX, useMemo, useState } from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import UserDimensions from "../../constants/dimensions";
import IconsType from "../../types/icons";
import PickerValueInterface from "../../types/picker";
import styles from "./styles";

interface PickerInterface {
  style?: ViewStyle;
  itemStyle?: TextStyle;
  dropdownValues: PickerValueInterface[];
  icon?: IconsType;
  displayItemsCount?: number;
  selectedValue: any;
  onValueChange: (value: any) => void;
}

export default function Picker({
  style,
  itemStyle,
  dropdownValues,
  icon,
  displayItemsCount,
  selectedValue,
  onValueChange,
}: PickerInterface) {
  const [containerViewHeight, setContainerViewHeight] = useState<number>(0);
  const [containerViewWidth, setContainerViewWidth] = useState<number>(0);
  const [canShowTheOptionsView, setCanShowTheOptionsView] =
    useState<boolean>(false);

  const selectedItem = useMemo<PickerValueInterface>(
    () =>
      dropdownValues.find(
        (dropdownValue) => dropdownValue.value === selectedValue,
      )!,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedValue],
  );

  let iconClone: JSX.Element | undefined = undefined;

  if (icon || (selectedItem && selectedItem.icon)) {
    iconClone = cloneElement<IconsType>(
      selectedItem.icon ? selectedItem.icon : icon,
      {
        color: "#FFFFFF",
        size: UserDimensions.imageMultiplier * 5,
      },
    );
  }

  return (
    <View style={[styles.mainView, style ? style : {}]}>
      <View
        style={styles.mainContainer}
        onLayout={(event) => {
          const layoutHeight: number = event.nativeEvent.layout.height;
          const layoutWidth: number = event.nativeEvent.layout.width;

          if (layoutHeight > 0 && layoutHeight !== containerViewHeight) {
            setContainerViewHeight(layoutHeight + 22);
          }

          if (layoutWidth > 0 && layoutWidth !== containerViewWidth) {
            setContainerViewWidth(layoutWidth + 40);
          }
        }}
        onTouchEnd={() => setCanShowTheOptionsView(!canShowTheOptionsView)}
      >
        <View style={styles.mainContainerLeftView}>
          {iconClone && iconClone}
          <Text style={[styles.contentText, itemStyle ? itemStyle : {}]}>
            {selectedItem.label}
          </Text>
        </View>
        <View style={styles.mainContainerRightView}>
          <AntDesign
            name={canShowTheOptionsView ? "caret-up" : "caret-down"}
            size={UserDimensions.imageMultiplier * 4}
            color="#63AD58"
          />
        </View>
      </View>
      {canShowTheOptionsView && (
        <ScrollView
          style={[
            styles.dropdownScrollView,
            {
              marginTop: containerViewHeight,
              width: containerViewWidth,
              height: displayItemsCount
                ? containerViewHeight * displayItemsCount
                : containerViewHeight * 2,
            },
          ]}
        >
          {dropdownValues.map((dropdownValue) => {
            let itemIconClone: JSX.Element | undefined = undefined;

            if (icon) {
              itemIconClone = cloneElement<IconsType>(icon, {
                color: "#FFFFFF",
                size: UserDimensions.imageMultiplier * 5,
              });
            }

            return (
              <TouchableOpacity
                key={dropdownValue.value}
                style={styles.dropdownItemTouchableOpacity}
                onPress={() => {
                  setCanShowTheOptionsView(false);
                  onValueChange(dropdownValue);
                }}
              >
                {itemIconClone ? itemIconClone : iconClone}
                <Text style={[styles.contentText, itemStyle ? itemStyle : {}]}>
                  {dropdownValue.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
