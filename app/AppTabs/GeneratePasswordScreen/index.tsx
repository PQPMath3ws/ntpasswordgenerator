import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useEffect, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PasswordBoxViewerAndChecker from "../../../components/PasswordBoxViewerAndChecker";
import UserDimensions from "../../../constants/dimensions";
import { useLanguage } from "../../../contexts/useLanguage";
import { useSnackBar } from "../../../contexts/useSnackBar";
import GeneratePassword from "../../../services/generatePassword";
import PasswordCombinationsInterface from "../../../types/password";
import styles from "./styles";

export default function GeneratePasswordScreen() {
  const { textsList } = useLanguage();
  const { showSnackBar } = useSnackBar();

  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [passwordWeight, setPasswordWeight] = useState<number>(52);
  const [isPasswordLimit, setIsPasswordLimit] = useState<boolean>(false);
  const [passwordSettings, setPasswordSettings] =
    useState<PasswordCombinationsInterface>({
      passwordLength: 12,
      hasLowerCaseCharacters: true,
      hasUpperCaseCharacters: true,
      hasNumbers: false,
      hasSpecialCharacters: false,
      canRepeatCharacters: true,
    });

  const passwordSettingsList = [
    {
      textKey: "uppercaseLettersText",
      contentLabel: "A-Z",
      value: passwordSettings.hasUpperCaseCharacters,
      changeKey: "hasUpperCaseCharacters",
      weight: 26,
    },
    {
      textKey: "lowercaseLettersText",
      contentLabel: "a-z",
      value: passwordSettings.hasLowerCaseCharacters,
      changeKey: "hasLowerCaseCharacters",
      weight: 26,
    },
    {
      textKey: "numbersText",
      contentLabel: "0-9",
      value: passwordSettings.hasNumbers,
      changeKey: "hasNumbers",
      weight: 10,
    },
    {
      textKey: "specialCharactersText",
      contentLabel: "!@#$%&*",
      value: passwordSettings.hasSpecialCharacters,
      changeKey: "hasSpecialCharacters",
      weight: 12,
    },
    {
      textKey: "canRepeatCharactersText",
      contentLabel: "aaa,bbb,ccc...",
      value: passwordSettings.canRepeatCharacters,
      changeKey: "canRepeatCharacters",
      weight: 0,
    },
  ];

  async function generatePassword(): Promise<void> {
    if (
      passwordSettings.passwordLength >= 6 &&
      passwordSettings.passwordLength <= 60
    ) {
      const newPassword = GeneratePassword(passwordSettings);
      setGeneratedPassword(newPassword);
    }
  }

  function changeSettings(
    key: keyof PasswordCombinationsInterface,
    value: boolean | number,
  ): void {
    const newPasswordSettings: PasswordCombinationsInterface = {
      ...passwordSettings,
    };
    (newPasswordSettings as any)[key] = value;
    const filteredSettingsKeys = Object.keys(newPasswordSettings).filter(
      (setting) => !!(newPasswordSettings as any)[setting],
    );
    let finalWeight = 0;
    filteredSettingsKeys.forEach((key) => {
      const item = passwordSettingsList.find(
        (settingConfig) => settingConfig.changeKey === key,
      );
      if (item) {
        finalWeight += item.weight;
      }
    });
    setPasswordWeight(finalWeight);
    if (
      !newPasswordSettings.canRepeatCharacters &&
      newPasswordSettings.passwordLength >= finalWeight
    ) {
      if (!isPasswordLimit) {
        setIsPasswordLimit(true);
      }
      if (newPasswordSettings.passwordLength === finalWeight) {
        setPasswordSettings(newPasswordSettings);
      }
      return;
    }
    if (isPasswordLimit) {
      setIsPasswordLimit(false);
    }
    setPasswordSettings(newPasswordSettings);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordSettings]);

  useEffect(() => {
    if (isPasswordLimit) {
      showSnackBar(
        <FontAwesome name="close" />,
        textsList["passwordLengthLimitText"],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPasswordLimit]);

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView contentContainerStyle={styles.contentContainerScrollView}>
        <PasswordBoxViewerAndChecker password={generatedPassword} />
        <TouchableOpacity
          style={styles.generatePasswordTouchableOpacity}
          onPress={generatePassword}
        >
          <Ionicons
            name="shield-checkmark"
            style={styles.generatePasswordTouchableOpacityIcon}
          />
          <Text style={styles.generatePasswordTouchableOpacityText}>
            {textsList["generatePasswordText"].toUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.contentContainerBoxView}>
          <Text style={styles.contentContainerBoxViewTitleText}>
            {textsList["passwordLengthText"].toUpperCase()}:
          </Text>
          <Slider
            thumbSize={UserDimensions.widthMultiplier * 5}
            thumbTintColor="#63AD58"
            minimumValue={6}
            maximumValue={60}
            upperLimit={
              passwordSettings.canRepeatCharacters ? 60 : passwordWeight
            }
            minimumTrackTintColor="#61CF5A"
            maximumTrackTintColor="#5A61CF"
            onValueChange={(value) => changeSettings("passwordLength", value)}
            value={passwordSettings.passwordLength}
            step={1}
          />
          <View style={styles.contentContainerBoxPasswordSizeView}>
            <View>
              <Text
                style={
                  styles.contentContainerBoxPasswordSizeRequirementViewText
                }
              >
                Min: 6
              </Text>
            </View>
            <View>
              <Text style={styles.contentContainerBoxPasswordSizeViewText}>
                {passwordSettings.passwordLength}
              </Text>
            </View>
            <View>
              <Text
                style={
                  styles.contentContainerBoxPasswordSizeRequirementViewText
                }
              >
                Max: 60
              </Text>
            </View>
          </View>
        </View>
        {passwordSettingsList.map((pItem) => (
          <View
            key={pItem.changeKey}
            style={[styles.contentContainerBoxView, styles.rowView]}
          >
            <View
              style={[
                styles.contentContainerBoxLeftView,
                styles.extra0_5HeightGap,
              ]}
            >
              <Text style={styles.contentContainerBoxViewTitleText}>
                {textsList[pItem.textKey].toUpperCase()}
              </Text>
              <Text style={styles.contentContainerBoxViewContentText}>
                {pItem.contentLabel}
              </Text>
            </View>
            <View style={styles.contentContainerBoxRightView}>
              <Switch
                trackColor={{ false: "#5A61CF", true: "#61CF5A" }}
                thumbColor="#63AD58"
                onValueChange={(value) =>
                  changeSettings(
                    pItem.changeKey as keyof PasswordCombinationsInterface,
                    value,
                  )
                }
                value={pItem.value}
                style={styles.contentContainerBoxRightViewSwitch}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
