import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { nativeApplicationVersion } from "expo-application";
import { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Divider from "../../../components/Divider";
import OptionButton from "../../../components/OptionButton";
import Picker from "../../../components/Picker";
import { useDeveloperInfo } from "../../../contexts/useDeveloperInfo";
import { useIap } from "../../../contexts/useIap";
import { useLanguage } from "../../../contexts/useLanguage";
import { useSettings } from "../../../contexts/useSettings";
import { AvailableLanguagesCodes } from "../../../types/language";
import styles from "./styles";

interface AvailableLanguagesInterface {
  label: string;
  value: AvailableLanguagesCodes;
}

export default function SettingsScreen() {
  const { showDeveloperInfoModal } = useDeveloperInfo();
  const { purchaseVipVersion, restoreVipVersion } = useIap();
  const { changeLanguage, textsList } = useLanguage();
  const { settings } = useSettings();

  const [selectedLanguage, setSelectedLanguage] =
    useState<AvailableLanguagesCodes>(
      (settings && settings.language_code) || "en",
    );

  const availableLanguages: AvailableLanguagesInterface[] = [
    { label: "English", value: "en" },
    { label: "Español", value: "es" },
    { label: "Português", value: "pt" },
  ];

  const canInteractWithOptions = useRef<boolean>(true);

  const InitialRenderElement = settings?.has_full_version ? SafeAreaView : View;

  return (
    <InitialRenderElement style={styles.mainView}>
      <ScrollView
        contentContainerStyle={styles.containerContentScrollView}
        showsVerticalScrollIndicator={false}
        style={styles.containerScrollView}
      >
        <Text style={styles.categoryText}>{textsList["generalText"]}</Text>
        <View style={styles.optionsView}>
          <View>
            <OptionButton
              icon={<FontAwesome name="language" />}
              text={textsList["changeLanguageText"]}
              type="internal"
            >
              <View style={styles.changeLanguageView}>
                <Picker
                  dropdownValues={availableLanguages}
                  icon={<FontAwesome name="language" />}
                  itemStyle={styles.changeLanguagePickerItem}
                  onValueChange={(value) => setSelectedLanguage(value.value)}
                  selectedValue={selectedLanguage}
                  style={styles.changeLanguagePickerView}
                />
                <TouchableOpacity
                  onPress={async () => {
                    if (canInteractWithOptions.current) {
                      canInteractWithOptions.current = false;
                      await changeLanguage(selectedLanguage);
                      canInteractWithOptions.current = true;
                    }
                  }}
                  style={styles.changeLanguageTouchableOpacity}
                >
                  <Text style={styles.changeLanguageTouchableOpacityText}>
                    {textsList["modifyLanguageText"]}
                  </Text>
                </TouchableOpacity>
                <Divider color="#3E6A3D" height={1} />
              </View>
            </OptionButton>
          </View>
        </View>
        <Text style={styles.categoryText}>{textsList["storeText"]}</Text>
        <View style={styles.optionsView}>
          <View>
            <OptionButton
              disabled={!!settings?.has_full_version}
              icon={<MaterialIcons name="attach-money" />}
              onPress={async () => {
                if (canInteractWithOptions.current) {
                  canInteractWithOptions.current = false;
                  await purchaseVipVersion();
                  canInteractWithOptions.current = true;
                }
              }}
              singleLine
              text={textsList["buyProVersionText"]}
              type="external"
            />
            <Divider color="#3E6A3D" height={1} />
          </View>
          <View>
            <OptionButton
              disabled={!!settings?.has_full_version}
              icon={<MaterialIcons name="restore" />}
              onPress={async () => {
                if (canInteractWithOptions.current) {
                  canInteractWithOptions.current = false;
                  await restoreVipVersion();
                  canInteractWithOptions.current = true;
                }
              }}
              singleLine
              text={textsList["restorePurchaseText"]}
              type="external"
            />
            <Divider color="#3E6A3D" height={1} />
          </View>
        </View>
        <Text style={styles.categoryText}>{textsList["aboutText"]}</Text>
        <View style={styles.optionsView}>
          <View>
            <OptionButton
              icon={<FontAwesome5 name="info-circle" />}
              onPress={() => {
                showDeveloperInfoModal();
              }}
              singleLine
              text={textsList["aboutDeveloperText"]}
              type="external"
            />
            <Divider color="#DFDFDF" height={1} />
          </View>
          <Text style={styles.appVersionText}>
            {`${textsList["appVersionText"]} ${nativeApplicationVersion}`}
          </Text>
        </View>
      </ScrollView>
    </InitialRenderElement>
  );
}
